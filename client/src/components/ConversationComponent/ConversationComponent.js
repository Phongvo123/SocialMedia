import React from 'react'
import logo from "../../assets/images/profile.png"

const ConversationComponent = () => {
  return (
    <div className='d-flex gap-2'>
        <img src={logo} alt='avatar' style={{
             height: '40px',
             width: '40px',
             borderRadius: '50%',
             objectFit: 'cover'
        }}/>
        <div className='d-flex flex-column' style={{fontSize: '0.8rem'}}>
            <span>Phong</span>
            <span style={{color: '#51e200'}}>Online</span>
        </div>
    </div>
  )
}

export default ConversationComponent