import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { asynccurrentUser, asyncaddcours, asynceditcours } from '../store/Actions/userActions'



const CoursesForm = ({ coursesToEdit, closeModal }) => {
    const [trainingprogram, settrainingprogram] = useState("");
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
      if (coursesToEdit) {
        settrainingprogram(coursesToEdit.trainingprogram || "");
        setorganization(coursesToEdit.organization || "");
        setlocation(coursesToEdit.location || "");
        setstartdate(coursesToEdit.startdate || "");
        setenddate(coursesToEdit.enddate || "");
        setdescription(coursesToEdit.description || "");
      }
    }, [coursesToEdit]);

    const resumeSubmit = (e) => {
        e.preventDefault()
        const newresume = {
            trainingprogram: trainingprogram,
            organization: organization,
            location: location,
            startdate: startdate,
            enddate: enddate,
            description: description,
        };
        // dispatch(asyncaddcours(newresume));
        // console.log("here is new",newresume)

        try {
          if (coursesToEdit) {
            closeModal();
           dispatch(asynceditcours(coursesToEdit.id, newresume))
            // Editing an existing entry
            // Dispatch an action to update the entry
            // For example: dispatch(asyncEditEducation(coursesToEdit.id, newResume));
          } else {
            // Adding a new entry
            closeModal();
             dispatch(asyncaddcours(newresume));
          }

          // Navigate to another page or close the form after submission
          navigate("/resume");
        } catch (error) {
          console.error("Error submitting courses form:", error);
        }



    };
  return (
    <>
    {isModalOpen && (
        <div className='h-full w-11/12 font-semibold text-zinc-800'>
        <form className='flex flex-col justify-around h-full' onSubmit={resumeSubmit} action="" method="post">
          <div className='flex flex-col'>
          <label htmlFor="">Designation</label>
        <input required className='h-10 p-2 border border-gray-300 rounded focus:outline-sky-400' value={trainingprogram} onChange={(e) => settrainingprogram(e.target.value)} placeholder="e.g. Analytics" type="text" />
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
        <input required className='w-[100%] h-10 p-2 border border-gray-300 rounded focus:outline-sky-400' value={startdate} onChange={(e) => setstartdate(e.target.value)} placeholder="Choose date" type="date" />
            </div>
            <div className='flex flex-col w-[45%] '>
              <label htmlFor="">End Date</label>
        <input required className='w-[100%] h-10 p-2 border border-gray-300 rounded focus:outline-sky-400' value={enddate} onChange={(e) => setenddate(e.target.value)} placeholder="Choose date" type="date" />
            </div>
          </div>
          <div className='flex flex-col'>
          <label htmlFor="">Description</label>
          <textarea value={description} onChange={(e) => setdescription(e.target.value)} className='resize-none p-2 border border-gray-300 rounded focus:outline-sky-400 h-36' maxlength="700"
          placeholder='Short description about training (max 700 char)' name="" id="" cols="30" rows="10"></textarea>
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

export default CoursesForm