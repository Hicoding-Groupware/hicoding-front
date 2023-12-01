
/* 초기값 */
import {createActions, handleActions} from "redux-actions";

const initialState = {};

/* 액션 타입 */
const LOGIN_SUCCESS = 'login/LOGIN_SUCCESS';
const LOGIN_FAILURE = 'login/LOGIN_FAILURE';
const ADDITIONAL_INPUT_REQUIRED = ''



/* 액션 함수 */
export const { login : {  loginSuccess, loginFailure} } = createActions({

    [LOGIN_SUCCESS] : () => ({ loginSuccess : true }),
    [LOGIN_FAILURE] : () => ({ loginSuccess : false }),

});

/* 리듀서 함수 */
const loginReducer = handleActions({
    [LOGIN_SUCCESS] : (state, { payload }) => payload,
    [LOGIN_FAILURE] : (state, { payload }) => payload,
}, initialState);

export default loginReducer;












