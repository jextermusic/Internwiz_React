import React, { useEffect } from 'react'
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { asynccloseInternship, asyncdeleteInternship, asyncgetInternships, asyncopenInternship } from '../store/Actions/internshipActions';


const InternshipApplication = () => {
    const dispatch = useDispatch();
    const [userData, setuserData] = useState(null)
    const [InternshipData, settInternshipData] = useState(null)
    const counter = useSelector(state => state.user)
    const internships = useSelector(state => state.internship.internship)
    console.log(InternshipData)

    const [dropdownIndex, setDropdownIndex] = useState(null);

const toggleDropdown = (index) => {
    if (dropdownIndex === index) {
        setDropdownIndex(null);
    } else {
        setDropdownIndex(index);
    }
};

    const closeInternship = (value) => (e) => {
        e.preventDefault();;
        dispatch(asynccloseInternship(value))
      }

      const openInternship = (value) => (e) => {
        e.preventDefault();
        dispatch(asyncopenInternship(value))
      }

      const deleteInternship = (value) => (e) => {
        e.preventDefault();
        dispatch(asyncdeleteInternship(value));
      }

    useEffect(() => {
        dispatch(asyncgetInternships());
      
    }, [])
    
    useEffect(() => {
        setuserData([counter.user]);
        settInternshipData(internships);
    }, [counter.user, internships]);
  return (
    <>
        {InternshipData !== null ? (
            <>
            <div className="flex flex-col h-full w-full items-center">
                <div className="flex text-base">
                    <h1>Internships</h1>
                    <h1>Fresher Jobs</h1>
                </div>
                <div className="h-2/4 w-8/12 mt-10 flex flex-col rounded">
                    <div className="h-1/5 bg-black text-white text-sm flex justify-between p-4">
                        <h1 className="w-1/5">Profile</h1>
                        <h1 className="w-1/5">Status</h1>
                        <h1 className="w-1/5">Duration</h1>
                        <h1 className="w-1/5">Action</h1>
                        </div>
                    {InternshipData.map((value,index) => (
                        <div key={index} className='h-1/5 bg-black text-white text-sm flex justify-between p-4'>
                            <h1 className="w-1/5">{value.profile}</h1>
                            <h1 className="w-1/5">{value.status}</h1>
                            <h1 className="w-1/5">{value.duration}</h1>
                            <div className="w-1/5 relative">
                            <button className="px-3 py-1 rounded bg-white text-black" onClick={() => toggleDropdown(index)}>Actions</button>
                            {dropdownIndex === index && (
                                <div className="absolute top-full left-0 z-10 bg-white border border-gray-200 rounded shadow-lg">
                                    {value.status === "Open" && (
                                        <button className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-200" onClick={closeInternship(value._id)}>Close</button>
                                    )}
                                    {value.status === "Closed" && (
                                        <button className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-200" onClick={openInternship(value._id)}>Open</button>
                                    )}
                                    <button className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-200" onClick={deleteInternship(value._id)}>Delete</button>
                                </div>
                            )}
                        </div>
                        </div>

                    ))}
                </div>
                </div>
            </>
        ) : (
            <>
            <h1>Loading...</h1>
            </>
        )}
        </>
  )
}

export default InternshipApplication