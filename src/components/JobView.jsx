import React, { useEffect } from 'react'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom';
import { asyncfetchSingleInternship } from '../store/Actions/internshipActions';
import { asyncfetchSingleJob } from '../store/Actions/jobActions';
import { asyncapplyInternship, asyncapplyJob } from '../store/Actions/userActions';



const JobView = () => {
    const dispatch = useDispatch();
    const params = useParams();
    const { id } = params;
    const [jobData, setjobData] = useState(null)
    const [userData, setuserData] = useState(null)
    const counter = useSelector(state => state.job)
    const usercounter = useSelector(state => state.user)

    const [applicationstatus, setapplicationstatus] = useState(undefined)

    const applyJob = (e) => {
        e.preventDefault();
        dispatch(asyncapplyJob(id));
    }
    
    useEffect(() => {
        dispatch(asyncfetchSingleJob(id))
    }, [dispatch, id]);
    
    useEffect(() => {
        setjobData(counter.singlejob);
        setuserData(usercounter.user)
    }, [counter, usercounter]);

    useEffect(() => {
        if (jobData && userData && userData.jobs) {
            const isUserApplied = userData.jobs.includes(jobData._id);
            console.log("User applied:", isUserApplied);
            setapplicationstatus(isUserApplied)
        }
    }, [jobData, userData]);

    console.log(id);
    console.log(userData)
    console.log(jobData)
    
  return (
    <div className='internship-div-master h-screen w-screen'>
        <div className='flex flex-col text-3xl font-semibold items-center mt-10 h-screen w-screen'>
        {jobData !== null ? (
            <>
            <h1>{jobData.profile} ({jobData.jobtype})</h1>
            <div className='flex flex-col h-5/6 w-3/5 mt-10 text-base border-2 p-5 rounded-md'>
                <div className='flex w-full justify-between'>
                <div className='flex flex-col'>
                <h1 className='text-lg'>{jobData.profile}</h1>
                <h1>{jobData.employe?.organization}</h1>
                </div>
                <img className='h-16' src={jobData.employe.logo} alt="" />
                </div>
                <h1 className='mt-3'>{jobData.jobtype}</h1>
                <div className='flex w-1/2 justify-between mt-3 text-sm'>
                    <div className='flex flex-col'>
                        <h1>Duration</h1>
                    <h1 className='text-base'>{jobData.duration}</h1>
                    </div>
                    <div className='flex flex-col'>
                        <h1>CTC (Annual)</h1>
                    <h1 className='text-base'>INR {jobData.salary} {jobData.stipend?.according.status}</h1>
                    </div>
                    <div className='flex flex-col'>
                        <h1>Apply by</h1>
                        <h1 className='text-base'>{jobData.to}</h1>
                    </div>
                </div>
                <h1 className='mt-3'>{jobData.students.length} applicants</h1>
                <hr />
                <h1 className='text-lg mt-3'>About the internship</h1>
                <div>
                <h1>Selected intern's day-to-day responsibilities include:</h1>
                <h1 className='mt-10'>{jobData.description}</h1>
                </div>
                <div className='mt-5'>
                    <h1 className='text-xl font-semibold'>Skills required</h1>
                    <h1>{jobData.skill}</h1>
                </div>
                <div className='mt-5'>
                    <h1 className='text-xl font-semibold'>Perks</h1>
                    <h1>{jobData.perks}</h1>
                </div>
                <div className='mt-5'>
                    <h1 className='text-xl font-semibold'>Number of openings</h1>
                    <h1>{jobData.openings}</h1>
                </div>
                <hr />
                <form onSubmit={applyJob} className='self-center' action="" method="post">
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
            <h1>Loading</h1>
        )}
        </div>
    </div>
  )
}

export default JobView