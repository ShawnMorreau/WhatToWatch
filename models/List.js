const mongoose = require("mongoose")
const User = require("./User")

const listSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        maxLength: 160
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
}, { timestamps: true })
listSchema.pre('remove', async function (next) {
    try {
        let user = await User.findById(this.userId)
        user.movieList.remove(this.id)
        await user.save()
        return next()
    } catch (err) {
        return next(err)
    }
})
const List = mongoose.model("List", listSchema)

module.exports = List