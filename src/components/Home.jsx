import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Home = () => {
    const navigate = useNavigate();
    const { isAuth } = useSelector((state) => state.user);

    useEffect(() => {
        isAuth && navigate("/");
    }, [isAuth]);

    return <div className="h-full w-full flex flex-col justify-center items-center text-3xl text-center">
        <h1 className="w-[30%]">Please login or create an account to continue</h1>
    </div>;
};

export default Home;
