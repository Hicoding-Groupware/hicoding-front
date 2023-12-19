
/* 초기값 */
import {createActions, handleActions} from "redux-actions";

const initialState = {};

/* 액션 타입 */
const LOGIN_SUCCESS = 'login/LOGIN_SUCCESS';
const LOGIN_FAILURE = 'login/LOGIN_FAILURE';
const ONLY_LOGIN_SUCCESS = 'login/ONLY_LOGIN_SUCCESS';
const ONLY_LOGIN_FAILURE = 'login/ONLY_LOGIN_FAILURE';
const POST_INFO = 'login/POST_INFO';
const POST_SUCCESS = 'login/POST_SUCCESS';
const POST_FAILURE = 'login/POST_FAILURE';
const PUT_SUCCESS = 'login/PUT_SUCCESS';
const PUT_FAILURE = 'login/PUT_FAILURE';
const GET_SUCCESS = 'login/GET_SUCCESS';



/* 액션 함수 */
export const { login : {  loginSuccess, loginFailure,onlyLoginSuccess,onlyLoginFailure, postSuccess, postFailure, postInfo, putSuccess , putFailure, getSuccess} } = createActions({

    [LOGIN_SUCCESS] : () => ({ loginSuccess : true }),
    [LOGIN_FAILURE] : () => ({ loginSuccess : false }),
    [ONLY_LOGIN_SUCCESS] : () => ({ onlyLoginSuccess : true }),
    [ONLY_LOGIN_FAILURE] : () => ({ onlyLoginSuccess : false }),
    [POST_INFO] : result => ({logins : result.data}),
    [POST_SUCCESS] : () => ({ postSuccess : true }),
    [POST_FAILURE] : () => ({ postSuccess : false }),
    [PUT_SUCCESS] : () => ({ putSuccess : true }),
    [PUT_FAILURE] : () => ({ putSuccess : false }),
    [GET_SUCCESS] : result => ({getAll : result.data}),




});

/* 리듀서 함수 */
const loginReducer = handleActions({
    [LOGIN_SUCCESS] : (state, { payload }) => payload,
    [LOGIN_FAILURE] : (state, { payload }) => payload,
    [ONLY_LOGIN_SUCCESS] : (state, { payload }) => payload,
    [ONLY_LOGIN_FAILURE] : (state, { payload }) => payload,
    [POST_INFO] : (state, { payload }) => payload,
    [POST_SUCCESS] : (state, { payload }) => payload,
    [POST_FAILURE] : (state, { payload }) => payload,
    [PUT_SUCCESS] : (state, { payload }) => payload,
    [PUT_FAILURE] : (state, { payload }) => payload,
    [GET_SUCCESS] : (state, { payload }) => payload,


}, initialState);

export default loginReducer;












