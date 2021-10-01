const mongoose = require("mongoose")
mongoose.set("debug", true)
mongoose.Promise = Promise;
mongoose.connect("mongodb://localhost/moviesList", {
    keepAlive: true,
})

module.exports.User = require("./User")
module.exports.List = require("./List")