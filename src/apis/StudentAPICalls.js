import {getStudents} from "../modules/StudentModule";
import {request} from "./Api";


export const callStudentListAPI = ({currentPage = 1}) => {

    return async (dispatch, getState) => {

        const result
            = await request('GET',`/students?page=${currentPage}`);
        console.log('callStudentListAPI result : ', result);

        if(result.status === 200) {
            dispatch(getStudents(result));
        }
    }

};


