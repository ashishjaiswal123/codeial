const Post = require('../models/post');
const Comment = require('../models/comment');

module.exports.create = async function(req,res){
    try{
        // console.log(req.user);
    let post = await Post.create({
        content : req.body.content,
        user : req.user._id
    });
    if(req.xhr){
        return res.status(200).json({
            data : {
                post : post
            },
            message : 'post created!'
        });
    }
    req.flash('success','Post published!!!');
    return res.redirect('back');
    }
    catch(err){
       console.log('errr',err);
       req.flash('error','error in posting post');
    }
    
}

module.exports.destroy = async function(req,res){

    try{
        let post = await Post.findById(req.params.id);
        if(post.user == req.user.id){
            post.remove();
    
            await Comment.deleteMany({post: req.params.id});
    
            if(req.xhr){
                return res.status(200).json({
                    data : {
                        post_id : req.params.id
                    },
                    message : 'post deleted!'
                });
            }
    
            req.flash('success','Post Deleted!!!');
            return res.redirect('back');
        }else{
            req.flash('error', 'error in deleting post');
            return res.redirect('back');
           
        }
    }catch(error){
            console.log('error',error);
    }
    
    
}