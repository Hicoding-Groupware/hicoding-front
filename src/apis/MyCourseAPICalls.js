import {authRequest} from "./Api";
import {getCourses} from "../modules/MyCourseModule";


/* 진행중인 강의 */
export const callMyCourseListAPI = ({ currentPage }) => {

    return async (dispatch, getState) => {

        const result = await authRequest.get(`/lecture/progress?page=${currentPage}`);

        console.log('callMyCourseListAPI result : ', result);

        if(result?.status === 200) {
            dispatch(getCourses(result));
        }
    }
}

/* 지난 강의 */
export const callLastMyCourseListAPI = ({currentPage }) => {

    return async (dispatch, getState) => {

        const result = await authRequest.get(`/lecture/last?page=${currentPage}`);

        console.log('callLastMyCourseListAPI result : ', result);

        if(result?.status === 200) {
            dispatch(getCourses(result));
        }
    }
}

/* 예정 강의 */
export const callScheduledMyCourseListAPI = ({ currentPage }) => {

    return async (dispatch, getState) => {

        const result = await authRequest.get(`/lecture/scheduled?page=${currentPage}`);

        console.log('callScheduledMyCourseListAPI result : ', result);

        if(result?.status === 200) {
            dispatch(getCourses(result));
        }
    }
}


/* 메인에서 가져올 진행중인 강의 */
export const callToMainMyCourseListAPI = ({currentPage }) => {

    return async (dispatch, getState) => {

        const result = await authRequest.get(`/lecture/mainProgress?page=${currentPage}`,
            {
                headers : {
                    'Content-Type' : 'application/json'
                }
            }).catch(e => {
            console.log(e);
        });

        console.log('callToMainMyCourseListAPI result : ', result);

        if(result?.status === 200) {
            dispatch(getCourses(result));
        }
    }
}