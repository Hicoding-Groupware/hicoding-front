import {useDispatch} from "react-redux";
import {useState} from "react";
import {callLoginAPI} from "../../apis/LoginAPICalls";




function LoginForm(){
    const [form, setForm] = useState({});
    const dispatch = useDispatch();


    const onChangeHandler = e => {
        setForm({
            ...form,
            [e.target.name] : e.target.value
        });
    }

    const onClickLoginHandler = () => {
        dispatch(callLoginAPI({loginRequest : form}));
    }

    return(
        <>

            <h1>Sign In</h1>

            <input className= "input-user"
                type="text"
                name="memberId"
                placeholder="ID"
                onChange={onChangeHandler}
            />
            <input className= "input-lock"
                type="password"
                name="memberPwd"
                placeholder="Password"
                onChange={onChangeHandler}
            />
            <button
                onClick={onClickLoginHandler}
            >Sign In</button>

                <p className="forgot">Forgot password?</p>
        </>
    );
}

export default LoginForm;