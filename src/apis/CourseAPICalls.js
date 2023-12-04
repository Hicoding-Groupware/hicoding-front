import {request} from "./Api";
import {getCourses} from "../modules/CourseModule";

export const callCourseListAPI = ({currentPage = 1}) => {

    return async (dispatch, getState) => {

        const result = await request('GET', `/courses?page=${currentPage}`);
        console.log(result);

        if(result.status == 200){
            dispatch(getCourses(result));
        }
    }
};