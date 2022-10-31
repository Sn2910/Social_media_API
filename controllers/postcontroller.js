const Post = require("../models/Post")
// create new post
const createPost = async(req, res) =>{
    const newPost = new Post(req.body)
    try{
    const post = await newPost.save()
        res.status(200).json(post)
    }
    catch (err) {
        res.status(200).json(err)

    }

}
//update post
const updatePost = async(req,res)=>{
    try{
        const post= await Post.findById(req.params.id)
        if(post.userId === req.body.userId){
          await Post.updateOne({$set: req.body})
          res.status(200).json("The post has been updated")
        }else{
        res.status(403).json("you can update only your post")
      }

    }catch(err){
        res.status(500).json(err)
    }
}
//Delete Post
const deletePost = async(req,res)=>{
    try{
        const post= await Post.findById(req.params.id)
        if(post.userId === req.body.userId){
          await Post.delete()
          res.status(200).json("The post has been deleted")
        }else{
        res.status(403).json("you can delete only your post")
      }

    }catch(err){
        res.status(500).json(err)
    }
}
//like and dislike Post
const likedPost= async(req, res)=>{
    try {
        const post= await Post.findById(req.params.id)
        if(!post.likes.includes(req.body.userId)){
          await Post.updateOne({$push:{likes: req.body.userId}})
          res.status(200).json("post has benn liked")
        }else{
            await Post.updateOne({$pull:{likes: req.body.userId}})
            res.status(200).json("post has benn disliked")
        }
    } catch (err) {
   res.status(500).json(err)
    }
}
const getPosts = async(req,res)=>{
    const posts = await Post.find({})
    res.status(200).json(posts)
}
const timelinePosts =async(req, res)=>{
    const currentUser= await Post.findById(req.body.userId)
    console.log(currentUser)
}

module.exports = {createPost, updatePost,deletePost,likedPost,getPosts,timelinePosts}