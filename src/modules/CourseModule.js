import {createActions, handleActions} from "redux-actions";

const initialState = {};

const GET_COURSES = 'course/GET_COURSES';
const GET_COURSE = 'course/GET_COURSE';
const POST_SUCCESS = 'course/POST_SUCCESS';

export  const {course : {getCourses,getCourse,postSuccess}} = createActions({
    [GET_COURSES] : result => ({courses : result.data}),
    [GET_COURSE] : result => ({course : result.data}),
    [POST_SUCCESS] : () => ({ postSuccess : true }),
});

const courseReducer = handleActions({
    [GET_COURSES] : (state, {payload}) => payload,
    [GET_COURSE] : (state, {payload}) => payload,
    [POST_SUCCESS] : (state, { payload }) => payload,
}, initialState);

export default courseReducer;