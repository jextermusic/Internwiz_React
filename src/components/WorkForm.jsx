import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { asynccurrentUser, asyncaddjob, asynceditjob } from '../store/Actions/userActions'



const WorkForm = ({ workToEdit, closeModal }) => {
    const [designation, setdesignation] = useState("");
    const [profile, setprofile] = useState("");
    const [organization, setorganization] = useState("");
    const [location, setlocation] = useState("");
    const [startdate, setstartdate] = useState("");
    const [enddate, setenddate] = useState("");
    const [description, setdescription] = useState("");
    const [userData, setuserData] = useState([]);

    const [isModalOpen, setIsModalOpen] = useState(true);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
      // Prefill form fields if editing an existing entry
      if (workToEdit) {
        setdesignation(workToEdit.designation || "");
        setprofile(workToEdit.profile || "");
        setorganization(workToEdit.organization || "");
        setlocation(workToEdit.location || "");
        setstartdate(workToEdit.startdate || "");
        setenddate(workToEdit.enddate || "");
        setdescription(workToEdit.description || "");
      }
    }, [workToEdit]);

    const resumeSubmit = (e) => {
        e.preventDefault()
        const newresume = {
            designation: designation,
            profile: profile,
            organization: organization,
            location: location,
            startdate: startdate,
            enddate: enddate,
            description: description,
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
        <input required className='h-10 p-2 border border-gray-300 rounded focus:outline-sky-400' value={designation} onChange={(e) => setdesignation(e.target.value)} placeholder="e.g. Software Engineer" type="text" />
          </div>
          <div className='flex flex-col'>
          <label htmlFor="">Profile</label>
        <input required className='h-10 p-2 border border-gray-300 rounded focus:outline-sky-400' value={profile} onChange={(e) => setprofile(e.target.value)} placeholder="e.g. Operations" type="text" />
          </div>
          <div className='flex flex-col'>
          <label htmlFor="">Organization</label>
        <input required className='h-10 p-2 border border-gray-300 rounded focus:outline-sky-400' value={organization} onChange={(e) => setorganization(e.target.value)} placeholder="e.g. Sheryians" type="text" />
          </div>
          <div className='flex flex-col'>
          <label htmlFor="">Location</label>
        <input required className='h-10 p-2 border border-gray-300 rounded focus:outline-sky-400' value={location} onChange={(e) => setlocation(e.target.value)} placeholder="e.g. Bhopal" type="text" />
          </div>
          <div className='flex justify-between'>
            <div className='flex flex-col w-[45%]'>
              <label htmlFor="">Start Date</label>
        <input required className='w-[100%] h-10 p-2 border border-gray-300 rounded focus:outline-sky-400' value={startdate} onChange={(e) => setstartdate(e.target.value)} placeholder="Choose year" type="date" />
            </div>
            <div className='flex flex-col w-[45%] '>
              <label htmlFor="">End Date</label>
        <input required className='w-[100%] h-10 p-2 border border-gray-300 rounded focus:outline-sky-400' value={enddate} onChange={(e) => setenddate(e.target.value)} placeholder="Choose year" type="date" />
            </div>
          </div>
          <div className='flex flex-col'>
          <label htmlFor="">Description</label>
          <textarea value={description} onChange={(e) => setdescription(e.target.value)} className='resize-none p-2 border border-gray-300 rounded focus:outline-sky-400 h-36' maxlength="250"
          placeholder='Short description of work done (max 250 char)' name="" id="" cols="30" rows="10"></textarea>
          </div>
          
          <div className='p-5 self-end'>
        <button className='bg-cyan-500 w-24 h-10 rounded  text-white font-bold'>Save</button>
          </div>
      </form>
    </div>
     )}
    </>
  )
}

export default WorkForm