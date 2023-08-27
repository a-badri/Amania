const express = require(`express`)

const router = express.Router()


const {asyncHandler, serverValidation} = require(`../utils`)

const db = require(`../db/models`)

const bcrypt = require(`bcryptjs`)
const {check, validationResult} = require(`express-validator`)
const {genToken} = require(`../oAuth`)




const registerValidator = [
  
  check(`username`)
  .exists({checkFalsy: true})
  .withMessage(`please provide a value for username`)
  .isLength({max: 50})
  .withMessage(`username can't be longer than 50 characters`),
  
  check(`email`)
  .exists({checkFalsy: true})
  .withMessage(`please provide a email`)
  .isLength({max: 250})
  .withMessage(`email can't be longer than 250 characters`),

  check(`password`)
    .exists({checkFalsy: true})
    .withMessage(`please provide a password`)
    .isLength({min: 9, max: 20})
    .withMessage(`password must be between 9 and 20 characters`)
]

router.post(`/test`, asyncHandler(async(req, res, next) => {

  const {email, password} = req.body;

  console.log(email, password)

  const user = await db.User.findOne({ where: {email}})

  if(!user || !user.validatePassword(password, user.hashedPassword)) { 
    const err = Error(`login failed`)
    err.title = `login falied`
    err.errors = [`can't find the user with credentials provided`]
    err.status = 401;
    return next(err)
  }

  const token = genToken(user)

  if (user && token) {
    res.status(200).json({
      message: "user exist and token generated",
      user,
      token
    })
  }
  else {
    next();
  }
}))

router.post(`/`, asyncHandler(async(req, res, next) => {
  
  let {username, email, password} = req.body

  try {

    if(!username || !email || !password) {
      res.status(400).send({
        message: "Check your fields"});
    }

    const hashedPassword = await bcrypt.hash(password, 10)
  
    const user = await db.User.create({
      username: username,
      email: email,
      hashedPassword: hashedPassword
    })
    
    const token = genToken(user)
    
    res.status(201).json({user, token})
  
    // res.status(200).send({
    //   dataReceived: req.body
    // });
  
    //next();

  } 
  catch(err) {
    if (err.name === `SequelizeValidationError`) {
      const errors = err.errors.map((err) => err.msg)
      err.json({errors})
    }
    else {
      next(err)
    }
  }

}))

router.post(`/token`, asyncHandler(async(req, res, next) => {
  const {email, password} = req.body

  console.log(email, password)

  const user = await db.User.findOne({
    where: {
      email: email
    }
  })

    if (user) {
      res.status(201).json({user: id})
    } else {
      res.status(401).json(`user can't be found`)
    }
    


  

  if(!user || !user.validatePassword(password)) {
    const err = Error(`login failed`)
    err.title = `login falied`
    err.errors = [`can't find the user with credentials provided`]
    err.status = 401;

  }

  const token = genToken(user)
  res.status(201).json({token, user: {id: user.id}}).end()
})) 

router.put(`/:id(\\+d)/email`, asyncHandler(async(req, res, next) => {
  const {email} = req.body
  const userId = parseInt(req.params.id, 10)

  const user = await db.User.findByPk(userId)

  await user.update(email)

  res.json({user})

}))

router.put(`/:id(\\+d)/password`, asyncHandler(async(req, res, next) => {
  const {password} = req.body
  
  const userId = parseInt(req.params.id, 10)

  const user = await db.User.findByPk(userId)

  const hashedPassword = await bcrypt.hash(password, 10)

  await user.update(hashedPassword)

  res.json({user})
}))

router.delete(`/:id(\\+d)`, asyncHandler(async(req, res, next) => {
  const userId = parseInt(req.params.id, 10)
  const user = await db.User.findByPk(userId)
  await user.destroy()
}))



module.exports = router
