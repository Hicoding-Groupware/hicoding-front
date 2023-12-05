
/* 초기값 */
import {createActions, handleActions} from "redux-actions";

const initialState = {};

/* 액션 타입1 */
const GET_COURSES = 'course/GET_COURSES';
const GET_DETAIL_COURSE = 'course/GET_DETAIL_COURSE';

/* 액션 함수 */
export const { course  : { getCourses, getDetailCourse } } = createActions({
    [GET_COURSES] : result => ({ courses : result.data }),
    [GET_DETAIL_COURSE] : result => ({ course : result.data })
});

/* 리듀서 */
const myCourseReducer = handleActions({
    [GET_COURSES] : (state, { payload }) => payload,
    [GET_DETAIL_COURSE] : (state, { payload }) => payload
}, initialState);

export default myCourseReducer;