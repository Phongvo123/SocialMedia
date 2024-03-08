const UserModel = require("../models/userModel")

const getAllUsers = async (req, res) => {
    const id = req.params.id
    try {
        const users = await UserModel.find({_id: {$ne: id}})
        return res.status(200).json(users)
    } catch (error) {
        return  res.status(500).json(error)
    }
}

module.exports = {getAllUsers}