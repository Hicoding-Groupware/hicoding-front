
import {createActions, handleActions} from "redux-actions";

const initialState = {};

const GET_STUDENTS_INFO = 'student/GET_STUDENTS_INFO';
const POST_SUCCESS = 'student/POST_SUCCESS';
const GET_TEACHER_ATTENDANCE = 'student/GET_TEACHER_ATTENDANCE';
const PUT_SUCCESS = 'student/PUT_SUCCESS';
const GET_MONTH_STUDENTS_INFO = 'student/GET_MONTH_STUDENTS_INFO';

export const { student : { getStudentsInfo, postSuccess, getTeacherAttendance,
    putSuccess, getMonthStudentsInfo } } = createActions({
    [GET_STUDENTS_INFO] : result => ({ students : result.data }),
    [POST_SUCCESS] : () => ({ postSuccess: true }),
    [GET_TEACHER_ATTENDANCE] : result => ({ teacherAttendance : result.date }),
    [PUT_SUCCESS] : () => ({ putSuccess: true}),
    [GET_MONTH_STUDENTS_INFO] : result => ({ monthStudentsInfo : result.data}),
});

const attendanceReducer = handleActions({
    [GET_STUDENTS_INFO] : (state, { payload }) => payload,
    [POST_SUCCESS] : (state, { payload }) => payload,
    [GET_TEACHER_ATTENDANCE] : (state, { payload }) => payload,
    [PUT_SUCCESS] : (state, { payload }) => payload,
    [GET_MONTH_STUDENTS_INFO] : (state, { payload }) => payload,
}, initialState);

export default attendanceReducer;