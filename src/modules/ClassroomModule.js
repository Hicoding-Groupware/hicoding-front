import {createActions, handleActions} from "redux-actions";

const initialState = {};

const GET_CLASSROOMS = 'classroom/GET_CLASSROOMS';

export  const {classroom : {getClassrooms}} = createActions({
    [GET_CLASSROOMS] : result => ({classrooms : result.data})
});

const classroomReducer = handleActions({
    [GET_CLASSROOMS] : (state, {payload}) => payload
}, initialState);

export default classroomReducer;