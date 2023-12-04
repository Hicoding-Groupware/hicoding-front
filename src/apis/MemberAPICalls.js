
import { creationSuccess, creationFailure } from '../modules/MemberModule'
import {request} from "./Api";
import {toast} from "react-toastify";

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