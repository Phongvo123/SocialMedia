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
        let chat = await ChatModel.findOne({
            members: { $all: [req.params.firstId, req.params.secondId] },
        });
        if(!chat) {
            chat = await ChatModel.create({
                members: [req.params.firstId, req.params.secondId]
            })
        }
        return res.status(200).json(chat)
         
    } catch (error) {
        return res.status(500).json(error)
    }
}

const createGroupChat = async (req, res) => {
    if(!req.body.users || !req.body.name) {
        return res.status(400).send({message: "Please fill all the feilds"})
    }
    var users = JSON.parse(req.body.users)
    if(users.length < 2) {
        return res.status(400).send("More than 2 users are required to form a group chat")
    }
    users.push(req.body.currentUser)
    try {
        const groupChat = await ChatModel.create({
            chatName: req.body.name,
            users: users,
            isGroupChat: true,
            groupAdmin: req.body.currentUser
        })
        const fullGroupChat = await ChatModel.findOne({_id: groupChat._id})
        .populate("users", "-password")
        .populate("groupAdmin", "-password")
        return res.status(200).json(fullGroupChat)
    } catch (error) {
        return res.status(500).json(error)
    }
}

const renameGroup = async (req, res) => {
    const {chatId, chatName} = req.body
    try {
        const updatedChat = await ChatModel.findByIdAndUpdate(
            chatId,
            {
                chatName: chatName
            },
            {
                new: true
            }
        ).populate("users", "-password").populate("groupAdmin", "-password")
        return res.status(200).json(updatedChat)
    } catch (error) {
        return res.status(500).json(error)
    }
}

const addToGroup = async (req, res) => {
    const {chatId, userId} = req.body
    try {
        const added = await ChatModel.findByIdAndUpdate(
            chatId,
            {
                $push: {users: userId}
            },
            {
                new: true
            }
        )
        .populate("users","-password")
        .populate("groupAdmin", "-password")
        return res.status(200).json(added)
    } catch (error) {
        return res.status(500).json(error)
    }
}

const removeGroup = async (req, res) => {
    const { chatId, userId } = req.body;
    try {
        const removed = await ChatModel.findByIdAndUpdate(
            chatId,
            {
              $pull: { users: userId },
            },
            {
              new: true,
            }
          )
            .populate("users", "-password")
            .populate("groupAdmin", "-password");
        return res.status(200).json(removed)
    } catch (error) {
        return res.status(500).json(error)
    }
}

const findGroupChat = async (req, res) => {
    try {
        const groupChat = await ChatModel.find({users: { $elemMatch: { $eq: req.params.userId } }})
        .populate("users", "-password")
        .populate("groupAdmin", "-password")
        .sort({ updatedAt: -1 })
        return res.status(200).json(groupChat)
    } catch (error) {
        return res.status(500).json(error)
    }
}

module.exports = {createChat, userChats, findChat, createGroupChat, renameGroup, addToGroup, removeGroup, findGroupChat}