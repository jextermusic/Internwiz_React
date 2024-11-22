import React, { useEffect, useState } from 'react'
import { Route } from 'react-router-dom'
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { asynccurrentUser, asyncDeleteEducation, asyncaddedu } from '../store/Actions/userActions'
import EducationForm from './educationForm';
import { RiPencilLine, RiDeleteBinLine } from "@remixicon/react";

const Education = () => {
    const [userData, setuserData] = useState([])

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalContent, setModalContent] = useState(null);

    const [isActive, setIsActive] = useState(false);

    const [isEditing, setIsEditing] = useState(false);
    const [educationToEdit, setEducationToEdit] = useState(null);

    const { isAuth, user } = useSelector(state => state.user);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const openModal = (content) => {
        setIsModalOpen(true);
        setModalContent(content);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setIsEditing(false);
        setModalContent(null);
    };

    const handleAddEducation = () => {
      setIsActive(true);
      openModal(<EducationForm  closeModal={closeModal} />);
    };

    const EducationItem = ({ education }) => {
        const dispatch = useDispatch();
    }

    const handleDelete = (id) => {
      const confirmDelete = window.confirm("Are you sure you want to delete this entry?");
      if (confirmDelete) {
          dispatch(asyncDeleteEducation(id));
          console.log(id);
      }
      };

      const handleEditEducation = (education) => {
        setEducationToEdit(education);
        setIsEditing(true);
      };
    

      const handleCancelEdit = () => {
        setIsEditing(false);
        setEducationToEdit(null);
      };
    
    
    useEffect(() => {
        setuserData(user);
        if(!isAuth && user) {
            navigate("/signin")
        }
    }, [isAuth]);
  return (
  <>
      {isModalOpen && (
      <div className="absolute inset-0 bg-black opacity-50 z-10" onClick={closeModal}></div>
      )}
      {isModalOpen && (
              <div className="h-5/6 w-5/12 modal absolute top-10 ml-32 z-50">
                <div className="bg-white h-full modal-content flex flex-col items-center gap-5 rounded-md">
                     <span className="close self-end m-5 text-3xl cursor-pointer" onClick={closeModal}>&times;</span>
                   <h1 className='text-2xl font-semibold'>Add Education</h1>
                    {modalContent}
                </div>
            </div>
            )}
          {isEditing && (
          <div className="absolute inset-0 bg-black opacity-50 z-10" onClick={closeModal}></div>
          )}
            {isEditing && (
         <div className="h-5/6 w-5/12 modal absolute top-10 ml-32 z-50">
         <div className="bg-white h-full modal-content flex flex-col items-center gap-5 rounded-md">
              <span className="close self-end m-5 text-3xl cursor-pointer" onClick={closeModal}>&times;</span>
            <h1 className='text-2xl font-semibold'>Edit Education</h1>
          <EducationForm closeModal={closeModal} educationToEdit={educationToEdit}  onCancelEdit={handleCancelEdit} />
        </div>
        </div>
      )}
    <div className='p-10 flex flex-row'>
    <div className='w-1/3'>
    <h1 className='font-semibold'>
        Education
    </h1>
    </div>
  {/* Check if user object and resume property are not null before accessing education array */}
  <div className='w-full font-semibold'>
  { user && user.resume && user.resume.education && user.resume.education.map((eduItem) => (
    <div className='flex flex-row w-5/6 justify-between' key={eduItem.id}>
    <div>
    <p>Degree: {eduItem.degree}</p>
    <h2>College: {eduItem.college}</h2>
    <p>Start Year: {eduItem.startyear}</p>
    <p>End Year: {eduItem.endyear}</p>
    <p>Stream: {eduItem.stream}</p>
    <p>Grade: {eduItem.performance}/{eduItem.performancescale}</p>
    </div>
    <div className='flex gap-2'>
    <RiPencilLine className='cursor-pointer' onClick={() => handleEditEducation(eduItem)}/>
    <RiDeleteBinLine className='cursor-pointer' onClick={(id) => handleDelete(eduItem.id)}/>
    </div>
  </div>
  ))}
   <button className='text-blue-500' onClick={handleAddEducation}>Add Education</button>
  </div>
  </div>
    </>
   )
  }

export default Education