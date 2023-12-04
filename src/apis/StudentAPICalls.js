import {getStudents, getStudentsDate} from "../modules/StudentModule";
import {request} from "./Api";


export const callStudentListAPI = ({sort, stdName, startDate, endDate}) => {

    return async (dispatch, getState) => {

        const result
            = await request('GET',`/students?sort=${sort}&stdName=${stdName}&startDate=${startDate}&endDate=${endDate}`);
        console.log('callStudentListAPI result : ', result);

        if(result.status === 200) {
            dispatch(getStudents(result));
        }
    }

};



