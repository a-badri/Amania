const express = require(`express`)

const router = express.Router()

const {asyncHandler, serverValidation} = require(`../utils`)

const db = require(`../db/models`)

const bcrypt = require(`bcryptjs`)
const {check, validationResult} = require(`express-validator`)
const {genToken} = require(`../oAuth`)
const bodyPraser = require(`body-parser`)

// router.use(bodyPraser.json())

const inputValidator = [
  
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

router.post(`/`, inputValidator, serverValidation, asyncHandler(async(req, res, next) => {
  console.log(req.body)
  
  const {username, email, password} = req.body
  
  const hashedPassword = await bcrypt.hash(password, 10)

  const user = await db.User.build({username, email, hashedPassword})

  const token = genToken(user)

  
  await user.save()
  res.json({user, token}).end()

}))

module.exports = router
 