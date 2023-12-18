import {authRequest, request} from "./Api";
import {getLectures, postSuccess} from "../modules/LectureModule";

export const callLectureListAPI = ({currentPage = 1}) => {

    return async (dispatch, getState) => {

        const result = await authRequest.get(`/lectures?page=${currentPage}`);

        console.log(result);

        if(result.status === 200){
            dispatch(getLectures(result));
        }
    }
};

export const callLectureRegistAPI = ({registRequest}) => {

    return async (dispatch, getState) => {

        const result = await authRequest.post('/lectures', JSON.stringify(registRequest), {
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (result.status === 201) {
            dispatch(postSuccess());
        }
    }
}

export const callLectureRemoveAPI = ({lecCode}) => {

    return async (dispatch, getState) => {

        const result = await authRequest.delete(`/lectures/${lecCode}`);

        if(result.status === 204) {
            window.location.replace("/lecture");
            alert("강의가 삭제되었습니다");
        }

    }
}
