const supabase = require('../config/supabaseClient')

const protect = async (req, res, next) => {
    if (!req.headers.authorization || !req.headers.authorization.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'Not authorized, no token provided' })
    }

    const token = req.headers.authorization.split(' ')[1]

    try {
        const { data: { user }, error } = await supabase.auth.getUser(token)

        if (error || !user) {
            return res.status(401).json({ message: 'Not authorized, token failed' })
        }

        req.user = user
        return next()
    } catch (error) {
        console.error('Authentication error:', error.message)
        return res.status(401).json({ message: 'Not authorized' })
    }
}

module.exports = { protect }
