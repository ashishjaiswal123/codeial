const express = require('express');
const cookieParcer = require('cookie-parser');
const app = express();
const port = 8000;
const expressLayouts = require('express-ejs-layouts');
 
const db = require('./config/mongoose');
//used for session cookie
const session = require('express-session');
const passport = require('passport');
const passportLocal = require('./config/passport-local-strategy');
// const { session } = require('passport');


//for reading data from post method
app.use(express.urlencoded());

//use cookie parcer
app.use(cookieParcer());

//for static
app.use(express.static('./assets'));

// for layouts
app.use(expressLayouts);

//extract style and scripts from sub pages into the layout
app.set('layout extractStyles',true);
app.set('layout extractScripts',true);


//setup view engine
app.set('view engine','ejs');
app.set('views','./views');

app.use(session({   //doubt 
    name: 'codeial',
    //TODO change the secretthe secret before deployment in production mode
    secret : "blahsomething",
    saveUninitialized: false,
    resave: false,
    cookie: {
        maxAge: (1000*60*100)
    }
}));

app.use(passport.initialize());
app.use(passport.session());

//use express router
app.use('/',require('./routes/index'));

app.listen(port,function(err){
    if(err){
        // console.log('Error : ',err);
        console.log(`Error in running the server : ${err}`);  //interpolation
    }
    console.log(`Server is running on port ${port}`);
});