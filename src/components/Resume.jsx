import React, { useEffect, useState } from 'react'
import { Route } from 'react-router-dom'
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { asynccurrentUser, asyncDeleteEducation, asyncaddedu } from '../store/Actions/userActions'
import EducationForm from './educationForm';
import Education from './Education';
import WorkExperience from './WorkExperience';
import Responsibility from './Responsibility';
import Courses from './Courses';
import Projects from './Projects';
import Skill from './Skill';
import Accomplishments from './Accomplishments';



const Resume = () => {
    const [userData, setuserData] = useState([])

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalContent, setModalContent] = useState(null);

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
        if(!isAuth) {
            navigate("/signin")
        }
    }, [isAuth]);

  return (
    <div className='flex flex-col center justify-center items-center gap-5 w-screen'>
        {/* Modal/Card */}
        
        <h1 className=''>Back</h1>
        <h1 className='text-3xl font-bold text-center mt-5'>Resume</h1>
        <div className='border w-3/5'>
            <div className='p-10'>
                <h1 className='text-3xl font-bold'>
                {user && user.firstname} {user && user.lastname}
                </h1>
                <h1>
                    {user && user.email}
                </h1>
                <h1>
                    {user && user.contact}
                </h1>
                <h1>
                    {user && user.city}
                </h1>
            </div>
            <hr />
            <Education/>
            <hr />
            <WorkExperience/>
            <hr />
            <Responsibility/>
            <hr />
            <Courses/>
            <hr />
            <Projects/>
            <hr />
            <Skill/>
            <Accomplishments/>
    
        
  
      </div>

    </div>
  )
}

export default Resume