const express = require('express')
const router = express.Router()
const { getUserProfile } = require('../controllers/userController')
const { protect } = require('../middleware/authMiddleware')

router.get('/profile', protect, getUserProfile)

router.get('/dashboard-data', protect, (req, res) => {
    res.json({
        message: `Welcome to your BridgePay dashboard, User ID: ${req.user.id}`,
        balance: 5000.00
    })
})

module.exports = router
