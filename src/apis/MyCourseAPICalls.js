import {authRequest} from "./Api";
import {getCourses} from "../modules/MyCourseModule";



export const callMyCourseListAPI = ({ currentPage }) => {

    return async (dispatch, getState) => {

        const result = await authRequest.get(`/lecture/progress?page=${currentPage}`);

        console.log('callMyCourseListAPI result : ', result);

        if(result?.status === 200) {
            dispatch(getCourses(result));
        }
    }
}


export const callLastMyCourseListAPI = ({currentPage }) => {

    return async (dispatch, getState) => {

        const result = await authRequest.get(`/lecture/last?page=${currentPage}`);

        console.log('callLastMyCourseListAPI result : ', result);

        if(result?.status === 200) {
            dispatch(getCourses(result));
        }
    }
}


export const callScheduledMyCourseListAPI = ({ currentPage }) => {

    return async (dispatch, getState) => {

        const result = await authRequest.get(`/lecture/scheduled?page=${currentPage}`);

        console.log('callScheduledMyCourseListAPI result : ', result);

        if(result?.status === 200) {
            dispatch(getCourses(result));
        }
    }
}
