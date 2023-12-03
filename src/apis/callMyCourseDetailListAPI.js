import {authRequest, request} from "./Api";
import {getCourses} from "../modules/MyCourseModule";


export const callMyCourseDetailListAPI = ({ currentPage }) => {

    return async (dispatch, getState) => {

        const result = await authRequest.get(`/hc-app/v1/my_lecture/detail_info?page=${currentPage}`,
            {
                headers : {
                    'Content-Type' : 'application/json'
                }
            }).catch(e => {
            console.log(e);
        });

        console.log('callMyCourseDetailListAPI result : ', result);

        if(result?.status === 200) {
            dispatch(getCourses(result));
        }
    }
}