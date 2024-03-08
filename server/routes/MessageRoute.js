const express = require("express")
const router = express.Router()
const {addMessage, getMessage} = require("../controllers/MessageController")

router.post("/", addMessage)
router.get("/:chatId", getMessage)


module.exports = router