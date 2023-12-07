
import {createActions, handleActions} from "redux-actions";

const initialState = {};

const GET_STUDENT_INFO = 'student/GET_STUDENT_INFO';

export const { student : { getStudents } } = createActions({
    [GET_STUDENT_INFO] : result => ({ students : result.data })
});

const attendanceReducer = handleActions({
    [GET_STUDENT_INFO] : (state, { payload }) => payload,
}, initialState);

export default attendanceReducer;