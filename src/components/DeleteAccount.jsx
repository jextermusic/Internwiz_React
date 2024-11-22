import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { asyncdeleteUser } from '../store/Actions/userActions';




const DeleteAccount = () => {
    const { isAuth, user } = useSelector((state) => state.user);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        isAuth && navigate("/delete");
    }, [isAuth]);

    const deleteHandler = () => {
        if(user && user._id && user.role){
            dispatch(asyncdeleteUser(user,user._id))
            console.log("done")
            navigate("/")
            
        }
        else{
            console.log("user not found")
        }
    }
  return (
    <div className='w-full h-full flex flex-col justify-center items-center'>
    <div className='bg-neutral-100 flex flex-col h-1/6 border-zinc-400 shadow-lg  p-5 justify-center items-center'>
        <h1>Are you sure want to delete your account?</h1>
        <button className='bg-sky-400 text-white w-1/3 h-1/3 rounded' onClick={deleteHandler}>Delete</button>
    </div>
    </div>
  )
}

export default DeleteAccount