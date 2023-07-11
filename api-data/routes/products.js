const express = require(`express`)


const router = express.Router()
const db = require(`../db/models`)
const {asyncHandler, serverValidation} = require(`../utils`)
const {genToken, requireAuth} = require(`../oAuth`)

router.use(requireAuth)

router.get(`/`, asyncHandler(async(req, res, next) => {
  try {
    const products = await db.Product.findAll({
      // include: [{model: db.User, as: `user`, attributes: [`username`]}],
      order: [["createdAt", "DESC"]],
      attributes: [`id`, `name`, `description`, `price`]
    })

    res.status(200).json({products})

  }
  catch(err) {
    next(err)
  }
}))

router.post(`/testing`, asyncHandler(async(req, res, next) => {
  const {name, description, price} = req.body
  const product = {name, description, price}
  
  res.status(201).json({product})
}))

router.post(`/`, asyncHandler(async(req, res, next) => {
  const {name, description, price} = req.body

  
  const userId = req.user.id
  
  console.log(userId)

  try {
    // if (!name || !description || !price) {
    //   res.status(201).send({message: `check your fields`})
    // }




    const product = await db.Product.create({name, description, price, userId})

    res.status(201).json({product})
  }

  catch (err) {
    if (err.name === `SequelizeValidationError`) {
      err.status = 406;
      const errors = err.errors.map((error) => error.message)
      console.log(errors)
      err.json({errors})
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


router.put(`/:id(\\d+)`, asyncHandler(async(req, res, next) => {
  try {
    const id = req.user.id
    const product = await db.Product.findByPk(req.params.id)

    await product.update({
      name: req.body.name,
      description: req.body.description,
      price: req.body.price,
      userId: id
    })

    res.status(201).json({product})

  }

  catch(err) {
    next(err)
  }

}))

// router.put(`/:id(\\+d)/name`, asyncHandler(async(req, res, next) => {
//   const {name} = req.body
//   const productId = parseInt(req.params.id, 10)
//   const product = await db.Product.findByPk(productId)
//   await product.update(name)
//   res.json({product})
// }))

// router.put(`/:id(\\+d)/description`, asyncHandler(async(req, res, next) => {
//   const {description} = req.body
//   const productId = parseInt(req.params.id, 10)
//   const product = await db.Product.findByPk(productId)
//   await product.update(description)
//   res.json({product})
// }))

router.delete(`/:id(\\d+)`, asyncHandler(async(req, res, next) => {
  try {
    const productId = parseInt(req.params.id, 10)
    const product = await db.Product.findByPk(productId)
    await db.Product.destroy({where: {id: productId}})
    res.status(204).json({message: `product was destroyed`})
  }
  catch (err) {
    next(err)
  }
}))




module.exports = router;
