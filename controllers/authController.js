const supabase = require('../config/supabaseClient')

exports.registerUser = async (req, res) => {
    const { email, password, full_name } = req.body

    try {
        const { data: authData, error: authError } = await supabase.auth.signUp({
            email,
            password,
        })

        if (authError) throw authError

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

exports.register