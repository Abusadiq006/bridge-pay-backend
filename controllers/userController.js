const supabase = require('../config/supabaseClient')

exports.getUserProfile = async (req, res) => {
    try {
        const userId = req.user.id

        const { data: profile, error: profileError } = await supabase
        .from('profiles')
        .select(`
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

        if (profileError) throw profileError

        res.status(200).json({
            success: true,
            data: profile
        })

        } catch (error) {
            res.status(500).json({
                success: false,
                error: error.message
            })
        }
    }
