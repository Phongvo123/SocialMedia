import React, { useState } from 'react'
import ModalComponent from '../../components/ModalComponent/ModalComponent'
import axios from 'axios'
import {useNavigate} from 'react-router-dom'
import { Upload, Button } from 'antd'
import { getBase64 } from '../../untils'
import styled from "styled-components";

const LogInPage = () => {

    const WrapperUploadFile = styled(Upload)`
    & .ant-upload.ant-upload-select.ant-upload-select-picture-card {
      width: 60px;
      height: 60px;
      border-radius: 50%;
    }
    & .ant-upload-list-item-info {
      display: none;
    }
    & .ant-upload-list-item {
      display: none;
    }
  `;

    const navigate = useNavigate()

    const initialState = {
        firstname: "",
        lastname: "",
        username: "",
        password: "",
        
    };

    const [isOpenModal, setIsOpenModal] = useState(false)
    const [username, setUserName] = useState("")
    const [password, setPassword] = useState("")
    const [image, setImage] = useState("");
    const [comparePassword, setComparePassword] = useState(false)
    const [data, setData] = useState(initialState)

    const handleOpenModal = () => {
        setIsOpenModal(true)
    }

    const handleCancelModal = () => {
        setIsOpenModal(false)
        setData(initialState)
    }

    const handleLogIn = async(e) => {
        e.preventDefault()
        try {
            const {data} = await axios.post(`${process.env.REACT_APP_API_URL}/auth/login`, {
                username,
                password
            })
            if(data) {
                navigate("/chat")
            } 
        } catch(error) {
            setComparePassword(true)
            console.log(error)
        }
    }

    const handleOnchangeAvatar = async ({ fileList }) => {
        const file = fileList[0];
        if (!file.url && !file.preview) {
          file.preview = await getBase64(file.originFileObj);
        }
        setImage(file.preview);
      };

    const handleOnChange = (e) => {
        setData(
            {
                ...data,
                [e.target.name] : e.target.value
            }
            
        )
    }

    const handleSignUp = (e) => {
        e.preventDefault()
        try {

        } catch (error) {

        }
        setData(initialState)
    } 

    console.log("data", data)
   

  return (
    <div style={{height : "720px", background: "#f0f2f5"}} className='d-flex flex-column align-items-center justify-content-center'>
        <h1 className='mb-3' style={{color: "#0866ff"}}>Social Media</h1>
        <div className='p-3 w-25 rounded' style={{background: "#fff"}}>
            <form onSubmit={handleLogIn}>
                <div className='form-group mb-2'>
                    <input type='text' className='w-100 form-control' placeholder='Username' onChange={(e) => setUserName(e.target.value)} required/>
                </div>
                <div className='form-group mb-3'>
                    <input type='password' className='w-100 form-control' placeholder='Password' onChange={(e) => setPassword(e.target.value)} required/>
                    {comparePassword ? (<div style={{color:"#f02849", fontSize:"13px"}}>The username or password that you've entered is incorrect.</div>) : ("")}
                </div>
                <div className='form-group mb-3'>
                <button type="submit" className="btn btn-primary w-100 btn-lg"
                >
                    Log in
                </button>
                </div>
                <div className='form-group mb-3' style={{borderBottom: "1px solid #dadde1"}}></div>
                <div className='form-group mb-3 text-center'>
                    <button type='button' className='btn w-60 btn-lg' style={{background: "#42b72a", color: "#fff"}}
                    onClick={handleOpenModal}
                    >
                        Create new account
                    </button>
                </div>
            </form>
            <ModalComponent title='Sign Up' isOpen={isOpenModal} footer={null} onCancel={handleCancelModal}>
                <div className='mb-2' style={{color: "#606770"}}>It's quick and easy</div>
                <div className='mb-3' style={{borderBottom: "1px solid #dadde1"}}></div>
                <form onSubmit={handleSignUp}>
                <div className='form-group mb-2 d-flex justify-content-between gap-2'>
                    <input type='text' className='w-50 form-control' placeholder='Firstname' style={{background: "#f5f6f7"}} name='firstname' onChange={handleOnChange} value={data.firstname} required/>
                    <input type='text' className='w-50 form-control' placeholder='Lastname' style={{background: "#f5f6f7"}} name='lastname' onChange={handleOnChange}  value={data.lastname} required/>
                </div>
                <div className='form-group mb-2'>
                    <input type='text' className='w-100 form-control' placeholder='Username' style={{background: "#f5f6f7"}} name='username' onChange={handleOnChange} value={data.username} required/>
                </div>
                <div className='form-group mb-3'>
                    <input type='password' className='w-100 form-control' placeholder='Password' style={{background: "#f5f6f7"}} name='password' onChange={handleOnChange} value={data.password} required/>
                </div>
                <div className='form-group mb-3'>
                <WrapperUploadFile
                  onChange={handleOnchangeAvatar}
                  maxCount={1}
                  required
                >
                  <Button style={{background: "#f5f6f7"}}>Upload Image</Button>
                  {image && (
                    <img
                      src={image}
                      style={{
                        height: "60px",
                        width: "60px",
                        borderRadius: "50%",
                        objectFit: "cover",
                        marginLeft: "10px",
                      }}
                      alt="avatar"
                    />
                  )}
                </WrapperUploadFile>
                </div>
                <div className='form-group mb-3 text-center'>
                    <button type="submit" className="btn w-70 btn-lg" style={{background: "#42b72a", color: "#fff"}} >Sign Up</button>
                </div>
            </form>
            </ModalComponent>
        </div>
    </div>
  )
}

export default LogInPage