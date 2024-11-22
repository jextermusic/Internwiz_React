import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { asynccurrentUser, asyncaddacomp, asynceditacomp } from '../store/Actions/userActions'



const AccomplishmentsForm = ({ acompToEdit, closeModal }) => {
    const [description, setdescription] = useState("");
    const [userData, setuserData] = useState([]);

    const [isModalOpen, setIsModalOpen] = useState(true);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
      // Prefill form fields if editing an existing entry
      if (acompToEdit) {
        setdescription(acompToEdit.college || "");
      }
    }, [acompToEdit]);

    const resumeSubmit = (e) => {
        e.preventDefault()
        const newresume = {
            description: description
        };
        // dispatch(asyncaddacomp(newresume));
        // console.log("here is new",newresume)

        try {
          if (acompToEdit) {
            closeModal();
           dispatch(asynceditacomp(acompToEdit.id, newresume))
            // Editing an existing entry
            // Dispatch an action to update the entry
            // For example: dispatch(asyncEditResp(acompToEdit.id, newResume));
          } else {
            // Adding a new entry
            closeModal();
             dispatch(asyncaddacomp(newresume));
          }

          // Navigate to another page or close the form after submission
          navigate("/resume");
        } catch (error) {
          console.error("Error submitting acomp form:", error);
        }



    };
  return (
    <>
    {isModalOpen && (
        <div className='h-full w-11/12 font-semibold text-zinc-800'>
        <form className='flex flex-col justify-around h-full' onSubmit={resumeSubmit} action="" method="post">
        <div className='flex flex-col'>
          <label htmlFor="">Add your accomplishments such as rewards, recognitions, test scores, certifications, etc. here. You may also add information such as seminars/workshops you have attended or any interests/hobbies you have pursued.</label>
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

export default AccomplishmentsForm