const User = require('../models/user');

module.exports.profile = function(req,res){
    return res.render('user_profile',{
        title : 'user profile'
    });
}

//render the signup page
module.exports.signUp = function(req,res){
    return res.render('user_sign_up',{
        title : 'Codeial | Signup'
    });
}

//render the signin page
module.exports.singnIn = function(req,res){
    return res.render('user_sign_in',{
        title : 'Codeial | Signin'
    });
}

//get the sign up data
module.exports.create = function(req,res){
    if(req.body.password != req.body.confirm_password){
        return res.redirect('back');
    }
    User.findOne({email : req.body.email},function(err,user){
        if(err){console.log('error in finding user in sign up'); return;}
        if(!user){
            User.create(req.body,function(err,user){
                if(err){console.log('error in creating while signing up'); return;}
                return res.redirect('/user/sign-in');
            });
        }else{
            return res.redirect('back');
        }
    })
}

//sign in and create a session
module.exports.createSession = function(req,res){
    //todo later
}