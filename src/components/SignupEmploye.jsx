import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {asyncsignupEmploye } from "../store/Actions/userActions";
import { useNavigate } from "react-router-dom";
import Joi from 'joi';


const SignupEmploye = () => {
const [userType, setuserType] = useState("")
    const [firstname, setfirstname] = useState("");
    const [lastname, setlastname] = useState("");
    const [email, setemail] = useState("");
    const [contact, setcontact] = useState("");
    const [password, setpassword] = useState("");
    const [organizationname, setorganizationname] = useState("");

    const [errors, setErrors] = useState([])

    const customTlds = ['com', 'net', 'org', /* Add more TLDs as needed */];

    const schema = Joi.object({
        firstname: Joi.string().required(),
        lastname: Joi.string().required(),
        email: Joi.string().email({ tlds: { allow: customTlds } }).required(),
        contact: Joi.string().required(),
        password: Joi.string().min(6).required(),
        organizationname: Joi.string().required(),
    });

    const navigate = useNavigate();
    const { isAuth } = useSelector((state) => state.user);

    const dispatch = useDispatch();
    const signupuser = (e) => {
        e.preventDefault();
        const newuser = {
            firstname: firstname,
            lastname: lastname,
            email: email,
            contact: contact,
            password: password,
            organizationname: organizationname,
        };
        const result = schema.validate(newuser, { abortEarly: false });
        if (!result.error) {
            dispatch(asyncsignupEmploye(newuser));
            navigate("/");
            console.log(newuser);
        } else {
            const errors = {};
            result.error.details.forEach((error) => {
                errors[error.path[0]] = error.message;
            });
            setErrors(errors);
        }
    };

    useEffect(() => {
        isAuth && navigate("/");
    }, [isAuth]);
    return (
        <div className="h-full items-center flex flex-col justify-center ">
            <div className="w-1/4 h-3/4 flex flex-col items-center shadow-xl border p-5 font-semibold">
                <h1 className="text-xl">Register as Employer</h1>
            <form className="flex flex-col  justify-around h-full w-full" onSubmit={signupuser} action="" method="post">
                <div className="flex flex-col">
                <label htmlFor="">Email</label>
                <input className="h-10 rounded border border-zinc-300" placeholder="Email" onChange={(e) => setemail(e.target.value)} value={email} type="email" name="email" />
                {errors.email && <p>Email should not be empty</p>}
                </div>
                <div className="flex flex-col">
                <label htmlFor="">Password</label>
                <input className="h-10 rounded border border-zinc-300" placeholder="Password" onChange={(e) => setpassword(e.target.value)} value={password} type="password" name="password"/>
                {errors.password && <p>Password should not be empty</p>}
                </div>
                <div className="flex flex-col">
                    <label htmlFor="">Organization Name</label>
                    <input className="h-10 rounded border border-zinc-300" placeholder="Sheryians Community" value={organizationname} onChange={(e) => setorganizationname(e.target.value)} type="text" />
                    {errors.organization && <p>Organization name is required</p>}
                </div>
                <div className="flex flex-row">
                    <div className="flex flex-col">
                        <label htmlFor="">First Name</label>
                <input className="h-10 rounded border border-zinc-300"  placeholder="First name" onChange={(e) => setfirstname(e.target.value)} value={firstname} type="text" name="firstname" />
                {errors.firstname && <p>First name is required</p>}
                    </div>
                    <div className="flex flex-col">
                        <label htmlFor="">Last Name</label>
                <input className="h-10 rounded border border-zinc-300" placeholder="Last name" onChange={(e) => setlastname(e.target.value)} value={lastname} type="text" name="lastname" />
                {errors.lastname && <p>Last name is required</p>}
                    </div>
                </div>
                <div className="flex flex-col">
                <label htmlFor="">Contact</label>
                <input className="h-10 rounded border border-zinc-300" placeholder="Contact" onChange={(e) => setcontact(e.target.value)} value={contact} type="tel" name="contact"/>

                </div>
            <button className="bg-sky-400 text-white rounded h-12 self-center w-full">Signup User</button>
            </form>
            </div>
        </div>
    );
};

export default SignupEmploye;
