const User = require('../models/user');

module.exports.profile = function(req,res){
    if(req.cookies.user_id){
        User.findById(req.cookies.user_id,function(err,user){
            if(user){
                return res.render('user_profile',{
                    title :"User Profile",
                    user : user
                })
            }
            return res.redirect('/user/sign-in');
        });
    }else{
        return res.redirect('/user/sign-in');
    }
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

    //steps to authenticate
    //find the user
    User.findOne({email:req.body.email},function(err,user){
        if(err){console.log('errror in finding user in signing in'); return;}
         //handel user found
         if(user){
               //handel password doesn't match
               if(user.password !=  req.body.password){
                   return res.redirect('back');
               }

              //handel session creation
              res.cookie('user_id',user.id);
              return res.redirect('/user/profile');
         }else{
             //handel user not found
             return res.redirect('back');
        }
    });
}

//logging out session
module.exports.logOut = function(req,res){
    res.cookie('user_id','0');
    return res.redirect('/user/sign-in');
}