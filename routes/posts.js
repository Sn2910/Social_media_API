const router = require('express').Router()
const {createPost, updatePost,deletePost,likedPost,getPosts,timelinePosts} = require("../controllers/postcontroller")

//create a post
router.post("/", createPost)
//update a post
router.put("/:id", updatePost)
 //delete a post
 router.delete("/:id", deletePost)
 //like a post
 router.put("/:id/like", likedPost)
 //get a post
 router.get("/", getPosts)
 // get timeline posts
 router.get("/timeline", timelinePosts)
module.exports= router