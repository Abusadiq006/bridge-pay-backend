const express = require('express')
const router = express.Router()
const { protect } = require('../middleware/authMiddleware')

router.get('/dashboard-data', protect, (req, res) => {
    res.json({
        message: `Welcome to your BridgePay dashboard, User ID: ${req.user.id}`,
        balance: 5000.00
    })
})

module.exports = router