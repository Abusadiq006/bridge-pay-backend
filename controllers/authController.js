const supabase = require('../config/supabaseClient')

exports.registerUser = async (req, res) => {
    const { email, password, full_name } = req.body

    try {
        if (!email || !password || !full_name) {
            return res.status(400).json({
                error: 'email, password, and full_name are required'
            })
        }

        const { data: authData, error: authError } = await supabase.auth.signUp({
            email,
            password,
        })

        if (authError) throw authError
        if (!authData.user) throw new Error('Unable to create user account')

        const { error: profileError } = await supabase
        .from('profiles')
        .insert([
            {
                id: authData.user.id,
                full_name,
                email
            }
        ])

        if (profileError) throw profileError

        res.status(201).json({
            message: "User registered successfully!",
            user: authData.user
        })

    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

exports.loginUser = async (req, res) => {
    const { email, password } = req.body

    try {
        if (!email || !password) {
            return res.status(400).json({
                error: 'email and password are required'
            })
        }

        const { data, error } = await supabase.auth.signInWithPassword({
            email,
            password,
        })

        if (error) throw error
        if (!data.user) throw new Error('Unable to log in user')

        res.status(200).json({
            message: "Login successful!",
            session: data.session,
            user: data.user
        })

    } catch (error) {
        res.status(401).json({ error: error.message })
    }
}

