const express = require("express")
const {getAllUsers, getUser} = require("../controllers/UserController")
const router = express.Router()

router.get('/get-user/:id', getUser)
router.get('/:id', getAllUsers)

module.exports = router