import React from 'react'
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { asynccurrentEmploye } from "../store/Actions/userActions";


const EmployeHome = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(asynccurrentEmploye());
    }, [])
  return (
    <div>
        employeHoem
    </div>
  )
}

export default EmployeHome