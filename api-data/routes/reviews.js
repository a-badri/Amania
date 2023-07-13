const express = require(`express`)

const router = express.Router()

const db = require(`../db/models`)

const {asyncHandler} = require(`../utils`)

router.post(`/`, asyncHandler(async(req, res, next) => {
  const {comment, productId} = req.body
  const userId = req.user.id 
  const review = await db.Review.build({comment, productId, userId})
  await review.save()
  res.json({review})
}))

router.put(`/:id(\\+d)`, asyncHandler(async(req, res, next) => {
  const {comment} = req.body
  const userId = req.user.id
  const review = await db.Review.findByPk(userId)
  await review.update(comment)
  res.json({review})
}))

router.delete(`/:id(\\+d)`, asyncHandler(async(req, res, next) => {
  const reviewId = parseInt(req.params.id, 10)
  const review = await db.Review.findByPk(reviewId)
  await review.destroy()
}))
