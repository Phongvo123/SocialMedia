import React from 'react'
import ConversationComponent from '../../components/ConversationComponent/ConversationComponent'
import ChatBox from '../../components/ChatBox/ChatBox'
import HeaderComponent from '../../components/HeaderComponent/HeaderComponent'

const ChatPage = () => {
  return (
    <div style={{height : "720px"}}>
        <HeaderComponent/>
        <div className='row h-100'>
            <div className='col-3' style={{overflow: "scroll"}}>
                <div >
                    <h2 className='mb-3'>Chat</h2>
                    <div>
                        <ConversationComponent/>
                    </div>
                </div>
            </div>
            <div className='col-9' style={{padding: "20px", background: "#f0f2f5"}}>
                 <ChatBox/>
            </div>
        </div>
    </div>
  )
}

export default ChatPage