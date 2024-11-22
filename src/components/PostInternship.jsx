import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { asyncinternpost, asyncjobpost } from '../store/Actions/userActions';


const PostInternship = () => {

// Internship States/Variables //
    const [selection, setselection] = useState("Internship")
    const [ctcselection, setctcselection] = useState("in %")
    const [profile, setprofile] = useState("");
    const [skill, setskill] = useState("");
    const [type, settype] = useState("In office");
    const [openings, setopenings] = useState(0);
    const [from, setfrom] = useState("");
    const [to, setto] = useState("");
    const [duration, setduration] = useState("3 months");
    const [responsibility, setresponsibility] = useState("");
    const [stipend, setstipend] = useState("");
    const [stipendamount, setstipendamount] = useState(0)
    const [stipendacc, setstipendacc] = useState("/month")
    // const [amount, setamount] = useState(0);
    const [perks, setperks] = useState("");
    const [assesments, setassesments] = useState([]);

    const handleAssessmentChange = (index, value) => {
      const newAssessments = [...assesments]; // Create a copy of the assessments array
      newAssessments[index] = value; // Update value at index with new assessment value
      setassesments(newAssessments); // Update state with the new assessments array
    };


    const handleAddAssessmentInput = () => {
      setassesments([...assesments, '']); // Add a new empty assessment to the assessments array
    };
  
    const handleRemoveAssessmentInput = (index) => {
      const newAssessments = [...assesments]; // Create a copy of the assessments array
      newAssessments.splice(index, 1); // Remove the assessment at the specified index
      setassesments(newAssessments); // Update state with the new assessments array
    };

    // Job States/Variables //

    const [jobprofile, setjobprofile] = useState("")
    const [jobskill, setjobskill] = useState("")
    const [jobtype, setjobtype] = useState("In office")
    const [jobopenings, setjobopenings] = useState(0)
    const [jobdescription, setjobdescription] = useState("")
    const [jobpreferences, setjobpreferences] = useState("")
    const [jobsalary, setjobsalary] = useState(0)
    const [jobperks, setjobperks] = useState("")
    const [jobassesments, setjobassesments] = useState([])

    const handleJobAssessmentChange = (index, value) => {
      const newJobAssessments = [...jobassesments]; // Create a copy of the assessments array
      newJobAssessments[index] = value; // Update value at index with new assessment value
      setjobassesments(newJobAssessments); // Update state with the new assessments array
    };


    const handleAddJobAssessmentInput = () => {
      setjobassesments([...jobassesments, '']); // Add a new empty assessment to the assessments array
    };
  
    const handleRemoveJobAssessmentInput = (index) => {
      const newJobAssessments = [...jobassesments]; // Create a copy of the assessments array
      newJobAssessments.splice(index, 1); // Remove the assessment at the specified index
      setjobassesments(newJobAssessments); // Update state with the new assessments array
    };

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { isAuth, user } = useSelector((state) => state.user);





    const submitHandler = (e) => {
        e.preventDefault()
        if(selection == "Internship"){
          const newintern = {
              profile: profile,
              skill: skill,
              internshiptype: type,
              openings: openings,
              from: from,
              to: to,
              duration: duration,
              responsibility: responsibility,
              stipend: {
                status: stipend,
                amount: stipendamount,
                according: {
                  status: stipendacc
                },
              },
              perks: perks,
              assesments: assesments,
          }
          dispatch(asyncinternpost(newintern));
          navigate("/")
        }
        else if (selection == "Job"){
          const newjob = {
            profile: jobprofile,
            skill: jobskill,
            jobtype: jobtype,
            openings: jobopenings,
            description: jobdescription,
            preferences: jobpreferences,
            salary: jobsalary,
            perks: jobperks,
            assesments: jobassesments
          }
          dispatch(asyncjobpost(newjob))
          navigate("/")
        }
    }

    useEffect(() => {
      !isAuth && navigate("/");
  }, [isAuth]);


  return (
    <div className='w-full flex-col flex items-center'>
      <div className='flex flex-col border-zinc-300 border'>        
      <h1>Opportunity type</h1>
      <div className='flex'>
      <input defaultChecked onChange={() => setselection("Internship")} value={selection} type="radio" name="selection" id="internshipsel" />
      <label htmlFor="">Internship</label>
      <input onChange={() => setselection("Job")} value={selection} type="radio" name="selection" id="jobselc" />
      <label htmlFor="">Job</label>
      </div>
      </div>
      {selection == "Internship" ?
    (<>
    <div className='w-full flex flex-col items-center'>
    <form className='flex flex-col justify-around h-full w-2/4' onSubmit={submitHandler} action="" method="post">
        <h1>Internship details</h1>
        <div className='h-full w-full p-5 border-2 flex flex-col gap-5'>
          <div className='flex flex-col'>
          <label htmlFor="">Internship Profile</label>
        <input className='h-10 rounded border-zinc-300 border' value={profile} onChange={(e) => setprofile(e.target.value)} placeholder="Web Development, Marketing, Graphic Design" type="text" />
          </div>
          <div className='flex'>
            <div className='flex flex-col'>
              <label htmlFor="">Skills required</label>
        <input className='h-10 rounded border-zinc-300 border' value={skill} onChange={(e) => setskill(e.target.value)} placeholder="C++, Sales, Illustrator" type="text" />
            </div>
            </div>
            <div className='flex flex-col'>
              <label htmlFor="">Internship type</label>
              <select className='border-zinc-300 border h-10' onChange={(e) => settype(e.target.value)} value={type} name="" id="">
                <option value="In office">In office</option>
                <option value="Remote">Remote</option>
              </select>
          </div>
          <div className='flex justify-between'>
            <div className='flex flex-col'>
              <label htmlFor="">Number of openings</label>
        <input className='h-10 rounded border-zinc-300 border' value={openings} onChange={(e) => setopenings(e.target.value)} placeholder="No. of openings" type="number" />
            </div>
          </div>
            <div className='flex flex-col'>
              <label htmlFor="">Internship start date</label>
              <div className='flex flex-col'>
                <label htmlFor="">From</label>
        <input className='w-72 h-10 rounded border-zinc-300 border' value={from} onChange={(e) => setfrom(e.target.value)} placeholder="From" type="month" />
              </div>
            <div className='flex flex-col'>
              <label htmlFor="">To</label>
        <input className='w-72 h-10 rounded border-zinc-300 border' value={to} onChange={(e) => setto(e.target.value)} placeholder="To" type="month" />
            </div>
            </div>
          <div className='flex'>
            <div className='flex flex-col'>
              <label htmlFor="">Internship duration</label>
              <select className='h-10 border-zinc-300 border' onChange={(e) => setduration(e.target.value)} value={duration} name="" id="">
                <option value="3 months">3 months</option>
                <option value="6 months">6 months</option>
                <option value="12 months">12 months</option>
              </select>
            </div>
          </div>
            <div className='flex flex-col'>
                <label htmlFor="">Intern's responsibilities</label>
                <textarea onChange={(e) => setresponsibility(e.target.value)} value={responsibility} className='resize-none border-zinc-300 border' placeholder="Selected intern's day to day responsibilities include" name="" id="" cols="30" rows="10"></textarea>
            </div>
            </div>
            <div>
            <div>
                <div className='flex flex-col p-5 gap-5 border'>
                <h1>Stipend & perks</h1>
                    <label htmlFor="">Stipend</label>
                    <div className='flex w-3/4 justify-between'>
                        <input name='stipend' placeholder='Fixed' onChange={(e) => setstipend(e.target.value)} value="Fixed" type="radio" />
                        <label htmlFor="">Fixed</label>
                        <input name='stipend' onChange={(e) => setstipend(e.target.value)} value="Negotiable" type="radio" />
                        <label htmlFor="">Negotiable</label>
                        <input name='stipend' onChange={(e) => setstipend(e.target.value)} value="Performance based" type="radio" />
                        <label htmlFor="">Performance based</label>
                        <input name='stipend' onChange={(e) => setstipend(e.target.value)} value="Unpaid" type="radio" />
                        <label htmlFor="">Unpaid</label>
                    </div>
                    <div className='flex'>
                    <input className='border-zinc-300 border h-10 rounded' onChange={(e) => setstipendamount(e.target.value)} value={stipendamount} placeholder="in &#8377; (Rupees)" type="text" />
                    <select value={stipendacc} onChange={(e) => setstipendacc(e.target.value)}  name="" id="">
                        <option value="/month">/month</option>
                        <option value="/year">/year</option>
                    </select>
                    </div>
                    <div className='flex flex-col'>
                        <label htmlFor="">Perks</label>
                        <input className='border-zinc-300 border h-10 rounded' onChange={(e) => setperks(e.target.value)} value={perks} placeholder='Certificate, Letter of recommendation' type="text" />
                    </div>
                    <div className='flex flex-col gap-2'>
                      <label htmlFor="">Assesments</label>
                    {assesments.map((value, index) => (
                    <div key={index}>
                    <input
                    className='border-zinc-300 border h-10 rounded'
                    value={value}
                    type="text"
                    onChange={(e) => handleAssessmentChange(index, e.target.value)}
                    />
                    <label onClick={() => handleRemoveAssessmentInput(index)}>X</label>
                    </div>
                    ))}
                    <label onClick={handleAddAssessmentInput}>Add assessments</label>
                    </div>
                </div>
            </div>
            </div>
        <button className='bg-cyan-500 w-24 h-10 rounded self-end text-white font-bold'>Post</button>
      </form>
      </div>
    </>
    ) : 
      (
        <>
        <div className='w-full flex flex-col items-center'>
        <form className='flex flex-col justify-around h-full w-2/4' onSubmit={submitHandler} action="" method="post">
        <div className='h-full w-full p-5 border-2 flex flex-col gap-5'>
        <h1>Job details</h1>
          <div className='flex flex-col'>
          <label htmlFor="">Job title</label>
        <input className='h-10 rounded border-zinc-300 border' value={jobprofile} onChange={(e) => setjobprofile(e.target.value)} placeholder="Web Development, Marketing, Graphic Design" type="text" />
          </div>
          <div className='flex'>
            <div className='flex flex-col'>
              <label htmlFor="">Skills required</label>
        <input className='h-10 rounded border-zinc-300 border' value={jobskill} onChange={(e) => setjobskill(e.target.value)} placeholder="C++, Sales, Illustrator" type="text" />
            </div>
            </div>
            <div className='flex flex-col'>
              <label htmlFor="">Job Type</label>
              <select className='h-10 rounded border-zinc-300 border' onChange={(e) => setjobtype(e.target.value)} value={jobtype} name="" id="">
                <option value="In office">In office</option>
                <option value="Remote">Remote</option>
              </select>
          </div>
          <div className='flex justify-between'>
            <div className='flex flex-col'>
              <label htmlFor="">Number of openings</label>
        <input className='h-10 rounded border-zinc-300 border' value={jobopenings} onChange={(e) => setjobopenings(e.target.value)} placeholder="No. of openings" type="number" />
            </div>
          </div>
            <div className='flex flex-col'>
                <label htmlFor="">Job descripion</label>
                <textarea onChange={(e) => setjobdescription(e.target.value)} value={jobdescription} className='resize-none rounded border-zinc-300 border' placeholder="Key responsibilities:&#10;&#10;1.&#10;2.&#10;3." name="" id="" cols="30" rows="10"></textarea>
            </div>
            <div className='flex flex-col'>
              <label htmlFor="">Do you have any candidate preferences?</label>
              <textarea  value={jobpreferences} onChange={(e) => setjobpreferences(e.target.value)} placeholder='eg. Only Computer Science graduates preferred' className='resize-none h-32 rounded border-zinc-300 border' name="" id="" cols="30" rows="10"></textarea>
            </div>
            </div>
            <div className='flex flex-col p-5'>
              <h1>Stipend & perks</h1>
              <div>
                <label htmlFor="">CTC</label>
                <div className='flex gap-2'>
                  <input className='h-10 rounded border-zinc-300 border' type="text" />
                  <label htmlFor="">TO</label>
                  <input className='h-10 rounded border-zinc-300 border' onChange={(e) => setjobsalary(e.target.value)} value={jobsalary} type="text" />
                  <label htmlFor="">LPA</label>
                </div>
              </div>
              <div className='flex flex-col'>
              <label htmlFor="">CTC breakup</label>
              <div className='flex'>
                <input onChange={() => setctcselection("in %")} value={ctcselection} defaultChecked name='ctc' type="radio" />
                <label htmlFor="">In %</label>
                <input onChange={() => setctcselection("in LPA")} value={selection} name='ctc' type="radio" />
                <label htmlFor="">in LPA</label>
              </div>
              {ctcselection == "in %" ? 
              (<>
                <div className='flex flex-col'>
                <label htmlFor="">Fixed pay</label>
                <div className='flex'>
                <input className='h-10 rounded border-zinc-300 border' type="text" />
                <label htmlFor="">%</label>
                </div>
              </div>
              <div>
                <label htmlFor="">Variable pay</label>
                <div>
                  <input className='h-10 rounded border-zinc-300 border' type="text" />
                  <label htmlFor="">%</label>
                </div>
              </div>
              <div>
                <label htmlFor="">Other incentives</label>
                <div>
                  <input className='h-10 rounded border-zinc-300 border' type="text" />
                  <label htmlFor="">%</label>
                </div>
              </div>
                </>
              ) : (
                <>
                <div className='flex flex-col'>
                <label htmlFor="">Fixed pay</label>
                <div className='flex'>
                <input className='h-10 rounded border-zinc-300 border' type="text" />
                <label htmlFor="">LPA</label>
                </div>
              </div>
              <div>
                <label htmlFor="">Variable pay</label>
                <div>
                  <input className='h-10 rounded border-zinc-300 border' type="text" />
                  <label htmlFor="">LPA</label>
                </div>
              </div>
              <div>
                <label htmlFor="">Other incentives</label>
                <div>
                  <input className='h-10 rounded border-zinc-300 border' type="text" />
                  <label htmlFor="">LPA</label>
                </div>
              </div>
                </>
              )}
              </div>

              <div className='flex flex-col'>
                <label htmlFor="">Perks</label>
                <input className='h-10 rounded border-zinc-300 border' value={jobperks} onChange={(e) => setjobperks(e.target.value)} placeholder='Health insurance, Life insurance' type="text" />
              </div>
              <div className='flex flex-col gap-3'>
                      <label htmlFor="">Assesments</label>
                    {jobassesments.map((value, index) => (
                      <div key={index}>
                    <input
                    className='h-10 rounded border-zinc-300 border'
                    value={value}
                    type="text"
                    onChange={(e) => handleJobAssessmentChange(index, e.target.value)}
                    />
                    <label onClick={() => handleRemoveJobAssessmentInput(index)}>X</label>
                    </div>
                    ))}
                    <label onClick={handleAddJobAssessmentInput}>Add assessments</label>
            </div>
            </div>
            <button className='bg-cyan-500 w-24 h-10 rounded self-end text-white font-bold'>Post</button>
        </form>
        </div>
        </>
      )
      }
        
    </div>
  )
}

export default PostInternship