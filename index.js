const express = require('express');
const env  = require('./config/environment');
const logger = require('morgan');
const expressEjsLayouts = require('express-ejs-layouts');
const cookieParser = require('cookie-parser')
const app = express();
require('./config/view-helpers')(app);
const port = 8000;

const expressLayouts = require('express-ejs-layouts');
const db = require('./config/mongoose');
 
// Used for session Cookie

const session = require('express-session');
const passport = require('passport');
const passportLocal = require('./config/passport-local-strategy');

const passportJWT = require('./config/passport-jwt-strategy');

const passportGoogle = require('./config/passpost-google-oauth2-strategy');

const MongoStore = require('connect-mongo');
const flash = require('connect-flash');

const customMWare = require('./config/middleware');

// set up the chatServer to be used with Socket.io

const chatServer = require('http').Server(app);
const chatSockets = require('./config/chat_sockets').chatSockets(chatServer);

chatServer.listen(5000);

console.log('chat server is listening up on port 5000');

// const sassMiddleware = require('node-sass-middleware');

// app.use(sassMiddleware({
//     src: './assets/scss',
//     dest : './assets/css',
//     debug: true,
//     outputStyle: 'extended',
//     prefix: '/css'
// }))

app.use(express.urlencoded());

app.use(cookieParser());

app.use(express.static(env.asset_path));

// make the uploads path available to the browser
app.use('/uploads', express.static(__dirname + '/uploads'));
app.use(logger(env.morgan.mode, env.morgan.options));

app.use(expressLayouts);

// extract style and scripts from sub pages into layouts

app.set('layout extractStyles', true);
app.set('layout extractScripts', true);



// set up the view engine
app.set('view engine', 'ejs');
app.set('views', './views');

// Mongo sotre is used to store the session cookie in the DB

app.use(session({
    name: 'codeial',
    secret: env.session_cookie_key,
    saveUninitialized: false,
    resave: false,
    cookie: {
        maxAge : (1000 * 60 * 100)
    }, 
    store: MongoStore.create(
        {
            mongoUrl : 'mongodb://127.0.0.1:27017/codeial_devlopment',
            autoRemove : 'disabled'

    },
    function(err){
        console.log(err || 'connect mongodb setup - Ok')
    }
    )
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(passport.setAuthenticatedUser);

app.use(flash());

app.use(customMWare.setFlash);

// use express router

app.use('/', require('./routes'));


app.listen(port, function(err){
    if(err){
        console.log(`Error in ruuning the server : ${err}`);
    }

    console.log(`Server is running on the port: ${port}`);
});