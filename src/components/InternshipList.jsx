import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { asyncreadEmploye } from '../store/Actions/employeActions';
import { asyncfetchInternships } from '../store/Actions/internshipActions';
import {useParams, useNavigate} from 'react-router-dom';
import { RiMoneyRupeeCircleLine, RiMapPinLine, RiCalendarLine } from "@remixicon/react";
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { lineWobble } from 'ldrs'
lineWobble.register()


const InternshipList = () => {
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
    const counter = useSelector(state => state.internship)
    const employe = useSelector(state => state.employe)
    const dispatch = useDispatch();
    const [internshipData, setinternshipData] = useState(null);
    const [employeData, setemployeData] = useState([]);

    const navigate = useNavigate();

    const submitHandler = (value, e) => {
      e.preventDefault();
      console.log(value);
      navigate(`/internship/${value}`)
    }

    const internshipclick = (value) => (e) => {
      submitHandler(value, e);

    }

    useEffect(() => {
        dispatch(asyncreadEmploye())
        dispatch(asyncfetchInternships());
        setinternshipData(counter.internship);
        setemployeData(employe.employe)
      }, [asyncfetchInternships])
  return (
    <div className='h-[70vh] w-screen p-5 bg-sky-100 flex flex-col items-center mt-10'>
      <h1>Explore these internships</h1>
        {/* </Carousel>; */}
    <div className='flex h-2/3 w-full justify-around'>
        {internshipData == null ? (<><l-line-wobble size="150" stroke="5" bg-opacity="0.1" speed="1.75" color="black" ></l-line-wobble></>) : (<>
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
          {internshipData.slice(0,10).map((value,index) => (
            <div onClick={internshipclick(value._id)} className='h-full w-72 text-sm rounded-lg flex flex-col cursor-pointer text-zinc-500 bg-white' key={index}>
          <div className='flex justify-around p-5' >
            <div className='flex flex-col w-36'>
            <h1 className='text-black'>{value.profile}</h1>
            <h1 className=''>{value.employe?.organization}</h1>
            </div>
            <img className='object-cover w-20' src={value.employe.logo} alt="" />
          </div>
          <hr />
          <div className='p-5 text-xs flex flex-col gap-3'>
            <div className='flex gap-1'>
            <RiMapPinLine size="14" />
            <h1>{value.internshiptype}</h1>
            </div>
            <div className='flex gap-1'>
            <RiMoneyRupeeCircleLine size="14" />
            <h1>{value.stipend.amount}</h1>
            <h1>{value.stipend.according?.status}</h1>
            </div>
            <div className='flex gap-1'>
            <RiCalendarLine size="15" />
            <h1>{value.duration}</h1>
            </div>
            <div className='flex mt-6 w-full justify-between items-center'>
              <h1 className='bg-zinc-100 rounded p-1'>Internship</h1>
              <h1 className='text-sky-600'>View details </h1>
            </div>
          </div>
        </div>
        ))}
        </Carousel>
        </>)}
        </div>
    </div>
  )
}

export default InternshipList


