const jwt = require("jsonwebtoken")

exports.authorize = function (req, res, next) {
    try {
        const token = req.headers.authorization.split(" ")[1]
        jwt.verify(token, process.env.SECRET_KEY, function (err, payload) {
            if (payload) {
                return next()
            } else {
                return next({
                    status: 401,
                    message: "Please log in"
                })
            }
        })
    } catch (err) {

        return next({
            status: 401,
            message: "Please log in"
        })
    }
}

exports.authenticate = function (req, res, next) {
    try {
        const token = req.headers.authorization.split(" ")[1]
        jwt.verify(token, process.env.SECRET_KEY, function (err, payload) {
            if (payload && payload.id === req.params.id) {
                return next()
            } else {
                return next({
                    status: 401,
                    message: "Unauthorized action"
                })
            }
        })
    } catch (err) {

        return next({
            status: 401,
            message: "Unauthorized action"
        })
    }
}