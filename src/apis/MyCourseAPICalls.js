import {authRequest, request} from "./Api";
import {getCourses} from "../modules/MyCourseModule";


export const callCourseListAPI = ({ currentPage }) => {

    return async (dispatch, getState) => {

        const result = await authRequest.get(`/in_progress?page=${currentPage}`,
            {
                headers : {
                    'Content-Type' : 'application/json'
                }
            }).catch(e => {
            console.log(e);
        });

        console.log('callCourseAPI result : ', result);

        if(result?.status === 200) {
            dispatch(getCourses(result));
        }
    }
}