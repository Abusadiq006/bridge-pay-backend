const supabase = require('../config/supabaseClient')

const protect = async (req, res, next) => {
    let token

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            token = req.headers.authorization.split(' ')[1]

            const { data: { user}, error } = await supabase.auth.getUser(token)
        }
    }
}