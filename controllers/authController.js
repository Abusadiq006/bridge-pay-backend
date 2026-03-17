const supabase = require('../config/supabaseClient')

exports.registerUser = async (req, res) => {
    const { email, password, full_name } = req.body

    try {
        const { data: authData, error: authError } = await supabase.auth.signUp({
            email,
            password,
        })

        if (authError) throw authError

        
    }
}

exports.register