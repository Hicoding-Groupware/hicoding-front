import {authRequest, request} from "./Api";
import {getLectures} from "../modules/LectureModule";

export const callLectureListAPI = ({currentPage = 1}) => {

    return async (dispatch, getState) => {

        const result = await authRequest.get(`/lectures?page=${currentPage}`);

        console.log(result);

        if(result.status === 200){
            dispatch(getLectures(result));
        }
    }
};
