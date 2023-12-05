import {getStudents, postSuccess} from "../modules/StudentModule";
import {authRequest, request} from "./Api";
import {toast} from "react-toastify";


/* 학생 조회 api */
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

/* 학생 등록 api */
export const callStudentRegistAPI = ({registRequest}) => {

    return async (dispatch, getState) => {

        const result = await authRequest.post('/students', registRequest);
        console.log('callStudentRegistAPI result : ', result);

        if(result.status === 201) {
            dispatch(postSuccess());
            toast.info("등록이 완료 되었습니다.");
        }
    }

}



