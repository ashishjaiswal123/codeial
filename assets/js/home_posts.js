{   
    //method to submit the form data for new post using ajax
    let createPost = function(){
        let newPostForm= $('#new-post-form');
        newPostForm.submit(function(e){
            e.preventDefault();

            $.ajax({
                type : 'post',
                url : '/posts/create',
                data : newPostForm.serialize(),
                success : function(data){
                    let newPost = newPostDom(data.data.post);
                    $('#post-list-container>ul').prepend(newPost);
                    deletePost($(' .delete-post-button',newPost));
                }, error: function(error){
                    console.log(error.responseText);
                }
            });
        });
    }

    //method to create a post in dom
    let newPostDom = function(post){
        return $(`<li id="post-${post._id}">
        <section id="post-detail">
           <span>${post.user.name } </span>
           
              <small>
                     <a class="delete-post-button" href="/posts/destroy/${post._id}">X</a>
              </small>
             
           <br>
           <div>${ post.content }</div>
        </section>
    
        <div class="post-comments">
               
               <div class="posts-comments-list">
                      <ul id="post-comments-${post._id}">
                             
                      </ul>
               </div>
    
              
                  <form action="/comments/create" method="POST" class="comment-box">
                      <input  type="text" name="content" placeholder="type here to add comment" required class="type-here">
                      <input type="hidden" name="post" value="${ post._id }">
                      <input type="submit" value="add comment" class="btn">
                   </form>  
             
        </div>
    </li>`)
    }


    //method to delete a post from dom
    let deletePost = function(deleteLink){
        $(deleteLink).click(function(e){
            e.preventDefault();
            $.ajax({
                type : 'get',
                url : $(deleteLink).prop('href'),
                success : function(data){
                    $(`#post-${data.data.post_id}`).remove();
                },error : function(err){
                    console.log(err.responseText);
                }
            });
        });
    }
    createPost();
}