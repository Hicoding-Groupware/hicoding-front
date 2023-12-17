
/* 초기값 */
import {createActions, handleActions} from "redux-actions";

const initialState = {};

// 액션 타입
const CREATION_SUCCESS = 'member/CREATION_SUCCESS'
const CREATION_FAILURE = 'member/CREATION_FAILURE'
const INQUIRY_SUCCESS = 'member/INQUIRY_SUCCESS'
const INQUIRY_FAILURE = 'member/INQUIRY_FAILURE'
const GET_PROFILE = 'member/GET_PROFILE';

// 액션 함수
export const { member : {creationSuccess, creationFailure, inquirySuccess, inquiryFailure, getProfile} } = createActions({
    [CREATION_SUCCESS] : (result) => ({ creationInfos : result }),
    [CREATION_FAILURE] : () => ({creationSuccess}),
    [INQUIRY_SUCCESS] : (result) => ({ inquiryInfos : result }),
    [INQUIRY_FAILURE] : (result) => ({ inquiryFailure : result }),
    [GET_PROFILE] : (result) => ({ profileInfo : result.data }),
});

/* 리듀서 함수 */
const memberReducer = handleActions({
    [CREATION_SUCCESS] : ( state, { payload } ) => payload,
    [CREATION_FAILURE] : ( state, { payload } ) => payload,
    [INQUIRY_SUCCESS] : ( state, { payload } ) => payload,
    [INQUIRY_FAILURE] : ( state, { payload } ) => payload,
    [GET_PROFILE] : (state, { payload }) => payload,

}, initialState)


export default memberReducer;