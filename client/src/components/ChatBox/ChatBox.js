import React from 'react'
import InputEmoji from 'react-input-emoji'
import { IoSend } from "react-icons/io5";
import "./ChatBox.css"


const ChatBox = () => {
  return (
    <div>
        <div className='chat-body'>
            <div className='message d-flex flex-column'>
                <span>Text</span>
                <span>15/05/01</span>
            </div>
        </div>
        <div className='chat-sender d-flex align-items-center'>
            <div>+</div>
            <InputEmoji/>
            <div><IoSend/></div>
        </div>
    </div>
  )
}
export default ChatBox