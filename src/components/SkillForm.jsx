import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { asynccurrentUser, asyncaddskil, asynceditskil } from '../store/Actions/userActions'



const SkillForm = ({ skilToEdit, closeModal }) => {
    const [skill, setskill] = useState("");
    const [userData, setuserData] = useState([]);

    const [isModalOpen, setIsModalOpen] = useState(true);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
      // Prefill form fields if editing an existing entry
      if (skilToEdit) {
        setskill(skilToEdit.college || "");
      }
    }, [skilToEdit]);

    const resumeSubmit = (e) => {
        e.preventDefault()
        const newresume = {
            skill: skill
        };
        // dispatch(asyncaddskil(newresume));
        // console.log("here is new",newresume)

        try {
          if (skilToEdit) {
            closeModal();
           dispatch(asynceditskil(skilToEdit.id, newresume))
            // Editing an existing entry
            // Dispatch an action to update the entry
            // For example: dispatch(asyncEditResp(skilToEdit.id, newResume));
          } else {
            // Adding a new entry
            closeModal();
             dispatch(asyncaddskil(newresume));
          }

          // Navigate to another page or close the form after submission
          navigate("/resume");
        } catch (error) {
          console.error("Error submitting skil form:", error);
        }



    };
  return (
    <>
    {isModalOpen && (
        <div className='h-full w-11/12 font-semibold text-zinc-800'>
        <form className='flex flex-col justify-around h-full' onSubmit={resumeSubmit} action="" method="post">
        <div className='flex flex-col'>
          <label htmlFor="">Add skills</label>
          <input required className='w-[100%] h-10 p-2 border border-gray-300 rounded focus:outline-sky-400' value={skill} onChange={(e) => setskill(e.target.value)} type="text" />
          </div>
          <button className='bg-cyan-500 w-24 h-10 rounded self-end text-white font-bold'>Save</button>
      </form>
    </div>
     )}
    </>
  )
}

export default SkillForm