import React, { useState, useEffect } from 'react'
import { Modal } from 'antd'
import UsersList from '../UsersList/UsersList'
import axios from 'axios'
import toast from 'react-hot-toast'
import { useSelector } from 'react-redux'
import LoadingComponent from '../LoadingComponent/LoadingComponent'


const GroupChatModal = ({title = "Basic Modal", isOpen = false, setIsOpen ,...rests}) => {
  const user = useSelector((state) => state.user)
  const [users, setUsers] = useState([])
  const [selectedUsers, setSelectedUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [groupChatName, setGroupChatName] = useState("")

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
    if(isOpen) {
      setLoading(true)
      fetchAllUser()
    } else {
      setSelectedUsers([])
      setGroupChatName("")
    }
  },[user?.id, isOpen])


  useEffect(()=>{
    if(isOpen) {
      setTimeout(()=>{
        setLoading(false)
      },[1000])
    }
  },[isOpen])

  const handleGroup = (user) => {
    if(selectedUsers.includes(user)) {
      setSelectedUsers(
        selectedUsers.filter((item) => item._id !== user._id)
      )
    } else {
      setSelectedUsers([...selectedUsers,user])
    }
  }
  
  const handleSubmit = async(e) => {
    e.preventDefault()
    if(!groupChatName || !selectedUsers) {
      toast.error("Please fill all the feilds")
    }
    try {
      const {data} = await axios.post(`${process.env.REACT_APP_API_URL}/chat/group`,
        {
          name: groupChatName,
          users: JSON.stringify(selectedUsers.map((u) => u._id)),
        }
      )
      if(data) {
        toast.success("New Group Chat Created!")
        setIsOpen(false)
        setSelectedUsers([])
        setGroupChatName("")
      }
    } catch (error) {
      console.log(error)
      toast.error("Failed to Create the Chat!")
    }
  }
  
  return (
    <>
    <Modal title={title} open={isOpen} {...rests}>
      <form onSubmit={handleSubmit}>
        <div className='form-group mb-2'>
          <input type='text' className='w-100 form-control' placeholder='Enter group name' style={{background: "#f5f6f7"}} name='password' onChange={(e) => setGroupChatName(e.target.value)} value={groupChatName} required/>
        </div>
        <div className='form-group mb-2 d-flex gap-3'>
          {
            selectedUsers.map((u) => (
              <div className='d-flex flex-column align-items-center'>
                <img src={u.profilePicture} alt='avatar' style={{
                height: '30px',
                width: '30px',
                borderRadius: '50%',
                border: "1px solid #0866ff",
                objectFit: 'cover'
                }}/>
                <span style={{fontSize: "0.8rem"}}>{u.firstname}</span>
              </div>
            ))
          }
        </div>
        <div className='form-group mb-2'>
          <div className='mb-2' style={{color: "#606770"}}>Add user</div>
          {
            loading? (
              <div className='text-center'>
                <LoadingComponent/>
              </div>
            ) : (
              <div className='user-list'>
                {users?.map((user) => (
                  <UsersList key={user._id} data={user} handleFunction={() => handleGroup(user)}/>
                ))}
              </div>
            )
          }
        </div>
        <div className='form-group d-flex justify-content-end'>
          <button type="submit" className="btn w-70" style={{background: "#42b72a", color: "#fff"}} >Create</button>
        </div>
      </form>
    </Modal>
    </>
  )
}

export default GroupChatModal