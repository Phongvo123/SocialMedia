import React, { useEffect, useRef, useState } from 'react'
import ConversationComponent from '../../components/ConversationComponent/ConversationComponent'
import ChatBox from '../../components/ChatBox/ChatBox'
import HeaderComponent from '../../components/HeaderComponent/HeaderComponent'
import {useSelector} from 'react-redux'
import axios from "axios"
import {io} from 'socket.io-client'
import "./ChatPage.css"
import LoadingComponent from '../../components/LoadingComponent/LoadingComponent'
const ChatPage = () => {
  const user = useSelector((state) => state.user)

  const socket = useRef()

  const [onlineUsers, setOnlineUsers] = useState([]);
  const [users, setUsers] = useState([])
  const [currentChat, setCurrentChat] = useState(null);
  const [sendMessage, setSendMessage] = useState(null);
  const [receivedMessage, setReceivedMessage] = useState(null);
  const [search, setSearch] = useState("")
  const [loading, setLoading] = useState(true)


  
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
  
  const checkOnlineStatus = (id) => {
    const online = onlineUsers.find((user) => user.userId === id)
    return online ? true : false
  }
  

  const fetchAllUser = async () => {
    try {
        const {data} = await axios.get(`${process.env.REACT_APP_API_URL}/user/${user?.id}?search=${search}`)
        if(data) {
            setUsers(data)
        }
    } catch (error) {
        console.log(error)
    }
  }
  useEffect(()=>{
    setLoading(true)
    fetchAllUser()
  },[user?.id, search])

  const handleFindChat = async (id) => {
    const {data} = await axios.get(`${process.env.REACT_APP_API_URL}/chat/find/${user?.id}/${id}`)
    setCurrentChat(data)
  }

  useEffect(()=>{
    setTimeout(()=>{
      setLoading(false)
    },[1000])
  },[search])
  
  return (
    <div style={{height: "720px"}}>
      <HeaderComponent currentUser={user} Receiver={currentChat} setSearch={setSearch}/>
      <div className='d-flex' style={{marginTop: "0"}}>
            <div className='col-3' style={{position: "fixed", top: "70px"}}>
                <div>
                    <h2 className='mb-3' style={{paddingLeft: "30px"}}>Chat</h2>
                      {loading ? (
                        <div className='text-center'>
                          <LoadingComponent/>
                        </div>
                      ) : (
                        <div className='chat-list'>
                           {users.map((user) => (
                            <div
                            className='conversation-container'
                            onClick={() => handleFindChat(user?._id)}
                            >
                                <ConversationComponent
                                  data = {user}
                                  online={checkOnlineStatus(user?._id)}
                                />
                            </div>
                        ))}
                        </div>
                      )}
                </div>
            </div>
            {currentChat ? (
              <div className='col-9' style={{ background: "#f0f2f5" ,marginLeft: "25%", height: "700px"}}>
               <ChatBox
                chat={currentChat}
                currentUser={user?.id}
                setSendMessage={setSendMessage}
                receivedMessage={receivedMessage}
               />
              </div>
            ) : (
              <div className='col-9 d-flex align-items-center justify-content-center' style={{height: "700px", marginLeft: "25%", background: "#f0f2f5"}}>
                <span className='chatbox-empty-message'>
                  Tap on a chat to start conversation...
                </span>
              </div>
            )}
            
        </div>
    </div>
 
  )
}

export default ChatPage