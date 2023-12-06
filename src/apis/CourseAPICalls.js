import {request} from "./Api";
import {getCourse, getCourses} from "../modules/CourseModule";

export const callCourseListAPI = ({currentPage = 1}) => {

    return async (dispatch, getState) => {

        const result = await request('GET', `/courses?page=${currentPage}`);
        console.log(result);

        if(result.status === 200){
            dispatch(getCourses(result));
        }
    }
};

export const callCourseDetailAPI = ({cosCode}) => {

    return async (dispatch, getState) => {

        const result = await request('GET', `/courses/${cosCode}`);
        console.log('callProductDetailAPI result : ', result);

        if(result.status === 200) {
            dispatch(getCourse(result));
        }

    }
};

// export const callCourseRegistAPI =({ registRequest }) => {
//
//     return async (dispatch, getState) => {
//
//         const result = await authRequest.post('/api/v1/products', registRequest);
//
//         if (result.status === 201) {
//             dispatch(postSuccess());
//         }
//     }
// }
