import {authRequest, request} from "./Api";
import {getLecture, getLectures, postSuccess, putSuccess} from "../modules/LectureModule";

export const callLectureListAPI = ({currentPage = 1}) => {

    return async (dispatch, getState) => {

        const result = await authRequest.get(`/lectures?page=${currentPage}`);

        console.log(result);

        if(result.status === 200){
            dispatch(getLectures(result));
        }
    }
};

export const callLectureDetailAPI = ({lecCode}) => {

    return async (dispatch, getState) => {

        const result = await authRequest.get(`/lectures/${lecCode}`);

        if(result.status === 200) {
            dispatch(getLecture(result));
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
            window.location.replace("/lecture");
            dispatch(postSuccess());
        }
    }
}

export const callLectureModifyAPI = ({lecCode, modifyRequest }) => {

    return async (dispatch, getState) => {

        const result = await authRequest.put(`/lectures/${lecCode}`, modifyRequest);
        console.log('callAdminProductModifyAPI result : ', result);

        if(result.status === 201) {
            dispatch(putSuccess())
            window.location.replace("/lecture");
            alert("과정이 수정되었습니다.")
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
