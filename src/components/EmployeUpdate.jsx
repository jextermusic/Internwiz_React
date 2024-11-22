import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { asynccurrentEmploye, asyncupdateOrgLogo, asyncupdateEmploye } from '../store/Actions/userActions';




const EmployeUpdate = () => {
    const { isAuth, user } = useSelector(state => state.user);
    console.log(user)
    const [firstname, setfirstname] = useState("");
    const [lastname, setlastname] = useState("");
    const [email, setemail] = useState("");
    const [contact, setcontact] = useState("");
    const [organizationlogo, setorganizationlogo] = useState("")
    const [oragnizationname, setoragnizationname] = useState("")
    
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const signupuser = async (e) => {
        e.preventDefault();
        const newuser = {
            firstname: firstname,
            lastname: lastname,
            contact: contact,
            oragnizationname: oragnizationname
            
        };
        const formData = new FormData();
        formData.append('organizationlogo', organizationlogo);
        dispatch(asyncupdateEmploye(user._id, newuser));
        try {
            await dispatch(asyncupdateOrgLogo(user._id, formData));
            
            await dispatch(asynccurrentEmploye());
            
            // navigate('/');
          } catch (error) {
            console.error('Error updating organizationlogo:', error);
          }
        // dispatch(asynccurrentUser())
        // navigate("/")
        console.log(newuser)
    };

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        setorganizationlogo(selectedFile);
      };

    useEffect(() => {
        if(user){
            setfirstname(user.firstname || "");
            setlastname(user.lastname || "");
            setcontact(user.contact || "");
            setemail(user.email || "")
            setoragnizationname(user.oragnizationname || "")
            // setorganizationlogo(user.organizationlogo.url || "")
        }
        if(!isAuth && user) {
            dispatch(asynccurrentEmploye());
            navigate("/employe/update")
        }
    }, [user,isAuth]);
    

  return (
<>
    <div className='h-max main flex justify-center'>
        <div className='card p-8 w-1/2 rounded flex flex-col items-center'>
        <h1 className='text-xl font-bold'>Personal Details</h1>
        <form onSubmit={signupuser} className='w-5/6 flex flex-col gap-5 font-semibold' action="" method="post">
            <div className='flex namecontainermain justify-between'>
            <div className='flex flex-col'>
                <label htmlFor="">First Name</label>
                <input onChange={(e) => setfirstname(e.target.value)} value={firstname} className='h-10 rounded border p-2 border-gray-300 focus:outline-sky-400' placeholder='John' type="text" />
            </div>
            <div className='flex flex-col'>
                <label htmlFor="">Last Name</label>
                <input onChange={(e) => setlastname(e.target.value)} value={lastname} className='h-10 rounded border p-2 border-gray-300 focus:outline-sky-400' placeholder='Doe' type="text" />
            </div>
            </div>
            <div className='flex flex-col'>
                <label htmlFor="">Organization Name</label>
                <input onChange={(e) => setoragnizationname(e.target.value)} value={oragnizationname} className='h-10 rounded border p-2 border-gray-300 focus:outline-sky-400' placeholder='Doe' type="text" />
            </div>
            <div className='profilepicture flex-col '>
                <label htmlFor="">Profile Picture</label>
                <div className='w-2/5 profilepicturediv flex flex-col border-2 border-dotted border-gray-500'>
                <img className='h-72 border-none object-cover' src={user && user.organizationlogo.url} alt="" />
                <label className='text-sm' htmlFor="">Something</label>
                </div>
            </div>
            <div className='filediv'>
                <input type="file" accept="image/*" onChange={handleFileChange} />
            </div>
            <div className='flex flex-col'>
                <label htmlFor="">Email</label>
                <input className='h-10 rounded border p-2 border-gray-300 focus:outline-sky-400' readOnly value={email} type="email" />
                <a className='text-sm self-end ' href="">Change email</a>
            </div>
            <div className='contact flex flex-col'>
                <label htmlFor="">Contact number</label>
                <input className='h-10 rounded border p-2 border-gray-300 focus:outline-sky-400' onChange={(e) => setcontact(e.target.value)} value={contact} type="tel" />
            </div>
            <button className='submit self-end w-32 h-12 rounded bg-cyan-500 text-white font-semibold'>Submit</button>
        </form>
        </div>
    </div>
</>
  )
}

export default EmployeUpdate