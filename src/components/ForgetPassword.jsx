import React, { useEffect } from 'react'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { asyncforgetPassword } from '../store/Actions/userActions'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



const ForgetPassword = () => {
    const [email, setemail] = useState("")
    const dispatch = useDispatch()
    const navigate = useNavigate();
    const submitHandler = (e) => {
        e.preventDefault()
        const submit = {
            email: email
        }
        dispatch(asyncforgetPassword(submit))
        toast.success("Please check your mail!");
        navigate('/')
        
    }
    
  return (
    <div>
        <form onSubmit={submitHandler} action="" method="post">
            <label htmlFor="">Enter mail</label>
            <input required value={email} onChange={(e) => setemail(e.target.value)} type="email" />
            <button>Send</button>
        </form>
    </div>
  )
}

export default ForgetPassword