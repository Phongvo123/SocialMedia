import React, { useState } from 'react'
import ModalComponent from '../../components/ModalComponent/ModalComponent'

const LogInPage = () => {
    const [isOpenModal, setIsOpenModal] = useState(false)

    const handleOpenModal = () => {
        setIsOpenModal(true)
    }

    const handleCancelModal = () => {
        setIsOpenModal(false)
    }

  return (
    <div style={{height : "720px", background: "#f0f2f5"}} className='d-flex flex-column align-items-center justify-content-center'>
        <h1 className='mb-3' style={{color: "#0866ff"}}>Social Media</h1>
        <div className='p-3 w-25 rounded' style={{background: "#fff"}}>
            <form>
                <div className='form-group mb-2'>
                    <input type='text' className='w-100 form-control' placeholder='Username'/>
                </div>
                <div className='form-group mb-3'>
                    <input type='password' className='w-100 form-control' placeholder='Password'/>
                </div>
                <div className='form-group mb-3'>
                <button type="button" className="btn btn-primary w-100 btn-lg" >Log in</button>
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
                <form>
                <div className='form-group mb-2 d-flex justify-content-between gap-2'>
                    <input type='text' className='w-50 form-control' placeholder='Firstname' style={{background: "#f5f6f7"}}/>
                    <input type='text' className='w-50 form-control' placeholder='Lastname' style={{background: "#f5f6f7"}}/>
                </div>
                <div className='form-group mb-2'>
                    <input type='text' className='w-100 form-control' placeholder='Username' style={{background: "#f5f6f7"}}/>
                </div>
                <div className='form-group mb-3'>
                <input type='password' className='w-100 form-control' placeholder='Password' style={{background: "#f5f6f7"}}/>
                </div>
                <div className='form-group mb-3 text-center'>
                <button type="button" className="btn w-70 btn-lg" style={{background: "#42b72a", color: "#fff"}} >Sign Up</button>
                </div>
            </form>
            </ModalComponent>
        </div>
    </div>
  )
}

export default LogInPage