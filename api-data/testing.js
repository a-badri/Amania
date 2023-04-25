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
