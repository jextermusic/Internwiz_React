import React, { useEffect, useState } from 'react'
import { Route } from 'react-router-dom'
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { asynccurrentUser, asyncdeleteacomp, asyncaddacomp, } from '../store/Actions/userActions'
import AccomplishmentsForm from './AccomplishmentsForm';
import { RiPencilLine, RiDeleteBinLine } from "@remixicon/react";

const Accomplishments = () => {
    const [userData, setuserData] = useState([])

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalContent, setModalContent] = useState(null);

    const [isActive, setIsActive] = useState(false);

    const [isEditing, setIsEditing] = useState(false);
    const [accomplishmentToEdit, setAccomplishmentToEdit] = useState(null);

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

    const handleAddAccomplishment = () => {
      setIsActive(true);
      openModal(<AccomplishmentsForm  closeModal={closeModal} />);
    };

    const AccomplishmentItem = ({ accomplishment }) => {
        const dispatch = useDispatch();
    }

    const handleDelete = (id) => {
      const confirmDelete = window.confirm("Are you sure you want to delete this entry?");
      if (confirmDelete) {
          dispatch(asyncdeleteacomp(id));
          console.log(id);
      }
      };

      const handleEditAccomplishment = (accomplishment) => {
        setAccomplishmentToEdit(accomplishment);
        setIsEditing(true);
      };
    

      const handleCancelEdit = () => {
        setIsEditing(false);
        setAccomplishmentToEdit(null);
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
                   <h1 className='text-2xl font-semibold'>Additional details</h1>
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
            <h1 className='text-2xl font-semibold'>Edit Accomplishment</h1>
          <AccomplishmentsForm closeModal={closeModal} accomplishmentToEdit={accomplishmentToEdit}  onCancelEdit={handleCancelEdit} />
        </div>
        </div>
      )}
    <div className='p-10 flex flex-row'>
    <div className='w-1/3'>
    <h1 className='font-semibold'>
       Accomplishments
    </h1>
    </div>
  {/* Check if user object and resume property are not null before accessing accomplishment array */}
  <div className='w-full font-semibold'>
  { user && user.resume && user.resume.accomplishments && user.resume.accomplishments.map((acompItem) => (
    <div className='flex flex-row w-5/6 justify-between' key={acompItem.id}>
    <div>
    <p>{acompItem.description}</p>
    </div>
    <div className='flex gap-2'>
    <RiPencilLine className='cursor-pointer' onClick={() => handleEditAccomplishment(acompItem)}/>
    <RiDeleteBinLine className='cursor-pointer' onClick={(id) => handleDelete(acompItem.id)}/>
    </div>
  </div>
  ))}
   <button className='text-blue-500' onClick={handleAddAccomplishment}>Add Accomplishment</button>
  </div>
  </div>
    </>
   )
  }

export default Accomplishments