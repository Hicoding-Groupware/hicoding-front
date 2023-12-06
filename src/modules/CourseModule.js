import {createActions, handleActions} from "redux-actions";

const initialState = {};

const GET_COURSES = 'course/GET_COURSES';
const GET_COURSE = 'course/GET_COURSE';

export  const {course : {getCourses,getCourse}} = createActions({
    [GET_COURSES] : result => ({courses : result.data}),
    [GET_COURSE] : result => ({course : result.data})
});

const courseReducer = handleActions({
    [GET_COURSES] : (state, {payload}) => payload,
    [GET_COURSE] : (state, {payload}) => payload,
}, initialState);

export default courseReducer;