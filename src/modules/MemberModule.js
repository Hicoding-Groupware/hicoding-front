
/* 초기값 */
import {createActions, handleActions} from "redux-actions";

const initialState = {};

// 액션 타입
const CREATION_SUCCESS = 'member/CREATION_SUCCESS'
const CREATION_FAILURE = 'member/CREATION_FAILURE'

// 액션 함수
export const { member : {creationSuccess, creationFailure} } = createActions({
    [CREATION_SUCCESS] : (result) => ({ memberInfos : result }),
    [CREATION_FAILURE] : () => ({creationSuccess}),
});

/* 리듀서 함수 */
const memberReducer = handleActions({
    [CREATION_SUCCESS] : ( state, { payload } ) => payload,
    [CREATION_FAILURE] : ( state, { payload } ) => payload,

}, initialState)


export default memberReducer;