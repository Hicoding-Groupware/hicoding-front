
import {createActions, handleActions} from "redux-actions";

const initialState = {};

const GET_STUDENTS = 'student/GET_STUDENTS';
const POST_SUCCESS = 'student/POST_SUCCESS';

export const { student : { getStudents, postSuccess } } = createActions({
    [GET_STUDENTS] : result => ({ students : result.data }),
    [POST_SUCCESS] : () => ({ postSuccess: true })
});

const attendanceReducer = handleActions({
    [GET_STUDENTS] : (state, { payload }) => payload,
    [POST_SUCCESS] : (state, { payload }) => payload,
}, initialState);

export default attendanceReducer;