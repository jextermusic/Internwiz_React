import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { asynccurrentUser, asyncsignin, asyncsigninEmploye  } from "../store/Actions/userActions";
import { useNavigate } from "react-router-dom";
import { RiCloseFill } from "@remixicon/react";
import { asynccurrentEmploye } from "../store/Actions/employeActions";
import { saveUser } from "../store/Reducers/userSlice";

// const userType = useSelector((state) => state.user.userType);


const Signin = ({onClose, onLogin}) => {
    const navigate = useNavigate();
    const error = useSelector((state) => state.user.error);
    const { isAuth, user } = useSelector((state) => state.user);
    const [email, setemail] = useState("")
    const [password, setpassword] = useState("")

    const dispatch = useDispatch();
    const signinuser = (e) => {
        e.preventDefault()
        console.log("clicked sign in")
        if(error){
            return;
        }
        const newuser = {
            email: email,
            password: password,
        };

        // if(newuser.email == "" && newuser.password == ""){
        //     return console.log("no info");
        // }
        // else{
        //     dispatch(asyncsignin(newuser))
        // }
       
        if(newuser.email == "" && newuser.password == ""){
            return console.log("no info");
        }
        else if(activeTab == "student" && !error){
            dispatch(asyncsignin(newuser));
            // dispatch(asynccurrentUser());
            console.log("student");
            onLogin()
        }
        else if(activeTab == "employe" && !error){
            const employe = "employe"
            dispatch(asyncsigninEmploye(newuser));
            // dispatch(asynccurrentEmploye());
            console.log("employe");
            onLogin()
        }
        console.log(newuser)

        // try {
            
        //     // Dispatch the user data to update the user state
        //     dispatch(saveUser(userData));
        // } catch (error) {
        //     // Handle login error
        // }
    };

    

    useEffect(() => {
        isAuth && navigate("/");
    }, [isAuth]);

    // useEffect(() => {
    //     if (isAuth) {
    //         navigate("/");
    //     }
    // }, [isAuth, navigate]);

    // useEffect(() => {
    //     if (error) {
    //         console.log("Error occurred:", error);
    //         // Handle error, such as showing an error message to the user
    //     }
    // }, [error]);
    
    const [activeTab, setActiveTab] = useState("student");

  const toggleTab = (tab) => {
    setActiveTab(tab);
  };

  

    return (
        <>
        
        <div className="flex justify-center items-center w-full h-full z-50 text-gray-700">
            <div className="w-1/4 h-3/5 bg-white rounded-md ">
            <div className="flex justify-end p-2">
                <button className="h-8 w-8">
                    <RiCloseFill onClick={onClose} size="24" />
                </button>
            </div>
            <div className="text-base w-full items-center flex flex-row justify-evenly bg-center gap-3">
                <div className={`flex flex-row items-end justify-center w-40 border-2 border-transparent tab ${activeTab === "student" ? "active" : ""}`}  onClick={() => toggleTab("student")}>
                <button className="font-semibold text-lg">Student</button>
                </div>
                <div className={`flex flex-row items-end justify-center w-40 border-2 border-transparent tab ${activeTab === "employe" ? "active" : ""}`} onClick={() => toggleTab("employe")}>
                <button className="font-semibold text-lg">Employer / T&P</button>
                </div>
            </div>
            <hr className="mt-4"/>
            <div className="content h-3/4">

          <div className="p-4 h-full">
            <form className="h-full gap-2 flex flex-col justify-around items-center font-semibold" onSubmit={signinuser} action="" method="post">
                <div className="flex flex-col">
                    <label className="text-sm" htmlFor="">Email</label>
                <input className="w-80 h-10 p-1 border rounded text-sm" required onChange={(e) => setemail(e.target.value)} value={email} placeholder="john@example.com" type="email" />
                </div>
                <div className="flex flex-col">
                    <label className="text-sm" htmlFor="">Password</label>
                <input className="w-80 h-10 p-1 border rounded text-sm" required onChange={(e) => setpassword(e.target.value)} value={password} placeholder="Must be atleast 6 characters" type="password" />
                </div>
                <div className="w-80 flex justify-end">
                    <a className="text-sm text-sky-600 font-semibold" href="/forget_password">Forgot Password?</a>
                </div>
            <button className="bg-sky-500 text-white w-80 h-10 rounded text-sm">Login</button>
            <div>
                <label className="text-sm">
                    New to Internshala? Register (
                    <a href="">Student</a> / <a href="">Company</a>)
                </label>
            </div>
            </form>
          </div> 
          </div>
            
            
        </div>
        </div>
        
        </>
        
        );
    };

    export default Signin;
    

        {/* {activeTab === "employe" && (
          <div className="p-4">
            <form className="h-auto gap-2 flex flex-col justify-around items-center" onSubmit={signinuser} action="" method="post">
                <div className="flex flex-col">
                    <label htmlFor="">Email</label>
                <input className="w-80 h-8 p-1 rounded" required onChange={(e) => setemail(e.target.value)} value={email} placeholder="email" type="email" />
                </div>
                <div className="flex flex-col">
                    <label htmlFor="">Password</label>
                <input className="w-80 h-8 p-1 rounded" required onChange={(e) => setpassword(e.target.value)} value={password} placeholder="password" type="password" />
                </div>
                <div className="w-80 flex justify-end">
                    <p>Forgot Password?</p>
                </div>
            <button className="bg-white w-80 h-8 rounded">Signin User</button>
            <div>
                <label>
                    New to Internshala? Register (
                    <a href="">Student</a> / <a href="">Company</a>)
                </label>
            </div>
            </form>
          </div>
        )} */}