const express = require('express')
const router = express.Router()
const authController = require('../controllers/authController')

// Route for Registration
router.post('/register', authController.registerUser)

// Route for Login
router.post('/api/auth/login', authController.loginUser)

module.exports = router