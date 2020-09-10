const passport = require('passport');

const LocalStrategy = require('passport-local').Strategy;

const User = require('../models/user');

//authentication using password
passport.use(new LocalStrategy({
    usernameField : 'email'
    },
    function(email,password,done){
        //find a user and established the identity
        User.findOne({email:email}, function(err,user){
            if(err){console.log('error in finding user'); 
                    return done(err);
            }
            if(!user || user.password != password){
                console.log('invalid username/password');
                return done(done,false);
            }

            return done(null,user);
        });
    }
));