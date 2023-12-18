import {createActions, handleActions} from "redux-actions";

const initialState = {};

const GET_LECTURES = 'lecture/GET_LECTURES';
const POST_SUCCESS = 'lecture/POST_SUCCESS';


export  const {lecture : {getLectures,postSuccess}} = createActions({
    [GET_LECTURES] : result => ({lectures : result.data}),
    [POST_SUCCESS] : () => ({ postSuccess : true }),

});

const lectureReducer = handleActions({
    [GET_LECTURES] : (state, {payload}) => payload,
    [POST_SUCCESS] : (state, { payload }) => payload,
}, initialState);

export default lectureReducer;