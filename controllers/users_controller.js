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
    //todo later
}

//sign in and create a session
module.exports.createSession = function(req,res){
    //todo later
}