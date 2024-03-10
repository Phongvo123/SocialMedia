import React from 'react'


const ConversationComponent = ({data, online}) => {
  return (
    <div className='d-flex gap-2'>
        <img src={data.profilePicture} alt='avatar' style={{
             height: '40px',
             width: '40px',
             borderRadius: '50%',
             border: "1px solid #0866ff",
             objectFit: 'cover'
        }}/>
        <div className='d-flex flex-column' style={{fontSize: '0.8rem'}}>
            <span>{data.firstname} {data.lastname}</span>
            <span style={{color: online?"#51e200" : ""}}>{online?"Online" : "Offline"}</span>
        </div>
    </div>
  )
}

export default ConversationComponent