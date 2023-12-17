/* 초기값 */
import {createActions, handleActions} from "redux-actions";

const initialState = {
    boardPost: null,
    boardPosts: null,
    isPostAccessGranted: false,
    isPostCreationSuccessfully: false,
    newPostingReplyNo: null,
    isPostEditSuccessfully: false,
    isPostDeletionSuccessfully: false,

    postCommentList: null,
    isCommentCreationSuccessfully: false,
    isCommentEditSuccessfully: false,
    isCommentDeletionSuccessfully: false
};

// 액션 타입
const GET_POST = 'notice/GET_POST'
const GET_POSTS = 'notice/GET_POSTS'
const SET_POST_ACCESS_STATUS = 'notice/SET_POST_ACCESS_STATUS'
const SET_POST_CREATION_STATUS = 'notice/SET_POST_CREATION_STATUS'
const SET_POST_EDIT_STATUS = 'notice/SET_POST_EDIT_STATUS'
const SET_POST_DELETION_STATUS = 'notice/SET_POST_DELETION_STATUS'
const SET_POSTING_REPLY_CREATION_NO = 'notice/SET_POSTING_REPLY_CREATION_NO'

const GET_COMMENTS = 'notice/GET_COMMENTS'
const SET_COMMENT_CREATION_STATUS = 'notice/SET_COMMENT_CREATION_STATUS'
const SET_COMMENT_EDIT_STATUS = 'notice/SET_COMMENT_EDIT_STATUS'
const SET_COMMENT_DELETION_STATUS = 'notice/SET_COMMENT_DELETION_STATUS'

// 액션 함수
export const {
    notice: {
        getPost,
        getPosts,
        setPostAccessStatus,
        setPostCreationStatus,
        setPostingReplyCreationNo,
        setPostEditStatus,
        setPostDeletionStatus,

        getComments,
        setCommentCreationStatus,
        setCommentEditStatus,
        setCommentDeletionStatus
    }
} = createActions({
    [GET_POST]: result => ({boardPost: result}),
    [GET_POSTS]: result => ({boardPosts: result}),
    [SET_POST_ACCESS_STATUS]: result => ({isPostAccessGranted: result}),
    [SET_POST_CREATION_STATUS]: result => ({isPostCreationSuccessfully: result}),
    [SET_POSTING_REPLY_CREATION_NO]: result => ({newPostingReplyNo: result}),
    [SET_POST_EDIT_STATUS]: result => ({isPostEditSuccessfully: result}),
    [SET_POST_DELETION_STATUS]: result => ({isPostDeletionSuccessfully: result}),

    [GET_COMMENTS]: result => ({postCommentList: result}),
    [SET_COMMENT_CREATION_STATUS]: result => ({isCommentCreationSuccessfully: result}),
    [SET_COMMENT_EDIT_STATUS]: result => ({isCommentEditSuccessfully: result}),
    [SET_COMMENT_DELETION_STATUS]: result => ({isCommentDeletionSuccessfully: result}),
});

/* 리듀서 함수 */
export const boardReducer = handleActions({
    [GET_POST]: (state, {payload}) => payload,
    [GET_POSTS]: (state, {payload}) => payload,
    [SET_POST_ACCESS_STATUS]: (state, {payload}) => payload,
    [SET_POST_CREATION_STATUS]: (state, {payload}) => payload,
    [SET_POSTING_REPLY_CREATION_NO]: (state, {payload}) => payload,
    [SET_POST_EDIT_STATUS]: (state, {payload}) => payload,
    [SET_POST_DELETION_STATUS]: (state, {payload}) => payload,
}, initialState)

export const commentReducer = handleActions({
    [GET_COMMENTS]: (state, {payload}) => payload,
    [SET_COMMENT_CREATION_STATUS]: (state, {payload}) => payload,
    [SET_COMMENT_EDIT_STATUS]: (state, {payload}) => payload,
    [SET_COMMENT_DELETION_STATUS]: (state, {payload}) => payload,
}, initialState)
