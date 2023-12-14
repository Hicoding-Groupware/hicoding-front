
import {createActions, handleActions} from "redux-actions";

const initialState = {};

const GET_STUDENTS_INFO = 'student/GET_STUDENTS_INFO';
const POST_SUCCESS = 'student/POST_SUCCESS';

export const { student : { getStudentsInfo, postSuccess } } = createActions({
    [GET_STUDENTS_INFO] : result => ({ students : result.data }),
    [POST_SUCCESS] : () => ({ postSuccess: true })
});

const attendanceReducer = handleActions({
    [GET_STUDENTS_INFO] : (state, { payload }) => payload,
    [POST_SUCCESS] : (state, { payload }) => payload,
}, initialState);

export default attendanceReducer;