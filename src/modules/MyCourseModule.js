
/* 초기값 */
import {createActions, handleActions} from "redux-actions";

const initialState = {};

/* 액션 타입1 */
const GET_COURSES = 'course/GET_COURSES';
const GET_MAIN_COURSE = 'course/GET_MAIN_COURSE'
const GET_MAIN_COURSES = 'course/GET_MAIN_COURSES'


/* 액션 함수 */
export const { course  : { getCourses, getDetailCourse, getMainCourse, getMainCourses} } = createActions({
    [GET_COURSES] : result => ({ courses : result.data }),
    [GET_MAIN_COURSE] : result => ({ mainCourse : result.data }),
    [GET_MAIN_COURSES] : result => ({ mainCourses : result.data }),


});

/* 리듀서 */
const myCourseReducer = handleActions({
    [GET_COURSES] : (state, { payload }) => payload,
    [GET_MAIN_COURSE] : (state, { payload }) => payload,
    [GET_MAIN_COURSES] : (state, { payload }) => payload,


}, initialState);

export default myCourseReducer;