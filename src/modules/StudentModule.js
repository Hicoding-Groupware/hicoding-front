/* 초기값 */
import {createActions, handleActions} from "redux-actions";

const initialState = {};

/* 액션 타입 */
const GET_STUDENTS = 'student/GET_STUDENTS';
const GET_STUDENTS_DATE = 'student/GET_STUDENTS_DATE';

/* 액션 함수 */
export const { student : { getStudents, getStudentsDate } } = createActions({
    [GET_STUDENTS] : result => ({ students : result.data }),
    [GET_STUDENTS_DATE] : result => ({ studentsDate : result.data }),
});

/* 리듀서 */
const studentReducer = handleActions({
    [GET_STUDENTS] : (state, {payload}) => payload,
    [GET_STUDENTS_DATE] : (state, {payload}) => payload,
}, initialState);

export default studentReducer;