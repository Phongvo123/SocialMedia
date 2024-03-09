import React, { useEffect, useState } from 'react'
import logo from "../../assets/images/profile.png"
import axios from 'axios'
const HeaderComponent = ({currentUser, Receiver}) => {

  const [receiverData, setReceiverData] = useState(null)

  useEffect(() => {
    const receiverId = Receiver?.members?.find((id) => id !== currentUser?.id)
    const getReceiver = async () => {
      try {
        const {data} = await axios.get(`${process.env.REACT_APP_API_URL}/user/get-user/${receiverId}`)
        setReceiverData(data)
      } catch (error) {
        console.log(error)
      }
    }
    if(Receiver !== null) {
      getReceiver()
    }
  },[Receiver, currentUser])


  return (
    <div style={{width: "100%", height: "70px", gap: "120px", position: "sticky", background: "#fff", top: "0"}} className='d-flex'>
        <div className='d-flex gap-2 align-items-center' style={{paddingLeft: "10px"}}>
            <img src={currentUser?.profilePicture} alt='avatar' style={{
                height: '50px',
                width: '50px',
                borderRadius: '50%',
                  objectFit: 'cover'
            }} 
            />
            <input type='text' className='form-control rounded' placeholder='Search' style={{height: "40px", width: "180px"}}/>
        </div>
       
        <div className='d-flex align-items-center gap-2'>
            <img src={receiverData?.profilePicture} alt='avatar' style={{
                    height: '50px',
                    width: '50px',
                    borderRadius: '50%',
                    objectFit: 'cover'}}/>
            <div className='name'>
                <span>{receiverData?.username}</span>
            </div>
        </div>
        
    </div>
  )
}

export default HeaderComponent