const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv')
const supabase = require('./config/supabaseClient')
const authRoutes = require('./routes/authRoutes')
const userRoutes = require('./routes/userRoutes')

dotenv.config()

const app = express()

// Middleware
app.use(cors())
app.use(express.json())
app.use('/api/user', userRoutes)

//Health Check Route
app.get('/test-db', async (requestAnimationFrame, res) => {
    try {
        const { data, error } = await supabase.from('profiles').select('*').limit(1)

        if (error) throw error

        res.status(200).json({
            message: "Backend is connected to Supabase!",
            data: data
        })
    } catch (error) {
        res.status(500).json({
            message: "Connection failed",
            error: error.message
        })
    }
})
app.use('/api/auth', authRoutes)

const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`)
})