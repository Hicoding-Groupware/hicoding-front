import LoginForm from "../../components/form/LoginForm";
import {useSelector} from "react-redux";
import {useEffect} from "react";
import {toast} from "react-toastify";


function Login(){
    const{loginSuccess} = useSelector(state => state.loginReducer);

    useEffect(() => {
        if (loginSuccess === true){
            window.location.replace("/");
        }else if (loginSuccess === false){
             toast.warning('로그인에 실패하였습니다. 아이디와 비밀번호를 확인해주세요');
        }
    }, [loginSuccess]);


    return(
        <>

            <div className="background-div">
                <img className="logo2"
                     src="https://github.com/Hicoding-Groupware/hicoding-front/assets/138549261/07cb5ffd-f2a8-4f2d-8b88-7b6caa637567"/>
                <h3 className="logoname">Coding</h3>
                <img className="logback-img"
                     src="https://github.com/Hicoding-Groupware/hicoding-front/assets/138549261/3e3157e3-1431-4dd1-ba5e-2e40dd113db7"/>
                <div className="login-div">
                    <LoginForm/>
                </div>
            </div>
        </>
    );

}

export default Login;