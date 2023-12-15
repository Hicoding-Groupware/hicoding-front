import {authRequest} from "./Api";
import {getMessage} from "../modules/MessageModule";

/* 메인에서 가져올 진행중인 강의 */

export const callMainMessageAPI = ({messageCurrentPage }) => {

    return async (dispatch, getState) => {

        const result = await authRequest.get(`/mainMsgs?page=${messageCurrentPage}`,
            {
                headers : {
                    'Content-Type' : 'application/json'
                }
            }).catch(e => {
            console.log(e);
        });

        console.log('callMainMessageAPI result : ', result);

        if(result?.status === 200) {
            dispatch(getMessage(result));
        }
    }
}