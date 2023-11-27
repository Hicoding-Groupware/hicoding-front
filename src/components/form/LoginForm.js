function LoginForm(){
    return(
        <>
            <h1>Sign In</h1>

            <input
                type="text"
                name="memberId"
                placeholder="ID"
                onChange={onChangeHandler}
            />
            <input
                type="password"
                name="memberPassword"
                placeholder="Password"
                onChange={onChangeHandler}
            />
            <button
                onClick={onClickLoginHandler}
            >Sign In</button>

            <p>Forgot password</p>
        </>
    );
}

export default LoginForm;