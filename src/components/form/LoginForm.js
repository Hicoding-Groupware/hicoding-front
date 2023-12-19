import {useDispatch, useSelector} from "react-redux";
import React, {useEffect, useState} from "react";
import {callLoginAPI, MemberAllAPI} from "../../apis/LoginAPICalls";
import FirstLoginModal from "../modal/FirstLoginModal";
import {toast, ToastContainer} from "react-toastify";






function LoginForm(){
    const [form, setForm] = useState({});
    const loginReducer = useSelector(state => state.loginReducer);
    const dispatch = useDispatch();
    const {logins} = useSelector(state => state.loginReducer);

    useEffect(() => {
        if(loginReducer?.loginSuccess === true) {
            window.location.replace("/");
        }
    }, [loginReducer]);



    const onChangeHandler = e => {
        setForm({
            ...form,
            [e.target.name] : e.target.value
        });
    }

    const onClickLoginHandler = () => {
        if (!form.memberId || !form.memberPwd) {
            toast.warning('아이디와 비밀번호를 모두 입력해주세요.');
            return;
        }
        dispatch(callLoginAPI({ loginRequest: form }))

    };

    const handleOnKeyPress = e => {
        if (e.key === 'Enter') {
            onClickLoginHandler();
        }
    };

    return(
        <>

            {loginReducer?.logins ? (
                <FirstLoginModal/>
            ) : (
                <>
                    <h1>Sign In</h1>
                    <input
                        className="input-user"
                        type="text"
                        name="memberId"
                        placeholder="ID"
                        onChange={onChangeHandler}
                    />
                    <input
                        className="input-lock"
                        type="password"
                        name="memberPwd"
                        placeholder="Password"
                        onChange={onChangeHandler}
                        onKeyPress={handleOnKeyPress}
                    />
                    <button className="login-form-button" style={{cursor : "pointer"}} onClick={onClickLoginHandler}>Sign In</button>
                    <p className="forgot">Forgot password?</p>
                </>
            )}
        </>
    );
}

export default LoginForm;