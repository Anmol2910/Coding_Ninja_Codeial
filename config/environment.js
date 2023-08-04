const development = {
    name: 'development',
    asset_path: '/assets',
    session_cookie_key: 'blahSomething',
    db: 'codeial_devlopment',
    smtp: {
        service: 'gmail',
        host: 'smtp.gamil.com',
        post: 587,
        secure: false,
        auth: {
            user: 'alchemy.cn18',
            pass: 'codingninjas'
    
        }
    },

    google_client_id: "630100026232-o5qeulppreni5jromvv2fe5s2594bcqg.apps.googleusercontent.com",
    google_client_secret: "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",
    google_call_back_url: "http://localhost:8000/users/auth/google/callback",

    jwt_secret: 'codeial'

}

const production = {
    name: 'production'
}

module.exports = development;