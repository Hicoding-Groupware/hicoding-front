import LoginForm from "../../components/form/LoginForm";


function Login(){
    return(
        <>



            <div className="background-div">
                <img className="logo2"
                     src="https://github.com/Hicoding-Groupware/hicoding-front/assets/138549261/07cb5ffd-f2a8-4f2d-8b88-7b6caa637567"/>
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