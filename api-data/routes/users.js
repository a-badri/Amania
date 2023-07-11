const express = require(`express`)

const router = express.Router()
const cors = require(`cors`)

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

router.post(`/`, registerValidator, serverValidation, asyncHandler(async(req, res, next) => {
  
  let {username, email, password} = req.body
  
  const hashedPassword = await bcrypt.hash(password, 10)

  const user = await db.User.create({username, email, password})
  
  const token = genToken(user)
  
  
  res.status(201).json({user: {id: user.id}, token}).end()

}))

router.post(`/token`, asyncHandler(async(req, res, next) => {
  const {email, password} = req.body

  const user = await db.User.findOne({
    where: {
      email,
    }
  })

  if(!user || !user.validatePassword(password)) {
    const err = Error(`login failed`)
    err.title = `login falied`
    err.errors = [`can't find the user with credentials provided`]
    err.status = 401;

  }

  const token = genToken(user)
  res.status(201).json({token, user: {id: user.id}}).end()
})) 

module.exports = router
