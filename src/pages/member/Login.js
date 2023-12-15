import LoginForm from "../../components/form/LoginForm";
import {useSelector} from "react-redux";
import React, {useEffect} from "react";
import {toast, ToastContainer} from "react-toastify";


function Login(){


    return(
        <>
            <ToastContainer hideProgressBar={true} position="top-center"/>
            <div className="background-div">
                <img className="logo2" style={{width : 300, height : 820}}
                     src="img/logo2.png"/>
                <h3 className="logoname">Coding</h3>
                <img className="logback-img" style={{width : 940, height : 850}}
                     src="img/backround.png"/>
                <div className="login-div">
                    <LoginForm/>
                </div>
            </div>
        </>
    );

}

export default Login;