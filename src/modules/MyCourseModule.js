
/* 초기값 */
import {createActions, handleActions} from "redux-actions";

const initialState = {};

/* 액션 타입 */
const GET_COURSES = 'course/GET_COURSES';

/* 액션 함수 */
export const { course : { getCourses } } = createActions({
    [GET_COURSES] : result => ({ courses : result.data })
});

/* 리듀서 */
const courseReducer = handleActions({
    [GET_COURSES] : (state, { payload }) => payload
}, initialState);

export default courseReducer;