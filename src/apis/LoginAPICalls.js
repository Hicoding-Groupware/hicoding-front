import {
    loginFailure,
    loginSuccess,
    postInfo, putFailure,
    putSuccess
} from "../modules/LoginModule";
import {authRequest, request} from "./Api";
import {saveToken} from "../utils/TokenUtils";


export const callLoginAPI = ({loginRequest}) => {

    return async (dispatch, getState) => {

        const result = await request(
            'POST',
            '/login',
            {'Content-Type': 'application/json'},  //자바 문자이기때문에
            JSON.stringify(loginRequest)  //json 문자열로 바꿔준다

        );


        if (result?.status === 200) {
            const response = await request(
                'POST',
                '/member/pre/login',
                {'Content-Type': 'application/json'},  //자바 문자이기때문에
                JSON.stringify(loginRequest)  //json 문자열로 바꿔준다

            );

            console.log("response : ", response);
            const firstLogin = response.data.firstLogin;
            console.log(firstLogin);

            if (firstLogin === true){
                console.log("처음이야");
                dispatch(postInfo(response));

            }else {
                console.log("처음 아니지롱");
                console.log('callSignupAPI result : ', result);
                saveToken(result.headers);
                dispatch(loginSuccess());
            }

        } else {
            dispatch(loginFailure());

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
            console.log("됐지렁");

        }else {
            dispatch(putFailure());
            console.log("실패지렁");
        }



    }

}


export const InfoUpdateWithoutPasswordAPI =({InfoUpdateWithoutPasswordRequest}) => {
    return async (dispatch, getState) => {

        const response = await request(
            'PUT',
            '/member/memberInfowithoutPassword',
            {'Content-Type': 'application/json'},  //자바 문자이기때문에
            JSON.stringify(InfoUpdateWithoutPasswordRequest)  //json 문자열로 바꿔준다

        );

        console.log("response",response);
        if (response.status === 201){
            dispatch(putSuccess());
            console.log("됐지렁");
        }else {
            dispatch(putFailure());
            console.log("실패지렁");
        }



    }

}




