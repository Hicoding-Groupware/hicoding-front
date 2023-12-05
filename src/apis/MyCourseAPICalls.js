import {authRequest, request} from "./Api";
import {getCourses, getDetailCourse} from "../modules/MyCourseModule";


export const callMyCourseListAPI = ({currentPage }) => {

    return async (dispatch, getState) => {

        const result = await authRequest.get(`/hc-app/v1/my_lecture/in_progress?page=${currentPage}`,
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

        const result = await authRequest.get(`/hc-app/v1/my_lecture/last_lecture?page=${currentPage}`,
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

        const result = await authRequest.get(`/hc-app/v1/my_lecture/scheduled_lecture?page=${currentPage}`,
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

export const callCourseDetailAPI = ({ cosCode }) =>  {

    return async (dispatch, getState) => {

        const result = await authRequest.get(`/hc-app/v1/my_lecture/detail_info/${cosCode}`,
            {
                headers : {
                    'Content-Type' : 'application/json'
                }
            }).catch(e => {
                console.log(e);
        });

        console.log('callCourseDetailAPI result : ', result);

        if(result?.status === 200) {
            dispatch(getDetailCourse(result));
        }
    }

}