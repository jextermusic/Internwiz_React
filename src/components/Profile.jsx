import React, { useEffect, useState } from "react";
import {useSelector, useDispatch} from 'react-redux'
import InternshipApplication from "./InternshipApplication";
import InternshipList from "./InternshipList";
import JobList from "./JobList";
const Profile = () => {
    const dispatch = useDispatch();
    const [userData, setuserData] = useState([])
    const counter = useSelector(state => state.user)
    useEffect(() => {
        setuserData(counter.user);
      }, [])
    console.log(typeof(userData))
    return <div className="min-h-screen flex flex-col">
        {userData ? (
            <div className="flex flex-col items-center mt-10 text-2xl font-semibold min-h-screen">
            {userData.role == "student" ? (<>
                <h1>Welcome, {userData.firstname} </h1>
            <h1 className="mt-3">Let's help you land your dream career</h1>
            <InternshipList/>
            <JobList/>
            <div className="h-screen">

            </div>
            </>) : (
                <>
                <InternshipApplication/>
                </>
            )}
             
             
        </div>
         ) :  (
             <h1>Loading...</h1>
         )}
        </div>;
};

export default Profile;
