
/* 초기값 */
import {createActions, handleActions} from "redux-actions";
import {callMemberInquiryAPI} from "../apis/MemberAPICalls";

const initialState = {};

// 액션 타입
const CREATION_SUCCESS = 'member/CREATION_SUCCESS'
const CREATION_FAILURE = 'member/CREATION_FAILURE'
const INQUIRY_SUCCESS = 'member/INQUIRY_SUCCESS'
const INQUIRY_FAILURE = 'member/INQUIRY_FAILURE'

// 액션 함수
export const { member : {creationSuccess, creationFailure, inquirySuccess, inquiryFailure} } = createActions({
    [CREATION_SUCCESS] : (result) => ({ creationInfos : result }),
    [CREATION_FAILURE] : () => ({creationSuccess}),
    [INQUIRY_SUCCESS] : (result) => ({ inquiryInfos : result }),
    [INQUIRY_FAILURE] : (result) => ({ inquiryFailure : result }),
});

/* 리듀서 함수 */
const memberReducer = handleActions({
    [CREATION_SUCCESS] : ( state, { payload } ) => payload,
    [CREATION_FAILURE] : ( state, { payload } ) => payload,
    [INQUIRY_SUCCESS] : ( state, { payload } ) => payload,
    [INQUIRY_FAILURE] : ( state, { payload } ) => payload,

}, initialState)


export default memberReducer;