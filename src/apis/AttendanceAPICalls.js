import {authRequest} from "./Api";
import {getStudents} from "../modules/AttendanceModule";

export const callMyCourseStudentListAPI = ({cosCode}) => {

    return async (dispatch, getState) => {
        console.log("cosCode before API request:", cosCode); // 콘솔 로그 추가

        const result = await authRequest.get(`/attendance/day/${cosCode}`,
            {
                headers: {
                    'Content-Type': 'application/json'
                }
            }).catch(e => {
            console.log(e);
        });
console.log("result : ", result);
        if (result?.status === 200) {
            dispatch(getStudents(result));
        }
    }
}