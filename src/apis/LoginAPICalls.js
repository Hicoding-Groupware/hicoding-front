import {
    getSuccess,
    loginSuccess,
    postInfo, putFailure,
    putSuccess
} from "../modules/LoginModule";
import {authRequest, request} from "./Api";
import {saveToken} from "../utils/TokenUtils";
import {toast} from "react-toastify";


export const callLoginAPI = ({loginRequest}) => {

    return async (dispatch, getState) => {



            const result = await request(
                'POST',
                '/login',
                {'Content-Type': 'application/json'},  //자바 문자이기때문에
                JSON.stringify(loginRequest)  //json 문자열로 바꿔준다

            ).catch((error) => {
                if (error.response && error.response.status === 401) {

                    toast.warning('인증에 실패했습니다. 올바른 사용자 이름과 비밀번호를 입력하세요.');
                }
            });

            console.log("callLoginAPI : ", result);


            if (result?.status === 200) {
                const response = await request(
                    'POST',
                    '/member/pre/login',
                    {'Content-Type': 'application/json'},  //자바 문자이기때문에
                    JSON.stringify(loginRequest)  //json 문자열로 바꿔준다

                );

                const firstLogin = response.data.firstLogin;

                if (firstLogin === true) {

                    dispatch(postInfo(response));

                } else {

                    saveToken(result.headers);
                    dispatch(loginSuccess());
                }
            }




    }

}

/* 첫로그인 정보 수정 */
export const InfoFirstLoginUpdateAPI =({InfoUpdateRequest}) => {
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










/* 프로필에서 비밀번호 수정 */
export const InfoUpdateAPI =({InfoUpdateRequest}) => {
    return async (dispatch, getState) => {

        const result = await authRequest.post('/member/memberPassword', InfoUpdateRequest);
        console.log('InfoUpdateAPI result : ', result);


        if (result.data === true){
            alert("현 비밀번호와 같습니다.")
        }else {
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





export const MemberAllAPI =() => {
    return async (dispatch, getState) => {

        const result = await request(
            'GET',
            '/member/all',
            {'Content-Type': 'application/json'},  //자바 문자이기때문에

        );

        console.log("MemberAllAPI : ",result);
        if (result.status === 200){
            dispatch(getSuccess(result));
            console.log("전체 나왔다");
        }else {
            console.log("안나오네");
        }



    }

}





