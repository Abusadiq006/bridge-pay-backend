const express = require('express')

const authController = require('../controllers/authController')
const { getUserProfile } = require('../controllers/userController')
const { protect } = require('../middleware/authMiddleware')

const router = express.Router()

router.post('/register', authController.registerUser)
router.post('/login', authController.loginUser)
router.get('/profile', protect, getUserProfile)
router.get('/me', protect, (req, res) => {
    res.status(200).json({ user: req.user })
})

module.exports = router
