import {getStudents, getStudentsDate} from "../modules/StudentModule";
import {request} from "./Api";


export const callStudentListAPI = ({currentPage = 1, sort}) => {

    return async (dispatch, getState) => {

        const result
            = await request('GET',`/students?page=${currentPage}&sort=${sort}`);
        console.log('callStudentListAPI result : ', result);

        if(result.status === 200) {
            dispatch(getStudents(result));
        }
    }

};

export const callStudentDateListAPI = ({startDate, endDate}) => {

    return async (dispatch, getState) => {

        const result
            = await request('GET',`/students/searchCreatedAt?startDate=${startDate}&endDate=${endDate}`);
        console.log('callStudentDateListAPI result : ', result);

        if(result.status === 200) {
            dispatch(getStudentsDate(result));
        }
    }

};

