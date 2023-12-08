import {authRequest, request} from "./Api";
import {getCourse, getCourses, getMembers, postSuccess} from "../modules/CourseModule";

export const callCourseListAPI = ({currentPage = 1}) => {

    return async (dispatch, getState) => {

        const result =  await authRequest.get(`/courses?page=${currentPage}`);
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

export const callCourseRemoveAPI = ({cosCode}) => {

    return async (dispatch, getState) => {

        const result = await authRequest.delete(`/courses/${cosCode}`);

        if(result.status === 204) {
            window.location.replace("/courses");
            alert("과정이 삭제되었습니다");
        }

    }
}