import {authRequest, request} from "./Api";
import {getCourses} from "../modules/CourseModule";

export const callCourseListAPI = ({currentPage = 1}) => {

    return async (dispatch, getState) => {

        const result = await authRequest.get(`/courses?page=${currentPage}`);
        console.log(result);

        if(result.status === 200){
            dispatch(getCourses(result));
        }
    }
};