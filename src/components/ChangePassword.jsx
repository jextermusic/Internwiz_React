import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { asyncupdatePassword, asyncupdatePasswordEmploye } from '../store/Actions/userActions'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom'



const ChangePassword = () => {
    const [newpass, setnewpass] = useState("");
    const [newpassconfirm, setnewpassconfirm] = useState("")

    const { isAuth, user } = useSelector((state) => state.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const submitHandler = (e) => {
        e.preventDefault();
        const id = user._id;
        if(newpass == newpassconfirm && user.role == "student"){
            const dets = {
                password: newpass
            }
            dispatch(asyncupdatePassword(id, dets));
            console.log("student pass change hogya")
            // navigate('/')
            toast.success("Password changed successfully!!");
        }
        else if(newpass == newpassconfirm && user.role == "employee"){
            const dets = {
                password: newpass
            }
            dispatch(asyncupdatePasswordEmploye(id, dets));
            console.log("employe pass change hogya")
            // navigate('/')
            toast.success("Password changed successfully!!");
        }
        else{
            toast.error("Password does not match!");
            console.log("password does not match");
        }
    };

    useEffect(() => {
        if(!isAuth && user) {
            navigate("/")
        }
    }, [isAuth, user])
    

  return (
    
    <div className='password-main mt-10 flex flex-col items-center font-bold text-stone-700'>
        <ToastContainer />
        <div className='text-2xl'>
        <h1>Change Password</h1>
        </div>
        <div className='border-2 w-1/4 mt-10 p-5'>
            <form onSubmit={submitHandler} className='h-max' action="" method="post">
                <div className='flex flex-col h-80 justify-around'>
                    <div className='flex flex-col'>
                <label htmlFor="">New password</label>
                <input value={newpass} onChange={(e) => setnewpass(e.target.value)} className='h-12 rounded border border-zinc-300 focus:outline-sky-400' type="password" />
                    </div>
                    <div className='flex flex-col'>
                <label htmlFor="">Retype password</label>
                <input onChange={(e) => setnewpassconfirm(e.target.value)} value={newpassconfirm} className='h-12 rounded border border-zinc-300 focus:outline-sky-400' type="password" />
                    </div>
                <button className='w-64 h-12 bg-cyan-500 self-center rounded text-white'>Update</button>
                </div>
            </form>
        </div>
    </div>
  )
}

export default ChangePassword