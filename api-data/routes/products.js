const express = require(`express`)


const router = express.Router()
const db = require(`../db/models`)
const {asyncHandler} = require(`../utils`)

router.post(`/`, asyncHandler(async(req, res, next) => {

  try {
    const {name, description, price} = req.body

    const product = db.Product.create({name, description, price})

    res.json({product})
  }

  catch(err) {
    if (err.name === `SequelizeValidationError`) {
      const errors = err.errors.map((err) => err.msg)
      res.json({errors})
    }
    else {
      next(err)
    }
  }
}))

module.exports = router;
