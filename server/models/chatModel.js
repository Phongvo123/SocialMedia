const mongoose = require("mongoose")

const ChatSchema = new mongoose.Schema(
    {
        chatName: {
            type: String,
            trim: true
        },
        isGroupChat: {
            type: Boolean,
            default: false
        },
        members: {
            type: Array,
        },
        users: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Users"
            }
        ],
        groupAdmin: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Users"
        }
    },
    {
        timestamps: true,
    }
)

const ChatModel = mongoose.model("Chat", ChatSchema)
module.exports = ChatModel