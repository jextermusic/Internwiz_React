import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { asynccurrentUser, asyncaddresp, asynceditresp } from '../store/Actions/userActions'



const ResponsibilityForm = ({ respToEdit, closeModal }) => {
    const [description, setdescription] = useState("");
    const [userData, setuserData] = useState([]);

    const [isModalOpen, setIsModalOpen] = useState(true);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
      // Prefill form fields if editing an existing entry
      if (respToEdit) {
        setdescription(respToEdit.college || "");
      }
    }, [respToEdit]);

    const resumeSubmit = (e) => {
        e.preventDefault()
        const newresume = {
            description: description
        };
        // dispatch(asyncaddresp(newresume));
        // console.log("here is new",newresume)

        try {
          if (respToEdit) {
            closeModal();
           dispatch(asynceditresp(respToEdit.id, newresume))
            // Editing an existing entry
            // Dispatch an action to update the entry
            // For example: dispatch(asyncEditResp(respToEdit.id, newResume));
          } else {
            // Adding a new entry
            closeModal();
             dispatch(asyncaddresp(newresume));
          }

          // Navigate to another page or close the form after submission
          navigate("/resume");
        } catch (error) {
          console.error("Error submitting resp form:", error);
        }



    };
  return (
    <>
    {isModalOpen && (
        <div className='h-full w-11/12 font-semibold text-zinc-800'>
        <form className='flex flex-col justify-around h-full' onSubmit={resumeSubmit} action="" method="post">
        <div className='flex flex-col'>
          <label htmlFor="">Description</label>
          <textarea value={description} onChange={(e) => setdescription(e.target.value)} className='resize-none p-2 border border-gray-300 rounded focus:outline-sky-400 h-36' maxLength="250"
          placeholder='e.g. Led a team of 5 volunteers to plan and conduct activities for literary event in college fest' name="" id="" cols="30" rows="10"></textarea>
          </div>
          <button className='bg-cyan-500 w-24 h-10 rounded self-end text-white font-bold'>Save</button>
      </form>
    </div>
     )}
    </>
  )
}

export default ResponsibilityForm