import {createActions, handleActions} from "redux-actions";

const initialState = {};

const GET_LECTURES = 'lecture/GET_LECTURES';
const GET_LECTURE = 'lecture/GET_LECTURE';
const POST_SUCCESS = 'lecture/POST_SUCCESS';
const PUT_SUCCESS = 'lecture/PUT_SUCCESS';


export  const {lecture : {getLectures,getLecture,postSuccess,putSuccess}} = createActions({
    [GET_LECTURES] : result => ({lectures : result.data}),
    [GET_LECTURE] : result => ({lecture : result.data}),
    [POST_SUCCESS] : () => ({ postSuccess : true }),
    [PUT_SUCCESS] : () => ({ putSuccess : true }),


});

const lectureReducer = handleActions({
    [GET_LECTURES] : (state, {payload}) => payload,
    [GET_LECTURE] : (state, {payload}) => payload,
    [POST_SUCCESS] : (state, { payload }) => payload,
    [PUT_SUCCESS] : (state, { payload }) => payload,

}, initialState);

export default lectureReducer;