import {createActions, handleActions} from "redux-actions";

const initialState = {};

const GET_LECTURES = 'lecture/GET_LECTURES';

export  const {lecture : {getLectures}} = createActions({
    [GET_LECTURES] : result => ({lectures : result.data})
});

const lectureReducer = handleActions({
    [GET_LECTURES] : (state, {payload}) => payload
}, initialState);

export default lectureReducer;