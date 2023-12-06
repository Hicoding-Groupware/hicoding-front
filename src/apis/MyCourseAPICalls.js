import {authRequest} from "./Api";
import {getCourses, getDetailCourse} from "../modules/MyCourseModule";



export const callMyCourseListAPI = ({currentPage }) => {

    return async (dispatch, getState) => {

        const result = await authRequest.get(`/hc-app/v1/lecture/progress?page=${currentPage}`,
            {
                headers : {
                    'Content-Type' : 'application/json'
                }
            }).catch(e => {
            console.log(e);
        });

        console.log('callMyCourseListAPI result : ', result);

        if(result?.status === 200) {
            dispatch(getCourses(result));
        }
    }
}


export const callLastMyCourseListAPI = ({currentPage }) => {

    return async (dispatch, getState) => {

        const result = await authRequest.get(`/hc-app/v1/lecture/last?page=${currentPage}`,
            {
                headers : {
                    'Content-Type' : 'application/json'
                }
            }).catch(e => {
            console.log(e);
        });

        console.log('callLastMyCourseListAPI result : ', result);

        if(result?.status === 200) {
            dispatch(getCourses(result));
        }
    }
}


export const callScheduledMyCourseListAPI = ({ currentPage }) => {

    return async (dispatch, getState) => {

        const result = await authRequest.get(`/hc-app/v1/lecture/scheduled?page=${currentPage}`,
            {
                headers : {
                    'Content-Type' : 'application/json'
                }
            }).catch(e => {
            console.log(e);
        });

        console.log('callScheduledMyCourseListAPI result : ', result);

        if(result?.status === 200) {
            dispatch(getCourses(result));
        }
    }
}


export const callDailyAttendanceAPI = ({ cosCode }) => {

    return async (dispatch, getState) => {

        const result = await authRequest.get(`/hc-app/v1/attendance/day/${cosCode}`);

        if(result?.status === 200) {
            dispatch(getDetailCourse(result)); // 임시
        }
    }
}