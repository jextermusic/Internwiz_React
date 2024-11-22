import React, { useEffect, useState } from "react";
import { Link, Navigate, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import Signup from "./components/Signup";
import Signin from "./components/Signin";
import Profile from "./components/Profile";
import Resume from "./components/Resume";
import DeleteAccount from "./components/DeleteAccount";
import { useDispatch, useSelector } from "react-redux";
import { asynccurrentUser, asyncremoveUser, asynccurrentEmploye } from "./store/Actions/userActions";
import StudentUpdate from "./components/StudentUpdate";
import PostInternship from "./components/PostInternship";
import ChangePassword from "./components/ChangePassword";
import { asyncfetchInternships } from "./store/Actions/internshipActions";
import InternshipView from "./components/InternshipView";
import JobView from "./components/JobView";
import ForgetPassword from "./components/ForgetPassword";
import ForgetPasswordUnique from "./components/ForgetPasswordUnique";
import SignupEmploye from "./components/SignupEmploye";
import Modal from "./components/Modal";
import EmployeUpdate from "./components/EmployeUpdate";



const App = () => {
    const { isAuth, user } = useSelector((state) => state.user);
    const error = useSelector((state) => state.user.error);
    const dispatch = useDispatch();

    const [userData, setuserData] = useState([])
    const counter = useSelector(state => state.user)
    useEffect(() => {
        setuserData(counter);
        dispatch(asyncfetchInternships())
      }, [counter])



    //   useEffect(() => {
    //     if(userData && userData.role == "student"){
    //         dispatch(asynccurrentUser());
    //     }
    //     else if(userData && userData.role == "employee"){
    //         dispatch(asynccurrentEmploye());
    //     }
    //   }, [counter])

      console.log(counter)
      console.log(userData)
    
    // useEffect(() => {
    // //    dispatch(asynccurrentEmploye())
    //     dispatch(asyncfetchInternships());
    // }, [asyncfetchInternships]);

    // useEffect(() => {
    //     dispatch(asyncfetchInternships());
    // }, [])


    const LogoutHandler = () => {
        console.log("click");
        dispatch(asyncremoveUser());
    };

    const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleLogin = () => {
    // Perform login logic
    // If login is successful, close the modal
    setIsModalOpen(false);
};

const [isDropdownOpen, setIsDropdownOpen] = useState(false);

const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
};

    return (
        <div className="h-screen w-screen overflow-x-hidden">
            <div className="flex w-screen justify-center">
            <div className={isModalOpen == true ? 'absolute inset-0 bg-black opacity-50 ' : ''}></div>
            
            <div className="items-center flex w-[75%] justify-between ">
            <div>
                <h1>Internwiz</h1>
            </div>
            <Link to="/">Home</Link>
            <nav className="p-2 flex gap-x-5">

                
                {!isAuth ? (
                    <>
                        <Link to="/signup/student">Signup Student</Link>
                        <Link to="/signup/employe">Signin Employe</Link>
                        {/* <Link to="/signin">Signin</Link> */}
                        <button onClick={openModal}>Signin</button>
                        
                    </>
                ) : (
                    <>
                        
                        
                        {user && user.role === "student" &&
                        <>
                        <div className="user-profile" onMouseEnter={() => setIsDropdownOpen(true)} onMouseLeave={() => setIsDropdownOpen(false)}>
                <button
                    className="flex justify-center items-center"
                    title="Signout"
                    onClick={LogoutHandler}
                >
                    <img
                        className="w-[5vh] h-[5vh] object-cover rounded-full"
                        src={user && (user.avatar && user.avatar.url || user.organizationlogo && user.organizationlogo.url)}
                        alt=""
                    />
                </button>
                {isDropdownOpen && (
                    <div className="dropdown-menu">
                        <ul>
                            <li><Link to="/resume">Edit resume</Link></li>
                            <li><Link to="/student/update">Update profile</Link></li>
                            <li><Link to="/update_password">Change password</Link></li>
                            <li><Link to="/delete">Delete</Link></li>
                            <li onClick={LogoutHandler}><Link>Logout</Link></li>
                        </ul>
                    </div>
                )}
            </div>
                       
                       
                        
                        </>
                        }
                        {user && user.role === "employee" && (
                        <>
                        <Link to="/employee/post_internship">Post Internship/Job</Link>
                        <div className="user-profile" onMouseEnter={() => setIsDropdownOpen(true)} onMouseLeave={() => setIsDropdownOpen(false)}>
                        
                <button
                    className="flex justify-center items-center"
                    title="Signout"
                    onClick={LogoutHandler}
                >
                    <img
                        className="w-[5vh] h-[5vh] object-cover rounded-full"
                        src={user && (user.avatar && user.avatar.url || user.organizationlogo && user.organizationlogo.url)}
                        alt=""
                    />
                </button>
                {isDropdownOpen && (
                    <div className="dropdown-menu">
                        <ul>
                            <li><Link to="/update_password">Change password</Link></li>
                            <li><Link to="/employe/update">Update profile</Link></li>
                            <li><Link to="/delete">Delete</Link></li>
                            <li onClick={LogoutHandler}><Link>Logout</Link></li>
                        </ul>
                    </div>
                )}
            </div>
                        
                        
                         </>
                        )}
                        
                        {/* <button
                            className="flex justify-center items-center"
                            title="Signout"
                            onClick={LogoutHandler}
                        >
                            <img
                                className="w-[5vh] h-[5vh] object-cover rounded-full"
                                src={user && (user.avatar && user.avatar.url || user.organizationlogo && user.organizationlogo.url)}
                                alt=""
                            />
                        </button> */}
                        
                    </>
                )}
            </nav>
            
            <Modal onLogin={handleLogin} isOpen={isModalOpen} onClose={closeModal} />
            </div>
            </div>
            <hr />


            <Routes>
                <Route path="/" element={!isAuth ? <Home /> : <Profile />} />
                <Route path="/delete" element={<DeleteAccount />} />
                <Route path="/student/update" element={<StudentUpdate />} />
                <Route path="/employe/update" element={<EmployeUpdate />} />
                <Route path="/employee/post_internship" element={<PostInternship/>} />
                <Route path="/update_password" element={<ChangePassword />} />
                <Route path="/resume" element={<Resume />} />
                <Route path="/signup/student" element={<Signup />} />
                <Route path="/signup/employe" element={<SignupEmploye />} />
                <Route path="/signin" element={<Signin />} />
                <Route path="/internship/:id" element={<InternshipView />} />
                <Route path="/job/:id" element={<JobView />} />
                <Route path="/forget_password" element={<ForgetPassword />} />
                <Route path="/student/forget_password/:id" element={<ForgetPasswordUnique />} />
            </Routes>
        </div>
    );
};

export default App;
