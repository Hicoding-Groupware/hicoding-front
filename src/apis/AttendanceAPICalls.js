import {authRequest} from "./Api";
import {getStudentsInfo, getTeacherAttendance, postSuccess, putSuccess} from "../modules/AttendanceModule";
import {toast} from "react-toastify";
import {post} from "axios";


/* 일별 조회 */
export const callMyCourseStudentListAPI = ({cosCode, atdDate}) => {

    return async (dispatch, getState) => {

        let url = `/attendance/day/${cosCode}`;

        if (atdDate) {
            url += `?atdDate=${atdDate}`;
        }

        const result = await authRequest.get(url);

        console.log("result : ", result);

        if (result?.status === 200) {
            dispatch(getStudentsInfo(result));
        }
    }
}


/* 출석 등록 */
export const callAttendanceRegistAPI = ({registRequest}) => {

    return async (dispatch, getState) => {

        const result = await authRequest.post(`/attendance/day`, registRequest,
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
        console.log("registRequest : ", registRequest);
        console.log('callAttendanceRegistAPI result : ', result);

        if (result?.status === 200) {
            dispatch(postSuccess());
        }
    }
}


/* 출석 수정 */
export const callAttendanceUpdateAPI = ({updateRequest, atdDate}) => {

    console.log("atdDate : ", atdDate); // undefined
    return async (dispatch, getState) => {

        const result = await authRequest.put(`/attendance/day/${atdDate}`, updateRequest,
            {
                headers: {
                    'Content-Type': 'application/json'
                }
            }).catch(e => {
            if (e.response.status === 4001) {
                toast.error("해당하는 과정이 없습니다.");
            } else if (e.response.status === 5000) {
                toast.error("해당 학생은 이 과정을 듣지 않습니다.");
            } // 나중에 다시 체크 ---------------------------------
        });
        console.log("updateRequest : ", updateRequest);
        console.log('callAttendanceUpdateAPI result : ', result);

        if (result?.status === 200) {
            dispatch(getTeacherAttendance(result));
            dispatch(putSuccess());
        }
    }
}
