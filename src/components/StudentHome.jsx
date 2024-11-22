import React, { useEffect } from 'react'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { asynccurrentUser } from "../store/Actions/userActions";



const StudentHome = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(asynccurrentUser());
    }, [])
    


  return (
    <div>StudentHome</div>
  )
}

export default StudentHome