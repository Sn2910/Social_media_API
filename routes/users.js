const { updateUser,deleteUser,getUserById,userFollowers,userUnfollowers } = require("../controllers/usercontroller")
const router = require('express').Router()

//update user

//delete user
router.delete("/:id", deleteUser)
//get a user
router.get("/:id", getUserById)
//follow a user
router.put("/:id/follow", userFollowers)
//unfollow a user
router.put("/:id/unfollow", userUnfollowers)

module.exports= router
