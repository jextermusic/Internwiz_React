import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { asynccurrentUser, asyncaddjob, asynceditjob } from '../store/Actions/userActions'



const JobForm = ({ workToEdit, closeModal }) => {
    const [college, setcollege] = useState("");
    const [startyear, setstartyear] = useState("");
    const [endyear, setendyear] = useState("");
    const [degree, setdegree] = useState("");
    const [stream, setstream] = useState("");
    const [performancescale, setperformancescale] = useState("");
    const [performance, setperformance] = useState("");
    const [userData, setuserData] = useState([]);

    const [isModalOpen, setIsModalOpen] = useState(true);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
      // Prefill form fields if editing an existing entry
      if (workToEdit) {
        setcollege(workToEdit.college || "");
        setstartyear(workToEdit.startyear || "");
        setendyear(workToEdit.endyear || "");
        setdegree(workToEdit.degree || "");
        setstream(workToEdit.stream || "");
        setperformancescale(workToEdit.performancescale || "");
        setperformance(workToEdit.performance || "");
      }
    }, [workToEdit]);

    const resumeSubmit = (e) => {
        e.preventDefault()
        const newresume = {
            college: college,
            startyear: startyear,
            endyear: endyear,
            degree: degree,
            stream: stream,
            performancescale: performancescale,
            performance: performance,
        };
        // dispatch(asyncaddjob(newresume));
        // console.log("here is new",newresume)

        try {
          if (workToEdit) {
            closeModal();
           dispatch(asynceditjob(workToEdit.id, newresume))
            // Editing an existing entry
            // Dispatch an action to update the entry
            // For example: dispatch(asyncEditEducation(workToEdit.id, newResume));
          } else {
            // Adding a new entry
            closeModal();
             dispatch(asyncaddjob(newresume));
          }

          // Navigate to another page or close the form after submission
          navigate("/resume");
        } catch (error) {
          console.error("Error submitting work form:", error);
        }



    };
  return (
    <>
    {isModalOpen && (
        <div className='h-full w-11/12 font-semibold text-zinc-800'>
        <form className='flex flex-col justify-around h-full' onSubmit={resumeSubmit} action="" method="post">
          <div className='flex flex-col'>
          <label htmlFor="">Designation</label>
        <input required className='h-10 p-2 border border-gray-300 rounded focus:outline-sky-400' value={college} onChange={(e) => setcollege(e.target.value)} placeholder="college" type="text" />
          </div>
          <div className='flex justify-between'>
            <div className='flex flex-col w-[45%]'>
              <label htmlFor="">Start Year</label>
        <input required className='w-[100%] h-10 p-2 border border-gray-300 rounded focus:outline-sky-400' value={startyear} onChange={(e) => setstartyear(e.target.value)} placeholder="Choose year" type="month" />
            </div>
            <div className='flex flex-col w-[45%] '>
              <label htmlFor="">End Year</label>
        <input required className='w-[100%] h-10 p-2 border border-gray-300 rounded focus:outline-sky-400' value={endyear} onChange={(e) => setendyear(e.target.value)} placeholder="Choose year" type="month" />
            </div>
          </div>
          <div className='flex justify-between'>
            <div className='flex flex-col w-[45%]'>
              <label htmlFor="">Degree</label>
        <input required className='w-[100%] h-10 p-2 border border-gray-300 rounded focus:outline-sky-400' value={degree} onChange={(e) => setdegree(e.target.value)} placeholder="e.g. B.Sc (Hons.)" type="text" />
            </div>
            <div className='flex flex-col w-[45%]'>
              <label htmlFor="">Stream (Optional)</label>
        <input className='w-[100%] h-10 p-2 border rounded border-gray-300 focus:outline-sky-400' value={stream} onChange={(e) => setstream(e.target.value)} placeholder="e.g. Economics" type="text" />
            </div>
          </div>
          <div className='flex justify-between'>
            <div className='flex flex-col w-[45%]'>
              <label htmlFor="">Performance Scale (Optional)</label>
        <input className='w-[100%] h-10 p-2 border border-gray-300 rounded focus:outline-sky-400' value={performancescale} onChange={(e) => setperformancescale(e.target.value)} placeholder="Percentage" type="text" />
            </div>
            <div className='flex flex-col w-[45%]'>
              <label htmlFor="">Performance (Optional)</label>
        <input className='w-[100%] h-10 p-2 border border-gray-300 rounded focus:outline-sky-400' value={performance} onChange={(e) => setperformance(e.target.value)} placeholder="0.00" type="text" />
            </div>
          </div>
        <button className='bg-cyan-500 w-24 h-10 rounded self-end text-white font-bold'>Save</button>
      </form>
    </div>
     )}
    </>
  )
}

export default JobForm