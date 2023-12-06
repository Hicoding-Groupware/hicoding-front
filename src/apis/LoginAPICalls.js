import {loginFailure, loginSuccess, postInfo, putSuccess} from "../modules/LoginModule";
import {request} from "./Api";
import {saveToken} from "../utils/TokenUtils";


export const callLoginAPI = ({loginRequest}) => {

    return async (dispatch, getState) => {

        const response = await request(
            'POST',
            '/member/pre/login',
            {'Content-Type': 'application/json'},  //자바 문자이기때문에
            JSON.stringify(loginRequest)  //json 문자열로 바꿔준다

        );
        console.log("response : ", response);

        const firstLogin = response.data.firstLogin;


        console.log(firstLogin);

       if (firstLogin == true){
           console.log("처음이야");
           dispatch(postInfo(response));

       }else {
           console.log("처음 아니지롱");
           const result = await request(
               'POST',
               '/login',
               {'Content-Type': 'application/json'},  //자바 문자이기때문에
               JSON.stringify(loginRequest)  //json 문자열로 바꿔준다

           );
           console.log('callSignupAPI result : ', result);
           if (result?.status === 200) {
               saveToken(result.headers);
               dispatch(loginSuccess());
           } else {
               dispatch(loginFailure());

           }
       }

    }

}

export const InfoUpdateAPI =({InfoUpdateRequest}) => {
    return async (dispatch, getState) => {

        const response = await request(
            'PUT',
            '/member/memberInfo',
            {'Content-Type': 'application/json'},  //자바 문자이기때문에
            JSON.stringify(InfoUpdateRequest)  //json 문자열로 바꿔준다

        );

        console.log("response",response);
        if (response.status === 201){
           dispatch(putSuccess());
        }



    }

}