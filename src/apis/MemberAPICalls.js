
import {
    creationSuccess,
    creationFailure,
    inquirySuccess,
    inquiryFailure,
    getProfile,
    getMemberlist
} from '../modules/MemberModule'
import {authRequest, request} from "./Api";
import {toast} from "react-toastify";
import async from "async";
import {postSuccess, putSuccess} from "../modules/LoginModule";

export const MEMBER_PATH = '/member'

export const callMemberCreationAPI = ({creationRequest}) => {

    return async (dispatch, getState) => {
        const result = await request(
            'POST',
            MEMBER_PATH,
            {'Content-Type' : 'application/json'},
            JSON.stringify(creationRequest)
        )

        console.log('callCreationAPI result : ', result)

        if(result?.status === 200) {
            console.log(result.data)
            dispatch(creationSuccess(result.data))
        } else {
            dispatch(creationFailure())
            toast.warning("직원 생성에 실패하였습니다. 다시 시도해 주세요.");
        }
    }
}

export const callMemberInquiryAPI = ( {inquiryRequest: {id, name, gender, role, status, joinedAt, endedAt} }) => {

    const reqParam= `/?id=${id}&name=${name}&gender=${gender}&role=${role}&status=${status}&joinedAt=${joinedAt}&endedAt=${endedAt}`

    return async (dispatch, getState) => {
        const result = await request(
            'GET',
            `${MEMBER_PATH}${reqParam}`,
            null,
            null
        )

        console.log('callInquiryAPI result : ', result)

        if(result?.status === 200) {
            console.log(result.data)
            dispatch(inquirySuccess(result.data))
        } else {
            dispatch(inquiryFailure())
            //toast.warning("직원 생성에 실패하였습니다. 다시 시도해 주세요.");
        }
    }
}


/* --    -------------- -------- 민서  ------------------------------------------------------*/

export const callMemberProfileAPI = () => {

    return async (dispatch, getState) => {

        const result = await authRequest.get("/member/profile");
        console.log('callMemberAPI result : ', result);

        if(result.status === 200) {
            dispatch(getProfile(result));
        }

    }
}

export const InfoUpdateProfileAPI = ({registRequest}) => {

    return async (dispatch, getState) => {

        const result = await authRequest.post('/member/img', registRequest);
        console.log('InfoUpdateProfileAPI result : ', result);

        if(result.status === 201) {
            dispatch(postSuccess());
            console.log("나왔따");

        }

    }
}

export const callMemberProfileModifyAPI = ({registRequest}) => {
    return async (dispatch, getState) => {
        const result = await authRequest.put('/member/memberProfile', registRequest);
        console.log('callMemberProfileModifyAPI result : ', result);

        if (result.status === 201){
            dispatch(putSuccess());
            console.log("앗싸 수정 완료");
        }
    }
}

export const callMemberProfileRemoveAPI = () => {
    return async (dispatch, getState) => {
        const result = await authRequest.delete("/member/deleteProfile");
        console.log('callMemberProfileRemoveAPI : ', result);

        if (result.status ===204){
            alert("기본이미지로 변경 되었습니다.");
            window.location.replace("/profile");
        }
    }
}

//동한
export const callMemberListAPI = () => {

    return async (dispatch, getState) => {

        const result = await authRequest.get(`/member/memberList`);

        if(result.status === 200){
            dispatch(getMemberlist(result));
        }
    }
};