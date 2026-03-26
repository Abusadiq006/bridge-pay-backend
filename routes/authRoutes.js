const express = require('express')
const router = express.Router()
const authController = require('../controllers/authController')
const { auth } = require('../config/supabaseClient')

// Route for Registration
router.post('/register', authController.registerUser)

// Route for Login
router.post('/login', authController.loginUser)

// Route for Profile
router.get('/profile', async )

module.exports = router 