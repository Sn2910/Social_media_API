const User = require('../models/User')
 const bcrypt = require('bcrypt');

//update user
const updateUser = async (req, res) => {
    if (req.body.userId === req.params.id || req.body.isAdmin) {
        if (req.body.password) {
            try {
                const salt = await bcrypt.genSalt(10);
                req.body.password = await bcrypt.hash(req.body.password, salt);
            } catch (err) {
                res.status(500).json(err)

            }
        }
        try{
            const user = await User.findByIdAndUpdate(req.params.id, {
                $set: req.body,
            })
            res.status(200).json("Account has been updated")
        }catch (err) {
            res.status(500).json(err)

        }

    } else {
        return res.status(403).json("You can update only your account")
    }
}
//delete user
const deleteUser = async (req, res) => {
    if (req.body.userId === req.params.id || req.body.isAdmin) {
        
        try{
            const user = await User.findByIdAndDelete(req.params.id)
            res.status(200).json("Account has been deleted")
        }catch (err) {
            res.status(500).json(err)

        }

    } else {
        return res.status(403).json("You can delete only your account")
    }
}
//get a user
const getUserById = async (req, res) => {
    const userId = req.query.userId
    const username = req.query.username
    try {
        const user = userId ? await User.findById(userId) :await User.findOne({username: username})
        const {password,updatedAt,...otherdetails} =user._doc
        res.status(200).json(otherdetails)
    } catch (err) {
        res.status(500).json(err)
    }

}

//follow a user
const userFollowers = async(req,res)=>{
    if(req.body.userId !== req.params.id){
        //current user follows user
        const user = await User.findById(req.params.id)
        const currentUser = await User.findById(req.body.userId)
        if(!user.followers.includes(req.body.userId)){
            await user.updateOne({$push: {followers: req.body.userId}})
            await currentUser.updateOne({$push: {followings: req.params.id}})
            res.status(200).json("user has benn followed")
        }else{
            res.status(403).json("You already follow this user")
        }
        

    }else{
        return res.status(403).json("You cannot follow yourself")
    }
}

//unfollow a user
const userUnfollowers = async(req,res)=>{
    if(req.body.userId !== req.params.id){
        //current user unfollows user
        const user = await User.findById(req.params.id)
        const currentUser = await User.findById(req.body.userId)
        if(user.followers.includes(req.body.userId)){
            await user.updateOne({$pull: {followers: req.body.userId}})
            await currentUser.updateOne({$pull: {followings: req.params.id}})
            res.status(200).json("user has been unfollowed")
        }else{
            res.status(403).json("You dont follow this user")
        }
        

    }else{
        return res.status(403).json("You cannot unfollow yourself")
    }
}
module.exports = {
    updateUser,
    deleteUser,
    getUserById,
    userFollowers,
    userUnfollowers,
    
    
}
