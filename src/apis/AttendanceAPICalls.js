import {authRequest} from "./Api";
import {getStudents} from "../modules/AttendanceModule";

export const callMyCourseStudentListAPI = ({ cosCode }) => {

    return async (dispatch, getState) => {

        const result = await authRequest.get(`/attendance/day/${cosCode}`);

        if(result?.status === 200) {
            dispatch(getStudents(result));
        }
    }
}