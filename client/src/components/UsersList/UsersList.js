import React from 'react'
import { Checkbox } from 'antd'

const UsersList = ({data, handleFunction }) => {
  const onChange = (e) => {
    handleFunction()
  }
  return (
    <div className='d-flex justify-content-between mb-2'>
        <div className='gap-3 d-flex align-items-center'>
            <img src={data.profilePicture} alt='avatar' style={{
             height: '40px',
             width: '40px',
             borderRadius: '50%',
             border: "1px solid #0866ff",
             objectFit: 'cover'
            }}/>
            <span style={{fontSize: '0.8rem'}}>{data.firstname} {data.lastname}</span>
        </div>
        <Checkbox onChange={onChange}/>
    </div>
  )
}

export default UsersList