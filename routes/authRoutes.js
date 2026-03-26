const express = require('express')
const router = express.Router()
const authController = require('../controllers/authController')
const { auth } = require('../config/supabaseClient')

// Route for Registration
router.post('/register', authController.registerUser)

// Route for Login
router.post('/login', authController.loginUser)

// Route for Profile
router.get('/profile', async (req, res) => {
    const token = req.headers.authorization?.split(' ')[1]

    if (!token) return res.status(401).json({
        error: 'No token provided'
    })

    const { data: { user }, error } = await supabase.auth.getUser(token)
} )

module.exports = router 