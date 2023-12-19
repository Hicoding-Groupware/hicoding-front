import {authRequest} from "./Api";
import {getCourse, getCourselist, getCourses, postSuccess, putSuccess} from "../modules/CourseModule";

export const callAllCoursesAPI = () => {

    return async (dispatch, getState) => {

        const result = await authRequest.get('/courses');

        console.log(result);

        if(result.status === 200) {
            dispatch(getCourselist(result));
        }
    }
};

export const callCourseListAPI = ({currentPage = 1}) => {

    return async (dispatch, getState) => {

        const result =  await authRequest.get(`/courses-proceeding?page=${currentPage}`);
        console.log(result);

        if(result.status === 200){
            dispatch(getCourses(result));
        }
    }
};

export const callExpectedCourseListAPI = ({currentPage = 1}) => {

    return async (dispatch, getState) => {

        const result =  await authRequest.get(`/courses-expected?page=${currentPage}`);
        console.log(result);

        if(result.status === 200){
            dispatch(getCourses(result));
        }
    }
};

export const callCourseDetailAPI = ({cosCode}) => {

    return async (dispatch, getState) => {

        const result = await authRequest.get(`/courses/${cosCode}`);

        if(result.status === 200) {
            dispatch(getCourse(result));
        }

    }
};


export const callCourseRegistAPI = ({registRequest}) => {

    return async (dispatch, getState) => {

        const result = await authRequest.post('/courses', JSON.stringify(registRequest), {
            headers: {
                'Content-Type': 'application/json'
            }
        });


        if (result.status === 201) {
            dispatch(postSuccess());
        }
    }
}

export const callCourseModifyAPI = ({cosCode, modifyRequest }) => {

    return async (dispatch, getState) => {

        const result = await authRequest.put(`/courses/${cosCode}`, modifyRequest);
        console.log('callAdminProductModifyAPI result : ', result);

        if(result.status === 201) {
            dispatch(putSuccess());
            alert("과정이 수정되었습니다.")
        }

    }
}

export const callCourseRemoveAPI = ({cosCode}) => {

    return async (dispatch, getState) => {

        const result = await authRequest.delete(`/courses/${cosCode}`);

        if(result.status === 204) {
            window.location.replace("/courses/proceeding");
            alert("과정이 삭제되었습니다");
        }

    }
}