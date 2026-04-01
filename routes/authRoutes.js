const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { supabase } = require('../config/supabaseClient'); // Ensure you import the main supabase client

// 1. Middleware for protection (You can also move this to a separate file like middleware/auth.js)
const protect = async (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
        return res.status(401).json({ error: 'No token provided' });
    }

    try {
        const { data: { user }, error } = await supabase.auth.getUser(token);

        if (error || !user) {
            return res.status(401).json({ error: error?.message || 'Invalid token' });
        }

        // Attach user to request for use in the controller
        req.user = user;
        next();
    } catch (err) {
        return res.status(500).json({ error: 'Server error during authentication' });
    }
};

// --- Routes ---

// Public Routes
router.post('/register', authController.registerUser);
router.post('/login', authController.loginUser);

// Protected Route (Clean & Concise)
router.get('/profile', protect, (req, res) => {
    const token = req.headers.authorization?.split(' ')[1]
    // Because of 'protect', we know req.user exists here
    if (!token) return res.status(401).json({ error: 'No token provided' })

        const { data: { user }, error } = await supabase.auth.getUser(token)
        
    res.status(200).json({ user: req.user });
});

module.exports = router;