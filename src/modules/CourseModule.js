import {createActions, handleActions} from "redux-actions";

const initialState = {};
const GET_COURSELIST = 'course/GET_COURSELIST'
const GET_COURSES = 'course/GET_COURSES';
const GET_COURSE = 'course/GET_COURSE';
const POST_SUCCESS = 'course/POST_SUCCESS';
const PUT_SUCCESS = 'course/PUT_SUCCESS';

export  const {course : {getCourselist, getCourses,getCourse,postSuccess,putSuccess}} = createActions({
    [GET_COURSELIST] : result => ({courselist : result.data}),
    [GET_COURSES] : result => ({courses : result.data}),
    [GET_COURSE] : result => ({course : result.data}),
    [POST_SUCCESS] : () => ({ postSuccess : true }),
    [PUT_SUCCESS] : () => ({ putSuccess : true }),
});

const courseReducer = handleActions({
    [GET_COURSELIST] : (state, {payload}) => payload,
    [GET_COURSES] : (state, {payload}) => payload,
    [GET_COURSE] : (state, {payload}) => payload,
    [POST_SUCCESS] : (state, { payload }) => payload,
    [PUT_SUCCESS] : (state, { payload }) => payload,
}, initialState);

export default courseReducer;