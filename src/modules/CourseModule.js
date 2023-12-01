import {createActions, handleActions} from "redux-actions";

const initialState = {};

const GET_COURSES = 'course/GET_COURSES';

export  const {course : {getCourses}} = createActions({
    [GET_COURSES] : result => ({courses : result.data})
});

const courseReducer = handleActions({
    [GET_COURSES] : (state, {payload}) => payload
}, initialState);

export default courseReducer;