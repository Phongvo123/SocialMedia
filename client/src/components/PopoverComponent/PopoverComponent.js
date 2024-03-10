import React from 'react'
import { Popover } from 'antd';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { resetUser } from '../../redux/slices/userSlice';

const PopoverComponent = ({children}) => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleLogout = () => {
        dispatch(resetUser())
        navigate("/")
    }

    const content = (
          <p style={{cursor: "pointer"}} onClick={handleLogout}>Logout</p>
    )
  return (
    <Popover content={content}>
     {children}
  </Popover>
  )
}

export default PopoverComponent