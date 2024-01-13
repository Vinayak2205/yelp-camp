const express = require('express')
const reviewController = require('../controllers/review.controller')
const catchAsync = require('../utils/catchAsync')
const router = express.Router({ mergeParams: true })
const { validateReview, isLoggedIn, isReviewAuthor } = require('../middleware')

router.post('/', isLoggedIn, validateReview, catchAsync(reviewController.createReview))

router.delete('/:reviewId',isLoggedIn, isReviewAuthor, catchAsync(reviewController.deleteReview))

module.exports = router