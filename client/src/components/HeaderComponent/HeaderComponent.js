import React, { useEffect, useState } from 'react'
import axios from 'axios'
import PopoverComponent from '../PopoverComponent/PopoverComponent'
const HeaderComponent = ({currentUser, Receiver, setSearch}) => {

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
    <div style={{width: "100%", height: "70px", gap: "112px", position: "sticky", background: "#fff", top: "0"}} className='d-flex'>
        <div className='d-flex gap-2 align-items-center' style={{paddingLeft: "30px"}}>
          <PopoverComponent>
          <img src={currentUser?.profilePicture} alt='avatar' style={{
                height: '50px',
                width: '50px',
                borderRadius: '50%',
                border: "1px solid #0866ff",
                objectFit: 'cover',
                cursor: "pointer"
            }} 
            />
          </PopoverComponent>
            <input type='text' className='form-control rounded' placeholder='Search' style={{height: "40px", width: "180px"}} onChange={(e) => setSearch(e.target.value)}/>
        </div>
       {Receiver ? (
        <div className='d-flex align-items-center gap-2' style={{paddingLeft: "10px"}}>
          <img src={receiverData?.profilePicture} alt='avatar' style={{
            height: '50px',
            width: '50px',
            borderRadius: '50%',
            border: "1px solid #0866ff",
            objectFit: 'cover'}}/>
          <div className='name'>
            <span>{receiverData?.firstname} {receiverData?.lastname}</span>
          </div>
        </div>
       ): (
        <div style={{background: "#f0f2f5", width: "100%"}}/>
       )}
    </div>
  )
}

export default HeaderComponent