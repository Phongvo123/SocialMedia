const express = require("express")
const router = express.Router()
const {createChat, userChats, findChat, createGroupChat, renameGroup, addToGroup, removeGroup} = require("../controllers/ChatController")

router.post("/", createChat)
router.get("/:userId", userChats)
router.get("/find/:firstId/:secondId", findChat)
router.post("/group", createGroupChat)
router.put("/rename-group", renameGroup)
router.put("/remove-group", removeGroup)
router.put("/add-group", addToGroup)

module.exports = router