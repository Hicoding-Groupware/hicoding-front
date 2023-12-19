
/* 초기값 */
import {createActions, handleActions} from "redux-actions";

const initialState = {
    convertedMemberRole: {isSuccessful: false, roleNo: '00'}
};

// 액션 타입
const CREATION_SUCCESS = 'member/CREATION_SUCCESS'
const CREATION_FAILURE = 'member/CREATION_FAILURE'
const INQUIRY_SUCCESS = 'member/INQUIRY_SUCCESS'
const INQUIRY_FAILURE = 'member/INQUIRY_FAILURE'
const GET_MEMBERLIST = 'member/GET_MEMBERLIST'
const GET_PROFILE = 'member/GET_PROFILE';
const GET_MEMBER_ROLE = 'member/GET_MEMBER_ROLE';

// 액션 함수
export const { member : {creationSuccess, creationFailure, inquirySuccess, inquiryFailure, getProfile, getMemberRole,getMemberlist} } = createActions({
    [CREATION_SUCCESS] : (result) => ({ creationInfos : result }),
    [CREATION_FAILURE] : () => ({creationSuccess}),
    [INQUIRY_SUCCESS] : (result) => ({ inquiryInfos : result }),
    [INQUIRY_FAILURE] : (result) => ({ inquiryFailure : result }),
    [GET_MEMBERLIST] : result => ({memberlist : result.data}),
    [GET_PROFILE] : (result) => ({ profileInfo : result.data }),
    [GET_MEMBER_ROLE] : (result) => ({ convertedMemberRole : result }),
});

/* 리듀서 함수 */
export const memberReducer = handleActions({
    [CREATION_SUCCESS] : ( state, { payload } ) => ({...state, ...payload}),
    [CREATION_FAILURE] : ( state, { payload } ) => ({...state, ...payload}),
    [INQUIRY_SUCCESS] : ( state, { payload } ) => payload,
    [INQUIRY_FAILURE] : ( state, { payload } ) => payload,
    [GET_MEMBERLIST] : (state, {payload}) => payload,
    [GET_PROFILE] : (state, { payload }) => ({...state, ...payload}),
}, initialState)

export const memberRoleReducer = handleActions({
    [GET_MEMBER_ROLE] : (state, { payload }) => payload,
}, initialState)