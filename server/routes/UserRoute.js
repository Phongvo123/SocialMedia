const express = require("express")
const {getAllUsers} = require("../controllers/UserController")
const router = express.Router()

router.get('/:id', getAllUsers)

module.exports = router