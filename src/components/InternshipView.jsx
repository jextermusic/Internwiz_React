import React, { useEffect } from 'react'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom';
import { asyncfetchSingleInternship } from '../store/Actions/internshipActions';
import { asyncapplyInternship } from '../store/Actions/userActions';
import { lineWobble } from 'ldrs'
lineWobble.register()

// Default values shown




const InternshipView = () => {
    const dispatch = useDispatch();
    const params = useParams();
    const { id } = params;
    const [internshipData, setinternshipData] = useState(null)
    const [userData, setuserData] = useState(null)
    const counter = useSelector(state => state.internship)
    const usercounter = useSelector(state => state.user)

    const [applicationstatus, setapplicationstatus] = useState(undefined)

    const applyInternship = (e) => {
        e.preventDefault();
        dispatch(asyncapplyInternship(id));
    }
    
    useEffect(() => {
        dispatch(asyncfetchSingleInternship(id))
    }, [dispatch, id]);
    
    useEffect(() => {
        setinternshipData(counter.singleinternship);
        setuserData(usercounter.user)
    }, [counter, usercounter]);

    useEffect(() => {
        if (internshipData && userData && userData.internships) {
            const isUserApplied = userData.internships.includes(internshipData._id);
            console.log("User applied:", isUserApplied);
            setapplicationstatus(isUserApplied)
        }
    }, [internshipData, userData]);

    console.log(id);
    console.log(userData)
    console.log(internshipData)
    
  return (
    <div className='internship-div-master h-screen w-screen'>
        <div className='flex flex-col text-3xl font-semibold items-center mt-10 h-screen w-screen'>
        {internshipData !== null ? (
            <>
            <h1>{internshipData.profile} ({internshipData.internshiptype})</h1>
            <div className='flex flex-col h-5/6 w-3/5 mt-10 text-base border-2 p-5 rounded-md'>
                <div className='flex w-full justify-between'>
                <div className='flex flex-col'>
                <h1 className='text-lg'>{internshipData.profile}</h1>
                <h1>{internshipData.employe?.organization}</h1>
                </div>
                <img className='h-16' src={internshipData.employe.logo} alt="" />
                </div>
                <h1 className='mt-3'>{internshipData.internshiptype}</h1>
                <div className='flex w-1/2 justify-between mt-3 text-sm'>
                    <div className='flex flex-col'>
                        <h1>Duration</h1>
                    <h1 className='text-base'>{internshipData.duration}</h1>
                    </div>
                    <div className='flex flex-col'>
                        <h1>Stipend</h1>
                    <h1 className='text-base'>INR {internshipData.stipend?.amount} {internshipData.stipend?.according.status}</h1>
                    </div>
                    <div className='flex flex-col'>
                        <h1>Apply by</h1>
                        <h1 className='text-base'>{internshipData.to}</h1>
                    </div>
                </div>
                <h1 className='mt-3'>{internshipData.students.length} applicants</h1>
                <hr />
                <h1 className='text-lg mt-3'>About the internship</h1>
                <div>
                <h1>Selected intern's day-to-day responsibilities include:</h1>
                <h1 className='mt-10'>{internshipData.responsibility}</h1>
                </div>
                <div className='mt-5'>
                    <h1 className='text-xl font-semibold'>Skills required</h1>
                    <h1>{internshipData.skill}</h1>
                </div>
                <div className='mt-5'>
                    <h1 className='text-xl font-semibold'>Perks</h1>
                    <h1>{internshipData.perks}</h1>
                </div>
                <div className='mt-5'>
                    <h1 className='text-xl font-semibold'>Number of openings</h1>
                    <h1>{internshipData.openings}</h1>
                </div>
                <hr />
                <form onSubmit={applyInternship} className='self-center' action="" method="post">
                {applicationstatus === false ? (
                <>
                    <button className='mt-7 h-12 w-36 bg-cyan-500 text-white rounded-md'>Apply now</button>
                </>) : (<>
                    <h1>Applied</h1>
                </>)}
                
                </form>
            </div>
            </>
        ) : (
            // <h1>Loading</h1>
            <l-line-wobble
            size="80"
            stroke="5"
            bg-opacity="0.1"
            speed="1.75" 
            color="black" 
            ></l-line-wobble>
        )}
        </div>
    </div>
  )
}

export default InternshipView