/* 초기값 */
import {createActions, handleActions} from "redux-actions";

const initialState = {};

/* 액션 타입 */
const GET_STUDENTS = 'student/GET_STUDENTS';


/* 액션 함수 */
export const { student : { getStudents, getStudentsDate } } = createActions({
    [GET_STUDENTS] : result => ({ students : result.data }),

});

/* 리듀서 */
const studentReducer = handleActions({
    [GET_STUDENTS] : (state, {payload}) => payload,
}, initialState);

export default studentReducer;