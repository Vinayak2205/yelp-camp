const express = require('express')
const passport = require('passport')
const router = express.Router()
const catchAsync = require('../utils/catchAsync')
const userController = require('../controllers/user.controller')

router.route('/register')
    .get(userController.renderRegister)
    .post(catchAsync(userController.registerUser))

router.route('/login')
    .get(userController.renderLogin)
    .post(passport.authenticate('local', { failureFlash: true, failureRedirect: '/login' }), userController.userLogin)

router.get('/logout', userController.userLogout)

module.exports = router