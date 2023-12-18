import LoginForm from "../../components/form/LoginForm";
import {toast, ToastContainer} from "react-toastify";


function Login(){


    return(
        <>
            <ToastContainer hideProgressBar={true} position="top-center"/>
            <div className="background-div">
                <div className="circle"></div>
                <p className="logo2">Hi</p>
                <h3 className="logoname">Coding</h3>
                <div className="logback-img"/>
                <div className="logback-img2"/>
                <div className="logback-img3"/>
                <div className="login-div">
                    <LoginForm/>
                </div>
            </div>
        </>
    );

}

export default Login;