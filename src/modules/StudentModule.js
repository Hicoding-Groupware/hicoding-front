/* 초기값 */
import {createActions, handleActions} from "redux-actions";

const initialState = {};

/* 액션 타입 */
const GET_STUDENTS = 'student/GET_STUDENTS';
const GET_STUDENT_DETAIL = 'student/GET_STUDENT_DETAIL';
const GET_STUDENT_COURSE = 'student/GET_STUDENT_COURSE';
const POST_SUCCESS = 'student/POST_SUCCESS';
const POST_RECORD_SUCCESS = 'student/POST_RECORD_SUCCESS';
const PUT_SUCCESS = 'student/PUT_SUCCESS';
const PUT_RECORD_SUCCESS = 'student/PUT_RECORD_SUCCESS';



/* 액션 함수 */
export const { student : { getStudents, getStudentDetail, getStudentCourse, postSuccess, postRecordSuccess, putSuccess, putRecordSuccess } } = createActions({
    [GET_STUDENTS] : result => ({ students : result.data }),
    [GET_STUDENT_DETAIL] : result => ({ studentDetail : result.data }),
    [GET_STUDENT_COURSE] : result => ({ studentCourse : result.data }),
    [POST_SUCCESS] : () => ({ postSuccess : true }),
    [POST_RECORD_SUCCESS] : () => ({ postRecordSuccess : true }),
    [PUT_SUCCESS] : () => ({ putSuccess : true }),
    [PUT_RECORD_SUCCESS] : () => ({ putRecordSuccess : true }),

});

/* 리듀서 */
const studentReducer = handleActions({
    [GET_STUDENTS] : (state, { payload }) => ({...state, ...payload}),
    [GET_STUDENT_COURSE] : (state, { payload }) => ({...state, ...payload}),
    [POST_RECORD_SUCCESS] : (state, { payload }) => ({...state, ...payload}),
    [PUT_RECORD_SUCCESS] : (state, { payload }) => ({...state, ...payload}),
    [GET_STUDENT_DETAIL] : (state, { payload }) => payload,
    [POST_SUCCESS] : (state, { payload }) => payload,
    [PUT_SUCCESS] : (state, { payload }) => payload,

}, initialState);

export default studentReducer;