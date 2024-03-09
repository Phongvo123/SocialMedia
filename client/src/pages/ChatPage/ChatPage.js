import React, { useEffect, useRef, useState } from 'react'
import ConversationComponent from '../../components/ConversationComponent/ConversationComponent'
import ChatBox from '../../components/ChatBox/ChatBox'
import HeaderComponent from '../../components/HeaderComponent/HeaderComponent'
import {useSelector} from 'react-redux'
import axios from "axios"
import {io} from 'socket.io-client'
const ChatPage = () => {
  const user = useSelector((state) => state.user)

  const socket = useRef()

  const [onlineUsers, setOnlineUsers] = useState([]);
  const [users, setUsers] = useState([])
  const [currentChat, setCurrentChat] = useState(null);
  const [sendMessage, setSendMessage] = useState(null);
  const [receivedMessage, setReceivedMessage] = useState(null);

  
  useEffect(() => {
    socket.current = io('http://localhost:8800')
    socket.current.emit("new-user-add", user.id)
    socket.current.on("get-users", (users) => {
      setOnlineUsers(users)
    });
  },[user])


  useEffect(() => {
    if(sendMessage!==null) {
      socket.current.emit('send-message', sendMessage)
    }
  },[sendMessage])

  useEffect(() => {
    socket.current.on("receive-message", (data) => {
      console.log(data)
      setReceivedMessage(data)
    })
  },[])
  
  

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
    <div style={{height: "720px"}}>
      <HeaderComponent currentUser={user} Receiver={currentChat}/>
      <div className='d-flex' style={{marginTop: "0"}}>
            <div className='col-3' style={{position: "fixed", top: "70px"}}>
                <div >
                    <h2 className='mb-3'>Chat</h2>
                    <div className='chat-list'>
                        {users.map((user) => (
                            <div
                            onClick={() => handleFindChat(user?._id)}
                            >
                                <ConversationComponent
                                  data = {user}
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <div className='col-9' style={{padding: "20px", background: "#f0f2f5", marginLeft: "25%"}}>
                <ChatBox
                  chat={currentChat}
                  currentUser={user?.id}
                  setSendMessage={setSendMessage}
                  receivedMessage={receivedMessage}
                />
            </div>
        </div>
    </div>
 
  )
}

export default ChatPage