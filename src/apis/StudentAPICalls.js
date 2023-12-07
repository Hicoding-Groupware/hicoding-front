import {getStudentDetail, getStudents, postSuccess, putSuccess} from "../modules/StudentModule";
import {authRequest, request} from "./Api";
import {toast} from "react-toastify";


/* 학생 조회 api */
export const callStudentListAPI = ({currentPage, sort, stdName, startDate, endDate}) => {

    return async (dispatch, getState) => {

        const result
            = await authRequest.get(`/students?page=${currentPage}&sort=${sort}&stdName=${stdName}&startDate=${startDate}&endDate=${endDate}`);
        console.log('callStudentListAPI result : ', result);

        if(result.status === 200) {
            dispatch(getStudents(result));
        }
    }

};

/* 학생 등록 api */
export const callStudentRegistAPI = ({registRequest}) => {

    return async (dispatch, getState) => {

        const result = await authRequest.post('/students', JSON.stringify(registRequest), {
            headers: {
                'Content-Type': 'application/json'
            }
        });
        console.log('callStudentRegistAPI result : ', result);

        if(result.status === 201) {
            dispatch(postSuccess());
            toast.info("등록이 완료 되었습니다.");
        }

    }

}

/* 학생 상세 조회 api */
export const callStudentDetailAPI = ({stdCode}) => {

    return async (dispatch, getState) => {

        const result
            = await authRequest.get(`/student-detail/${stdCode}`);
        console.log('callStudentDetailAPI result : ', result);

        if(result.status === 200) {
            dispatch(getStudentDetail(result));
        }
    }

};

/* 학생 정보 수정 */
export const callStudentModifyAPI = ({stdCode, modifyRequest}) => {

    return async (dispatch, getState) => {

        const result = await authRequest.put(`/students/${stdCode}`, JSON.stringify(modifyRequest), {
            headers: {
                'Content-Type': 'application/json'
            }
        });
        console.log('callStudentRegistAPI result : ', result);

        if(result.status === 201) {
            dispatch(putSuccess());
            toast.info("수정이 완료 되었습니다.");
        }
    }

}