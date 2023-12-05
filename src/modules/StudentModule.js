/* 초기값 */
import {createActions, handleActions} from "redux-actions";

const initialState = {};

/* 액션 타입 */
const GET_STUDENTS = 'student/GET_STUDENTS';
const POST_SUCCESS = 'student/POST_SUCCESS';


/* 액션 함수 */
export const { student : { getStudents, getStudentsDate, postSuccess } } = createActions({
    [GET_STUDENTS] : result => ({ students : result.data }),
    [POST_SUCCESS] : () => ({ postSuccess : true }),

});

/* 리듀서 */
const studentReducer = handleActions({
    [GET_STUDENTS] : (state, { payload }) => payload,
    [POST_SUCCESS] : (state, { payload }) => payload,
}, initialState);

export default studentReducer;