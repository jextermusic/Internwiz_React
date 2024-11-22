import React from 'react'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {useParams, useNavigate } from 'react-router-dom';
import { asyncfetchJobs } from '../store/Actions/jobActions';
import { asyncreadEmploye } from '../store/Actions/employeActions';
import { RiMoneyRupeeCircleLine, RiMapPinLine, RiCalendarLine, RiTeamFill } from "@remixicon/react";
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';


const JobList = () => {
  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 5
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 4
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1
    }
  };

  const counter = useSelector(state => state.job)
  const employe = useSelector(state => state.employe)
  const dispatch = useDispatch();
  const [jobData, setjobData] = useState(null);
  // const [employeData, setemployeData] = useState(null);

  const navigate = useNavigate();

  const submitHandler = (value, e) => {
    e.preventDefault();
    console.log(value);
    navigate(`/job/${value}`)
  }

  const jobclick = (value) => (e) => {
    submitHandler(value, e);

  }

  useEffect(() => {
    dispatch(asyncfetchJobs())
    }, [])

    useEffect(() => {
        setjobData(counter.job);
      }, [counter])
    
    console.log(jobData)

  return (
<div className='h-[80vh] w-screen bg-blue-200 p-5 flex flex-col items-center gap-5'>
  <h1>Explore these jobs</h1>
    <div className='flex h-full w-full justify-around'>
      {jobData !== null ? (
      <>
              <Carousel
        responsive={responsive}
        autoPlay={false}
        swipeable={true}
        draggable={true}
        showDots={true}
        infinite={false}
        partialVisible={false}
        dotListClass="custom-dot-list-style"
        className='w-4/5 h-full'
      >
      {jobData.map((value,index) => (    
        <div onClick={jobclick(value._id)} className='h-full w-72 text-sm rounded-lg flex flex-col cursor-pointer text-zinc-500 bg-white' key={index}>
          <div className='flex justify-around p-5' >
            <div className='flex flex-col w-36 '>
            <h1 className='text-black'>{value.profile}</h1>
            <h1 className=''>{value.employe?.organization}</h1>
            </div>
            <div className=''>
            <img className='object-cover w-20' src={value.employe?.logo} alt="" />
            </div>
          </div>
          <hr />
          <div className='p-5 text-xs flex flex-col gap-3'>
            <div className='flex gap-1'>
            <RiMapPinLine size="14" />
            <h1>{value.jobtype}</h1>
            </div>
            <div className='flex gap-1 text-center'>
              <RiMoneyRupeeCircleLine size="14" />
            <h1>INR {value.salary}</h1>
            <h1></h1>
            </div>
            <div className='flex gap-1'>
              <RiTeamFill size="14" />
            <h1>{value.openings} Openings</h1>
            </div>
            <div className='flex mt-6 w-full justify-between items-center'>
              <h1 className='bg-zinc-100 rounded p-1'>Job</h1>
              <h1 className='text-sky-600'>View details </h1>
            </div>
          </div>
        </div>
        ))}
        </Carousel>
      </>) : (
      <>
      <h1>Loading...</h1>
      </>)}
        
    </div>
    </div>
  )
}

export default JobList