/* 초기값 */
import {createActions, handleActions} from "redux-actions";

const initialState = {};

/* 액션 타입 */
const GET_STUDENTS = 'student/GET_STUDENTS';
const GET_STUDENT_DETAIL = 'student/GET_STUDENT_DETAIL';
const POST_SUCCESS = 'student/POST_SUCCESS';
const PUT_SUCCESS = 'student/PUT_SUCCESS';



/* 액션 함수 */
export const { student : { getStudents, getStudentDetail ,postSuccess, putSuccess } } = createActions({
    [GET_STUDENTS] : result => ({ students : result.data }),
    [GET_STUDENT_DETAIL] : result => ({ studentDetail : result.data }),
    [POST_SUCCESS] : () => ({ postSuccess : true }),
    [PUT_SUCCESS] : () => ({ putSuccess : true }),

});

/* 리듀서 */
const studentReducer = handleActions({
    [GET_STUDENTS] : (state, { payload }) => payload,
    [GET_STUDENT_DETAIL] : (state, { payload }) => payload,
    [POST_SUCCESS] : (state, { payload }) => payload,
    [PUT_SUCCESS] : (state, { payload }) => payload,
}, initialState);

export default studentReducer;