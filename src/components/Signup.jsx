import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { asyncsignup } from "../store/Actions/userActions";
import { useNavigate } from "react-router-dom";
import Joi from 'joi';


const Signup = () => {
    const [firstname, setfirstname] = useState("");
    const [lastname, setlastname] = useState("");
    const [email, setemail] = useState("");
    const [contact, setcontact] = useState("");
    const [city, setcity] = useState("");
    const [password, setpassword] = useState("");
    const [gender, setgender] = useState("Male");

    const [errors, setErrors] = useState([])

    const customTlds = ['com', 'net', 'org', /* Add more TLDs as needed */];

    const schema = Joi.object({
        firstname: Joi.string().required(),
        lastname: Joi.string().required(),
        email: Joi.string().email({ tlds: { allow: customTlds } }).required(),
        contact: Joi.string().required(),
        city: Joi.string().required(),
        password: Joi.string().min(6).required(),
        gender: Joi.string().required(),
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
            city: city,
            password: password,
            gender: gender,
        };
        const result = schema.validate(newuser, { abortEarly: false });

        if (!result.error) {
        dispatch(asyncsignup(newuser));
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
        <div className="h-full w-full flex flex-col justify-center font-semibold items-center">
            <div className="w-2/6 h-3/4 border shadow-lg flex flex-col items-center">
            <h1 className="p-5 text-xl">Register as Student</h1>
            <form className="flex flex-col items-center justify-around h-full" onSubmit={signupuser} action="" method="post">
                <div className="flex flex-col">
                <label  htmlFor="">Email</label>
                <input className="input-fields border h-10 rounded border-zinc-300" placeholder="Email" onChange={(e) => setemail(e.target.value)} value={email} type="email" name="email" />
                {errors.email && <p>Email is required</p>}
                </div>
                <div className="flex flex-col">
                <label htmlFor="">Password</label>
                <input className="input-fields border h-10 rounded border-zinc-300" placeholder="Password" onChange={(e) => setpassword(e.target.value)} value={password} type="password" name="password"/>
                {errors.password && <p>Password is required</p>}
                </div>
                <div className="flex flex-row">
                    <div className="flex flex-col">
                        <label htmlFor="">First Name</label>
                <input className="input-fields border h-10 rounded border-zinc-300"  placeholder="First name" name="firstname" value={firstname} onChange={(e) => setfirstname(e.target.value)} type="text" />
                {errors.firstname && <p>First name is mandatory</p>}
                    </div>
                    <div className="flex flex-col" >
                        <label htmlFor="">Last Name</label>
                <input className="input-fields border h-10 rounded border-zinc-300" placeholder="Last name" onChange={(e) => setlastname(e.target.value)} value={lastname} type="text" name="lastname" />
                {errors.lastname && <p>Last name is mandatory</p>}
                    </div>
                </div>
                <label htmlFor="">Contact</label>
                <input className="input-fields border h-10 rounded border-zinc-300" placeholder="Contact" onChange={(e) => setcontact(e.target.value)} value={contact} type="tel" name="contact"/>
                {errors.contact && <p>Contact is required</p>}
                <label htmlFor="">City</label>
                <input className="input-fields border h-10 rounded border-zinc-300" placeholder="City" onChange={(e) => setcity(e.target.value)} value={city}  type="text" name="city"/>
                <label htmlFor="">Gender</label>
                <select className="input-fields border h-10 rounded border-zinc-300" onChange={(e) => setgender(e.target.value)} value={gender}>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                </select>
                {errors.gender && <p>Please select a gendern c</p>}
            <button className="bg-sky-400 rounded h-12 w-32 text-white">Signup User</button>
            </form>
            </div>
        </div>
    );
};

export default Signup;
