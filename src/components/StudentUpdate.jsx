import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { asynccurrentUser, asyncupdateAvatar, asyncupdateUser } from '../store/Actions/userActions';




const StudentUpdate = () => {
    const { isAuth, user } = useSelector(state => state.user);
    console.log(user)
    const [firstname, setfirstname] = useState("");
    const [lastname, setlastname] = useState("");
    const [email, setemail] = useState("");
    const [contact, setcontact] = useState("");
    const [city, setcity] = useState("");
    const [gender, setgender] = useState("Male");
    const [avatar, setavatar] = useState(null)
    
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const signupuser = async (e) => {
        e.preventDefault();
        const newuser = {
            firstname: firstname,
            lastname: lastname,
            contact: contact,
            city: city,
            gender: gender,
        };
        const formData = new FormData();
        formData.append('avatar', avatar);
        dispatch(asyncupdateUser(user._id, newuser));
        try {
            await dispatch(asyncupdateAvatar(user._id, formData));
            
            await dispatch(asynccurrentUser());
            
            // navigate('/');
          } catch (error) {
            console.error('Error updating avatar:', error);
          }
        // dispatch(asynccurrentUser())
        // navigate("/")
        console.log(newuser)
    };

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        setavatar(selectedFile);
      };

    useEffect(() => {
        if(user){
            setfirstname(user.firstname || "");
            setlastname(user.lastname || "");
            setcontact(user.contact || "");
            setcity(user.city || "");
            setgender(user.gender || "");
            setemail(user.email || "")
            // setavatar(user.avatar.url || "")
        }
        if(!isAuth && user) {
            dispatch(asynccurrentUser());
            navigate("/student/update")
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
            <div className='profilepicture flex-col '>
                <label htmlFor="">Profile Picture</label>
                <div className='w-2/5 profilepicturediv flex flex-col border-2 border-dotted border-gray-500'>
                <img className='h-72 border-none object-cover' src={user && user.avatar.url} alt="" />
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
            <div className='citydiv flex flex-col'>
                <label htmlFor="">Current city</label>
                <input className='h-10 rounded border p-2 border-gray-300 focus:outline-sky-400' onChange={(e) => setcity(e.target.value)} value={city} placeholder='Current Location' type="text" />
            </div>
            <div className='genderdiv flex flex-col'>
                <label htmlFor="">Gender</label>
                <select className='h-10 rounded border p-2 border-gray-300 focus:outline-sky-400' onChange={(e) => setgender(e.target.value)} value={gender} name="" id="">
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Others</option>
                </select>
            </div>
            <button className='submit self-end w-32 h-12 rounded bg-cyan-500 text-white font-semibold'>Submit</button>
        </form>
        </div>
    </div>
</>
  )
}

export default StudentUpdate