import {request} from "./Api";
import {getCourses} from "../modules/CourseModule";

export const callCourseListAPI = ({ currentPage = 1}) => {

    return async (dispatch, getState) => {

        const result = await request('GET', `/hc-app/v1/myLecture/inProgress=${currentPage}`);
        console.log('callCourseListAPI result : ', result);

        if(result.status === 200) {
            dispatch(getCourses(result));
        }
    }
};