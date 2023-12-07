import LoginForm from "../../components/form/LoginForm";
import {useSelector} from "react-redux";
import {useEffect} from "react";
import {toast, ToastContainer} from "react-toastify";


function Login(){


    return(
        <>
            <ToastContainer hideProgressBar={true} position="top-center"/>
            <div className="background-div">
                <img className="logo2" style={{width : 300, height : 820}}
                     src="https://github.com/Hicoding-Groupware/hicoding-front/assets/138549261/07cb5ffd-f2a8-4f2d-8b88-7b6caa637567"/>
                <h3 className="logoname">Coding</h3>
                <img className="logback-img" style={{width : 940, height : 850}}
                     src="https://github.com/Hicoding-Groupware/hicoding-front/assets/138549261/3e3157e3-1431-4dd1-ba5e-2e40dd113db7"/>
                <div className="login-div">
                    <LoginForm/>
                </div>
            </div>
        </>
    );

}

export default Login;