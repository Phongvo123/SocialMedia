import React, { useEffect, useRef, useState } from 'react'
import InputEmoji from 'react-input-emoji'
import { IoSend } from "react-icons/io5";
import "./ChatBox.css"
import axios from 'axios';
import {format} from "timeago.js"


const ChatBox = ({chat, currentUser, setSendMessage, receivedMessage}) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");

  const scroll = useRef()

  useEffect(() => {
    if(receivedMessage !== null && receivedMessage.chatId === chat._id) {
      setMessages([...messages, receivedMessage])
    }
  },[receivedMessage])

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

  const handleChange = (newMessage) => {
    setNewMessage(newMessage)
  }

  const handleSend = async (e) => {
    e.preventDefault()
    const message = {
      chatId : chat?._id,
      senderId : currentUser,
      text : newMessage
    }
    const receiverId = chat?.members.find((id) => id !== currentUser)
   setSendMessage({...message, receiverId})
    try {
      const {data} = await axios.post(`${process.env.REACT_APP_API_URL}/message`,message)
      setMessages([...messages, data])
      setNewMessage("")

    } catch (error) {
      console.log(error)
    }
  }

  useEffect(()=> {
    scroll.current?.scrollIntoView({ behavior: "smooth" });
  },[messages])

  return (
    <div>
        <div className='chat-body' style={{height: "650px", overflow: "scroll"}}>
            <div className='d-flex flex-column' style={{padding: "20px"}}>
              {messages.map((message) => (
                <>
                  <div ref={scroll} className={message.senderId === currentUser? "message own" : "message"}>
                    <span>{message.text}</span>
                    <span>{format(message.createdAt)}</span>
                  </div>
                </>
              ))}
            </div>
        </div>
        <div className='chat-sender' style={{height: "50px"}}>
            <InputEmoji
              value={newMessage}
              onChange={handleChange}
            />
            {newMessage ? (
              <div onClick={(e) => handleSend(e)} style={{cursor: "pointer" , fontSize: "30px"}}><IoSend/></div>
            ) : (
              ""
            )}
            </div>
    </div>
  )
}
export default ChatBox