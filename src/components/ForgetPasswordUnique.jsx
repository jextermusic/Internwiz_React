import React, { useState } from 'react';
import { useNavigate, useParams,  } from 'react-router-dom';
import axios from '../config/axios';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { asyncforgetPasswordUnique } from '../store/Actions/userActions';


const ForgetPasswordUnique = () => {
    const { id } = useParams();
    
    const [password, setPassword] = useState(null);
    const [confirmPassword, setConfirmPassword] = useState(null);
    const [status, setStatus] = useState(null)
    const [error, setError] = useState('')

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            setError('Passwords do not match');
            return;
        }
        console.log(password)

        const setpass = {
            password: password
        }

        const some = id

        try {
            dispatch(asyncforgetPasswordUnique(setpass, some))
            
            console.log(response.data.message)
        } catch (error) {
            console.log(error)
        }
    };
    console.log(password)

    useEffect(() => {
        (async () => {
            try {
                const resp = await axios.post(`/student/forget-link/tokencheck/${id}`)
                console.log(resp.data.message)
                setStatus(resp.data.message)
              } catch (error) {
                console.log(error.response.data)
              }
        })()
    }, [])
    
  return (
            <div>
                {status === true ? (<>
                    <h2>Reset Password</h2>
            <form onSubmit={handleSubmit} method="post">
                
                <div>
                    <label htmlFor="password">New Password:</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="confirmPassword">Confirm Password:</label>
                    <input
                        type="password"
                        id="confirmPassword"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                    />
                </div>
                
                <button type="submit">Reset Password</button>
            </form>
                </>)
                : (<>
                <h1>Invalid Link</h1>
                </>)}
            
        </div>
  )
}

export default ForgetPasswordUnique