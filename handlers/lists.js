const db = require("../models")

exports.createList = async function(req,res,next){
    try{
        let list = await db.List.create({
            title: req.body.title,
            user: req.params.id
        })
        let foundUser = await db.User.findById(req.params.id)
        foundUser.movieLists.push(list.id)
        await foundUser.save()
        let foundList = await db.List.findById(list._id).populate("user", {
            username: true,
            profilePicture: true
        })
        return res.status(200).json(foundList)
    }catch(err){
        return next(err)
    }
}
exports.getList = async function(req,res,next){
    try{
        let list = await db.List.findById(req.params.list_id)
        return res.status(200).json(list)
    }catch(err){
        return next(err)
    }
}
exports.deleteList = async function(req,res,next){
    try {
        let list = await db.List.findById(req.params.list_id)
        await list.remove()
        return res.status(200).json(list)
    } catch (err) {
        return next(err)
    }
}