import React, { useEffect, useState } from 'react'
import { Route } from 'react-router-dom'
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { asynccurrentUser, asyncdeleteresp, asyncaddresp, } from '../store/Actions/userActions'
import ResponsibilityForm from './ResponsibilityForm';
import { RiPencilLine, RiDeleteBinLine } from "@remixicon/react";

const Responsibility = () => {
    const [userData, setuserData] = useState([])

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalContent, setModalContent] = useState(null);

    const [isActive, setIsActive] = useState(false);

    const [isEditing, setIsEditing] = useState(false);
    const [responsibilityToEdit, setResponsibilityToEdit] = useState(null);

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

    const handleAddResponsibility = () => {
      setIsActive(true);
      openModal(<ResponsibilityForm  closeModal={closeModal} />);
    };

    const ResponsibilityItem = ({ responsibility }) => {
        const dispatch = useDispatch();
    }

    const handleDelete = (id) => {
      const confirmDelete = window.confirm("Are you sure you want to delete this entry?");
      if (confirmDelete) {
          dispatch(asyncdeleteresp(id));
          console.log(id);
      }
      };

      const handleEditResponsibility = (responsibility) => {
        setResponsibilityToEdit(responsibility);
        setIsEditing(true);
      };
    

      const handleCancelEdit = () => {
        setIsEditing(false);
        setResponsibilityToEdit(null);
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
                   <h1 className='text-2xl font-semibold'>Position of responsibility</h1>
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
            <h1 className='text-2xl font-semibold'>Edit Responsibility</h1>
          <ResponsibilityForm closeModal={closeModal} responsibilityToEdit={responsibilityToEdit}  onCancelEdit={handleCancelEdit} />
        </div>
        </div>
      )}
    <div className='p-10 flex flex-row'>
    <div className='w-1/3'>
    <h1 className='font-semibold'>
       Position of Responsibility
    </h1>
    </div>
  {/* Check if user object and resume property are not null before accessing responsibility array */}
  <div className='w-full font-semibold'>
  { user && user.resume && user.resume.responsibilities && user.resume.responsibilities.map((respItem) => (
    <div className='flex flex-row w-5/6 justify-between' key={respItem.id}>
    <div>
    <p>{respItem.description}</p>
    </div>
    <div className='flex gap-2'>
    <RiPencilLine className='cursor-pointer' onClick={() => handleEditResponsibility(respItem)}/>
    <RiDeleteBinLine className='cursor-pointer' onClick={(id) => handleDelete(respItem.id)}/>
    </div>
  </div>
  ))}
   <button className='text-blue-500' onClick={handleAddResponsibility}>Add Responsibility</button>
  </div>
  </div>
    </>
   )
  }

export default Responsibility