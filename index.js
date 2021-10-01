require("dotenv").config();
const express = require("express")
const app = express()
const cors = require("cors")
const errorHandler = require("./handlers/error")
const authRoutes = require("./routes/auth")
const listRoutes = require("./routes/Lists")
const { authenticate, authorize } = require("./middleware/auth")
const PORT = 8081

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({
    extended: true
}))
app.use("/api/auth", authRoutes)
app.use(
    "/api/users/:id/lists",
    authorize,
    authenticate,
    listRoutes
)

app.get("/api/lists", async function(req,res,next){
    try {
        let lists = await db.List.find()
        .sort({createdAt: "desc"})
        .populate("user",{
            username: true,
            profilePicture: true
        });
        return res.status(200).json(lists)
    } catch (err) {
        return next(err)
    }
})
app.use((req, res, next) => {
    let err = new Error("not Found")
    err.status = 404
    next(err)
})

app.use(errorHandler)

app.listen(PORT, () => {
    console.log(`Server is starting on port: ${PORT}`)
})