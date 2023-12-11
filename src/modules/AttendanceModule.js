
import {createActions, handleActions} from "redux-actions";

const initialState = {};

const GET_STUDENTS = 'student/GET_STUDENTS';

export const { student : { getStudents } } = createActions({
    [GET_STUDENTS] : result => ({ students : result.data })
});

const attendanceReducer = handleActions({
    [GET_STUDENTS] : (state, { payload }) => payload,
}, initialState);

export default attendanceReducer;