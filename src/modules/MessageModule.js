/* 초기값 */
import {createActions, handleActions} from "redux-actions";

const initialState = {};

/* 액션 타입 */
const GET_RECEIVE_MESSAGE = 'message/GET_RECEIVE_MESSAGE';
const GET_SEND_MESSAGE = 'message/GET_SEND_MESSAGE';
const GET_FILE = 'message/GET_FILE';
const GET_MEMBER = 'message/GET_MEMBER';
const POST_MESSAGE_SUCCESS = 'message/POST_MESSAGE_SUCCESS';
const RESET_SUCCESS = 'message/RESET_SUCCESS';
const GET_RECEIVE_DETAIL = 'message/GET_RECEIVE_DETAIL';
const GET_SEND_DETAIL = 'message/GET_SEND_DETAIL';
const PUT_DELETE_SUCCESS = 'message/PUT_DELETE_SUCCESS';
const GET_MESSAGE = 'message/GET_MESSAGE';


/* 액션 함수 */
export const { message : { getMessage, getReceiveMessage, getSendMessage, getFile, getMember, postMessageSuccess, getReceiveDetail, getSendDetail, putDeleteSuccess, resetSuccess } } = createActions({
    [GET_RECEIVE_MESSAGE] : result => ({ receiveMessages : result.data }),
    [GET_SEND_MESSAGE] : result => ({ sendMessages : result.data }),
    [GET_FILE] : result => ({ MessageFile : result.data }),
    [GET_MEMBER] : result => ({ memberList : result.data }),
    [GET_RECEIVE_DETAIL] : result => ({ receiveDetail : result.data }),
    [GET_SEND_DETAIL] : result => ({ sendDetail : result.data }),
    [POST_MESSAGE_SUCCESS] : () => ({ postMessageSuccess : true }),
    [PUT_DELETE_SUCCESS] : () => ({ putDeleteSuccess : true }),
    [RESET_SUCCESS] : key => ({ key }),
    [GET_MESSAGE] : result => ({ message : result.data }),

});

/* 리듀서 */
const messageReducer = handleActions({
    [GET_RECEIVE_MESSAGE] : (state, { payload }) => payload,
    [GET_SEND_MESSAGE] : (state, { payload }) => ({...state, ...payload}),
    [GET_FILE] : (state, { payload }) => ({...state, ...payload}),
    [GET_MEMBER] : (state, { payload }) => ({...state, ...payload}),
    [GET_RECEIVE_DETAIL] : (state, { payload }) => ({...state, ...payload}),
    [GET_SEND_DETAIL] : (state, { payload }) => ({...state, ...payload}),
    [POST_MESSAGE_SUCCESS] : (state, { payload }) => payload,
    [PUT_DELETE_SUCCESS] : (state, { payload }) => payload,
    [RESET_SUCCESS] : (state, { payload }) => ({ ...state, [payload.key] : null }),
    [GET_MESSAGE] : (state, { payload }) => payload,
}, initialState);

export default messageReducer;