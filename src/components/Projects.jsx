import React, { useEffect, useState } from 'react'
import { Route } from 'react-router-dom'
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { asynccurrentUser, asyncdeleteproj, asyncaddproj } from '../store/Actions/userActions'
import ProjectsForm from './ProjectsForm';
import { RiPencilLine, RiDeleteBinLine } from "@remixicon/react";

const Projects = () => {
    const [userData, setuserData] = useState([])

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalContent, setModalContent] = useState(null);

    const [isActive, setIsActive] = useState(false);

    const [isEditing, setIsEditing] = useState(false);
    const [projToEdit, setProjToEdit] = useState(null);

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

    const handleAddProj = () => {
      setIsActive(true);
      openModal(<ProjectsForm  closeModal={closeModal} />);
    };

    const ProjItem = ({ proj }) => {
        const dispatch = useDispatch();
    }

    const handleDelete = (id) => {
      const confirmDelete = window.confirm("Are you sure you want to delete this entry?");
      if (confirmDelete) {
          dispatch(asyncdeleteproj(id));
          console.log(id);
      }
      };

      const handleEditProj = (proj) => {
        setProjToEdit(proj);
        setIsEditing(true);
      };
    

      const handleCancelEdit = () => {
        setIsEditing(false);
        setProjToEdit(null);
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
                   <h1 className='text-2xl font-semibold'>Project details</h1>
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
            <h1 className='text-2xl font-semibold'>Edit Training</h1>
          <ProjectsForm closeModal={closeModal} projToEdit={projToEdit}  onCancelEdit={handleCancelEdit} />
        </div>
        </div>
      )}
    <div className='p-10 flex flex-row'>
    <div className='w-1/3'>
    <h1 className='font-semibold'>
        Projects
    </h1>
    </div>
  {/* Check if user object and resume property are not null before accessing proj array */}
  <div className='w-full font-semibold'>
  { user && user.resume && user.resume.projects && user.resume.projects.map((projItem) => (
    <div className='flex flex-row w-5/6 justify-between' key={projItem.id}>
    <div>
    <p>Title: {projItem.title}</p>
    <p>Description: {projItem.description}</p>
    <p>Start/End: {projItem.startdate} - {projItem.enddate}</p>
    <p>Link: {projItem.link}</p>
    </div>
    <div className='flex gap-2'>
    <RiPencilLine className='cursor-pointer' onClick={() => handleEditProj(projItem)}/>
    <RiDeleteBinLine className='cursor-pointer' onClick={(id) => handleDelete(projItem.id)}/>
    </div>
  </div>
  ))}
   <button className='text-blue-500' onClick={handleAddProj}>Add project</button>
  </div>
  </div>
    </>
   )
  }

export default Projects