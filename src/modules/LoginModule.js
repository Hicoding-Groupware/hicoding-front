
/* 초기값 */
import {createActions, handleActions} from "redux-actions";

const initialState = {};

/* 액션 타입 */
const LOGIN_SUCCESS = 'login/LOGIN_SUCCESS';
const LOGIN_FAILURE = 'login/LOGIN_FAILURE';
const POST_INFO = 'login/POST_INFO';
const PUT_SUCCESS = 'login/PUT_SUCCESS';
const PUT_FAILURE = 'login/PUT_FAILURE';



/* 액션 함수 */
export const { login : {  loginSuccess, loginFailure, postInfo, putSuccess , PutFailure} } = createActions({

    [LOGIN_SUCCESS] : () => ({ loginSuccess : true }),
    [LOGIN_FAILURE] : () => ({ loginSuccess : false }),
    [POST_INFO] : result => ({logins : result.data}),
    [PUT_SUCCESS] : () => ({ putSuccess : true }),
    [PUT_FAILURE] : () => ({ putSuccess : true }),




});

/* 리듀서 함수 */
const loginReducer = handleActions({
    [LOGIN_SUCCESS] : (state, { payload }) => payload,
    [LOGIN_FAILURE] : (state, { payload }) => payload,
    [POST_INFO] : (state, { payload }) => payload,
    [PUT_SUCCESS] : (state, { payload }) => payload,
    [PUT_FAILURE] : (state, { payload }) => payload,

}, initialState);

export default loginReducer;












