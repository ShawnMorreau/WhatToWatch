const express = require("express")
const router = express.Router({ mergeParams: true })

const { createList, getList, deleteList } = require("../handlers/lists")

router.route("/").post(createList)
router
    .route("/:list_id")
    .get(getList)
    .delete(deleteList)



module.exports = router