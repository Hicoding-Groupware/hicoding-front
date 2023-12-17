
/* 초기값 */
import {createActions, handleActions} from "redux-actions";

const initialState = {};

/* 액션 타입1 */
const GET_MESSAGE = 'message/GET_MESSAGE';

/* 액션 함수 */
export const { message  : { getMessage} } = createActions({
    [GET_MESSAGE] : result => ({ message : result.data }),
});

/* 리듀서 */
const messageReducer = handleActions({
    [GET_MESSAGE] : (state, { payload }) => payload,
}, initialState);

export default messageReducer;