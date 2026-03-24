const supabase = require('../config/supabaseClient')

const Account = {
    findByUserId: async (userId) => {
        const { data, error } = await supabase
        .from('accounts')
        .select('*')
        .eq('user_id', userId)
        .single()
        return { data, error }
    }
}