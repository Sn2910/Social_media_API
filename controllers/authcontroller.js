const mongoose = require('mongoose')
const bcrypt = require('bcrypt');
const User = require('../models/User')
mongoose.connect(process.env.MONGODB_URL, { useNewUrlParser: true }, () => console.log("Database connected"))
function _makeUser(dbUser) {
    return {
        id: dbUser._id.toString(),
        username: dbUser.username,
        email: dbUser.email,
        password: dbUser.password,
        profilePicture: dbUser.profilePicture,
        coverPicture: dbUser.coverPicture,
        followers: dbUser.followers,
        followings: dbUser.followings,
        isAdmin: dbUser.isAdmin
    }
}
//Register
const createUser = async (req, res) => {
    console.log(req.body)

    try {
        //Generate Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);

        //create New User
        const newUser = new User({
            username: req.body.username,
            email: req.body.email,
            password: hashedPassword

        })
        //save user and return response
        const user = await newUser.save()
        res.status(200).json(user)
    }
    catch (err) {
        res.status(200).json(err)

    }

}

//Login
const login = async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email })
        !user && res.status(404).json("user not found")
        const validPassword= await bcrypt.compare(req.body.password,user.password)
        !validPassword &&  res.status(404).json("wrong password")
        res.status(200).json(user)
    }
    catch (err) {
        res.status(200).json(err)

    }
}


module.exports = {
    createUser,
    login
}

