const UserModel = require("../models/userModel")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

const registerUser = async(req, res) => {
    const {username, password, firstname, lastname, profilePicture} = req.body
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)
    const newUser = new UserModel({username, password: hashedPassword, firstname, lastname, profilePicture})
    try {
        const oldUser = await UserModel.findOne({ username });
        if(oldUser) {
            return res.status(400).json({message: "User already exists"})
        } else {
            const user = await newUser.save()
            return res.status(200).json({user})
        }
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
}
const loginUser = async(req, res) => {
    const {username, password} = req.body
    try {
        const user = await UserModel.findOne({username: username})
        if(user) {
            const comparePassword = await bcrypt.compare(password, user.password)
            if(!comparePassword) {
                return res.status(400).json({message: "Wrong password"})
            } else {
                const token = jwt.sign(
                    { username: user.username, id: user._id },
                    process.env.JWT_KEY,
                    { expiresIn: "7d" }
                  );
                  return res.status(200).json({ user, token });
            }
        } else {
            return res.status(404).json("User not found");
        }
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
}

module.exports = {registerUser, loginUser}