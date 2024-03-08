import React, { useEffect, useState } from 'react'
import ConversationComponent from '../../components/ConversationComponent/ConversationComponent'
import ChatBox from '../../components/ChatBox/ChatBox'
import HeaderComponent from '../../components/HeaderComponent/HeaderComponent'
import {useSelector} from 'react-redux'
import axios from "axios"
const ChatPage = () => {
  const user = useSelector((state) => state.user)

  const [users, setUsers] = useState([])
  const [currentChat, setCurrentChat] = useState(null);

  const fetchAllUser = async () => {
    try {
        const {data} = await axios.get(`${process.env.REACT_APP_API_URL}/user/${user?.id}`)
        if(data) {
            setUsers(data)
        }
    } catch (error) {
        console.log(error)
    }
  }
  useEffect(()=>{
    fetchAllUser()
  },[user?.id])

  const handleFindChat = async (id) => {
    const {data} = await axios.get(`${process.env.REACT_APP_API_URL}/chat/find/${user?.id}/${id}`)
    setCurrentChat(data)
  }

  return (
    <div style={{height : "720px"}}>
        <HeaderComponent avatar={user?.profilePicture} avatarReceiver={currentChat}/>
        <div className='row h-100'>
            <div className='col-3' style={{overflow: "scroll"}}>
                <div >
                    <h2 className='mb-3'>Chat</h2>
                    <div className='chat-list'>
                        {users.map((user) => (
                            <div
                            onClick={() => handleFindChat(user?.id)}
                            >
                                <ConversationComponent
                                  data = {user}
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <div className='col-9' style={{padding: "20px", background: "#f0f2f5"}}>
                <ChatBox
                />
            </div>
        </div>
    </div>
  )
}

export default ChatPage