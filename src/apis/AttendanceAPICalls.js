import {authRequest} from "./Api";
import {getStudents, postSuccess} from "../modules/AttendanceModule";
import {toast} from "react-toastify";


/* 일별 조회 */
export const callMyCourseStudentListAPI = ({cosCode}) => {

    return async (dispatch, getState) => {

        const result = await authRequest.get(`/attendance/day/${cosCode}`);

        console.log("result : ", result);

        if (result?.status === 200) {
            dispatch(getStudents(result));
        }
    }
}


/* 출석 등록 */
export const callAttendanceRegistAPI = ({ registRequest }) => {

    return async (dispatch, getState) => {

        const result = await authRequest.post(`/attendance/day`,
            JSON.stringify(registRequest= []),
            {
                headers: {
                    'Content-Type': 'application/json'
                }
            }).catch(e => {
            if (e.response.status === 6001) {
                toast.error("이 과정을 듣지 않는 학생입니다.");
            } else if (e.response.status === 6002) {
                toast.error("이미 출석이 완료 되었습니다.");
            }
        }); // 나중에 다시 체크해야 함--------------------- 에러코드

        console.log('callAttendanceRegistAPI result : ', result);

        if(result?.status === 201) {
            dispatch(postSuccess());
        }
    }
}

