const db = require("../models")
const jwt = require("jsonwebtoken")

exports.signin = async (req, res, next) => {
    try {
        let user = await db.User.findOne({
            email: req.body.email
        })
        let { id, username, profilePicture } = user
        let isMatch = await user.comparePassword(req.body.password)
        if (isMatch) {
            token = jwt.sign({
                id,
                username,
                profilePicture
            }, process.env.SECRET_KEY)
            return res.status(200).json({
                id,
                username,
                profilePicture,
                token
            })
        } else {
            return next({
                status: 400,
                message: "Invalid Email or Password"
            })
        }
    } catch (err) {
        return next({
            status: 400,
            message: "Invalid Email or Password"
        })
    }
}

exports.signup = async (req, res, next) => {
    try {
        //create a user
        //create a token
        let user = await db.User.create(req.body)
        let { id, username, profilePicture } = user
        let token = jwt.sign({
            id,
            username,
            profilePicture
        }, process.env.SECRET_KEY)

        return res.status(200).json({
            id,
            username,
            profilePicture,
            token
        })
    } catch (err) {
        //mongoose specific error
        if (err.code === 11000) {
            err.message = "Sorry, that username and/or email is taken";
        }
        return next({
            status: 400,
            message: err.message
        })
    }
}