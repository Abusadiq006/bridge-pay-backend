const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv')

dotenv.config()

const supabase = require('./config/supabaseClient')
const authRoutes = require('./routes/authRoutes')
const userRoutes = require('./routes/userRoutes')

const app = express()
const allowedOrigin = process.env.FRONTEND_URL || 'http://localhost:5173'

app.use(cors({
    origin: allowedOrigin,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
}))
app.use(express.json())

app.get('/', (req, res) => {
    res.status(200).json({
        success: true,
        message: 'Bridge Pay backend is running'
    })
})

app.get('/test-db', async (req, res) => {
    try {
        const { data, error } = await supabase.from('profiles').select('*').limit(1)

        if (error) throw error

        res.status(200).json({
            message: 'Backend is connected to Supabase!',
            data
        })
    } catch (error) {
        res.status(500).json({
            message: 'Connection failed',
            error: error.message
        })
    }
})

app.use('/api/auth', authRoutes)
app.use('/api/user', userRoutes)

const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`)
})
