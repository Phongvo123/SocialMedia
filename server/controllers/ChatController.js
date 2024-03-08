const ChatModel = require("../models/chatModel")

const createChat = async (req, res) => {
    const newChat = new ChatModel({
        members: [req.body.senderId, req.body.receiverId]
    })
    try {
        const result = await newChat.save()
        return res.status(200).json(result)
    } catch (error) {
        return res.status(500).json(error)
    }
}

const userChats = async (req, res) => {
    try {
        const chat = await ChatModel.find({
            members: { $in: [req.params.userId] },
          });
          return res.status(200).json(chat);
    } catch (error) {
        return res.status(500).json(error)
    }
}

const findChat = async (req, res) => {
    try {
        const chat = await ChatModel.findOne({
            members: { $all: [req.params.firstId, req.params.secondId] },
          });
          return res.status(200).json(chat)
         
    } catch (error) {
        return res.status(500).json(error)
    }
}

module.exports = {createChat, userChats, findChat}