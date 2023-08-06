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
    name: 'production',

    // This path is in your system storage wiht the help of Environment variables(Bash Profile)
    asset_path: process.env.CODEIAL_ASSET_PATH,
    session_cookie_key: 'blahSomething',
    db: 'codeial_production',
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

    // Need to change all the keys with the help of randomkeygen.com website

    google_client_id: "630100026232-o5qeulppreni5jromvv2fe5s2594bcqg.apps.googleusercontent.com",
    google_client_secret: "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",
    google_call_back_url: "http://codeial.com/users/auth/google/callback",

    jwt_secret: 'codeial'
}

module.exports = eval(process.env.CODEIAL_ENVIRONMENT) == undefined ? development : eval (process.env.CODEIAL_ENVIRONMENT);



// As my files are not totally working so I am adding it in comment to Understand how we can start server in  prodcution mode


    /*
      We need to add this thing in package.json after creating the bash profile
    
      "prod_start: "NODE_ENV=production nodemone index.js" 
    
    
    */