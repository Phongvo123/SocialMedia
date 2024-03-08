import React from 'react'
import logo from "../../assets/images/profile.png"
const HeaderComponent = () => {
  return (
    <div style={{width: "100%", height: "70px", gap: "120px"}} className='d-flex'>
        <div className='d-flex gap-2 align-items-center' style={{paddingLeft: "10px"}}>
            <img src={logo} alt='avatar' style={{
                height: '50px',
                width: '50px',
                borderRadius: '50%',
                  objectFit: 'cover'
            }} 
            />
            <input type='text' className='form-control rounded' placeholder='Search' style={{height: "40px", width: "180px"}}/>
        </div>
       
        <div className='d-flex align-items-center gap-2'>
            <img src={logo} alt='avatar' style={{
                    height: '50px',
                    width: '50px',
                    borderRadius: '50%',
                    objectFit: 'cover'}}/>
            <div className='name'>
                <span>Phong</span>
            </div>
        </div>
        
    </div>
  )
}

export default HeaderComponent