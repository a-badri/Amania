const express = require(`express`)


const router = express.Router()
const db = require(`../db/models`)
const {asyncHandler, serverValidation} = require(`../utils`)
const {genToken, requireAuth} = require(`../oAuth`)

router.use(requireAuth)

router.get(`/`, asyncHandler(async(req, res, next) => {
  const products = db.Product.findAll({
    // include: [{model: db.Store, as: `store`, attributes: [`name`]}],
    random: true,
    limit: 9,
    attributes: [`name`, `price`]
  })

  res.json({products})
}))

router.post(`/`, serverValidation, asyncHandler(async(req, res, next) => {

  try {
    const {name, description, price} = req.body

    const userId = req.user.id
    // console.log(userId)

    const product = await db.Product.create({name, description, price, userId: userId})

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


const productNotFound = () => {
  const err = new Error (`product doesn't exist`)
  err.title = `product does not exist`
  err.status = 404;
  return err
}

router.get(`/:id(\\d+)`, asyncHandler(async(req, res, next) => {
  const productId = parseInt(req.params.id, 10)
  const product = await db.Product.findByPk(productId)

  if(!product) {
    next(productNotFound)
  }


  res.json({product})
}))



module.exports = router;
