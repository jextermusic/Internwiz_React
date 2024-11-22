import React, { useEffect, useState } from 'react'
import { Route } from 'react-router-dom'
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { asynccurrentUser, asyncdeletejob, asyncaddjob } from '../store/Actions/userActions'
import WorkForm from './WorkForm';
import { RiPencilLine, RiDeleteBinLine } from "@remixicon/react";

const WorkExperience = () => {
    const [userData, setuserData] = useState([])

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalContent, setModalContent] = useState(null);

    const [isActive, setIsActive] = useState(false);

    const [isEditing, setIsEditing] = useState(false);
    const [workToEdit, setWorkToEdit] = useState(null);

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

    const handleAddWork = () => {
      setIsActive(true);
      openModal(<WorkForm  closeModal={closeModal} />);
    };

    const WorkItem = ({ work }) => {
        const dispatch = useDispatch();
    }

    const handleDelete = (id) => {
      const confirmDelete = window.confirm("Are you sure you want to delete this entry?");
      if (confirmDelete) {
          dispatch(asyncdeletejob(id));
          console.log(id);
      }
      };

      const handleEditWork = (work) => {
        setWorkToEdit(work);
        setIsEditing(true);
      };
    

      const handleCancelEdit = () => {
        setIsEditing(false);
        setWorkToEdit(null);
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
              <div className="min-h-screen w-5/12 modal fixed top-10 ml-32 z-50">
                <div className="bg-white h-full modal-content flex flex-col items-center gap-3 rounded-md">
                     <span className="close self-end m-5 text-3xl cursor-pointer" onClick={closeModal}>&times;</span>
                   <h1 className='text-2xl font-semibold'>Add Job</h1>
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
            <h1 className='text-2xl font-semibold'>Edit Job</h1>
          <WorkForm closeModal={closeModal} workToEdit={workToEdit}  onCancelEdit={handleCancelEdit} />
        </div>
        </div>
      )}
    <div className='p-10 flex flex-row'>
    <div className='w-1/3'>
    <h1 className='font-semibold'>
        Job
    </h1>
    </div>
  {/* Check if user object and resume property are not null before accessing work array */}
  <div className='w-full font-semibold'>
  { user && user.resume && user.resume.jobs && user.resume.jobs.map((workItem) => (
    <div className='flex flex-row w-5/6 justify-between' key={workItem.id}>
    <div>
    <p>Designation: {workItem.designation}</p>
    <h2>Profile: {workItem.profile}</h2>
    <p>Start Organization: {workItem.organization}</p>
    <p>End Location: {workItem.location}</p>
    <p>Start/End: {workItem.startdate} - {workItem.enddate}</p>
    <p>Description: {workItem.description}</p>
    </div>
    <div className='flex gap-2'>
    <RiPencilLine className='cursor-pointer' onClick={() => handleEditWork(workItem)}/>
    <RiDeleteBinLine className='cursor-pointer' onClick={(id) => handleDelete(workItem.id)}/>
    </div>
  </div>
  ))}
   <button className='text-blue-500' onClick={handleAddWork}>Add Job</button>
  </div>
  </div>
    </>
   )
  }

export default WorkExperience