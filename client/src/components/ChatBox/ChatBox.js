import React, { useEffect, useState } from 'react'
import InputEmoji from 'react-input-emoji'
import { IoSend } from "react-icons/io5";
import "./ChatBox.css"
import axios from 'axios';
import {format} from "timeago.js"


const ChatBox = ({chat, currentUser}) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const { data } = await axios.get(`${process.env.REACT_APP_API_URL}/message/${chat?._id}`);
        setMessages(data);
        console.log("messages", messages)
      } catch (error) {
        console.log(error);
      }
    };

    if (chat !== null) fetchMessages();
  },[chat])

  const handleChange = (e) => {
    setNewMessage(e.target.value)
  }

  return (
    <div>
        <div className='chat-body'>
            <div className='d-flex flex-column'>
              {messages.map((message) => (
                <>
                  <div className={message.senderId === currentUser? "message own" : "message"}>
                    <span>{message.text}</span>
                    <span>{format(message.createdAt)}</span>
                  </div>
                </>
              ))}
            </div>
        </div>
        <div className='chat-sender d-flex align-items-center'>
            <div>+</div>
            <InputEmoji
              value={newMessage}
              onChange={handleChange}
            />
            <div><IoSend/></div>
        </div>
    </div>
  )
}
export default ChatBox