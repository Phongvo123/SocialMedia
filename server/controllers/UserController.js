const UserModel = require("../models/userModel")

const getUser = async (req, res) => {
    const id = req.params.id
    try {
        const user = await UserModel.findById(id)
        return res.status(200).json(user)
    } catch (error) {
        return  res.status(500).json(error)
    }
}

const getAllUsers = async (req, res) => {
    const search = req.query.search || ""
    const query = {
        firstname: { $regex: search, $options: "i"}   
    }
    const id = req.params.id
    try {
        const users = await UserModel.find({_id: {$ne: id}}).find(query)
        return res.status(200).json(users)
    } catch (error) {
        return  res.status(500).json(error)
    }
}

module.exports = {getUser, getAllUsers}