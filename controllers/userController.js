const supabase = require('../config/supabaseClient')

exports.getUserProfile = async (req, res) => {
    try {
        const userId = req.user.id

        const { data: profile, error: profileError } = await supabase
        .from('profiles')
        .selesct(`
            full_name,
            email,
            role,
            accounts (
                account_number,
                balance,
                currency
            )
        `)
        .eq('id', userId)
        .single()
    }
}