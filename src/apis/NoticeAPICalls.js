import {request} from "./Api";
import {
    getComments,
    getPost,
    getPosts, setCommentCreationStatus,
    setCommentDeletionStatus,
    setCommentEditStatus,
    setPostAccessStatus, setPostCreationStatus, setPostDeletionStatus, setPostEditStatus, setPostingReplyCreationNo
} from "../modules/NoticeModule";

export const BOARD_PATH = '/board'
export const COMMENT_PATH = '/comment'

export const callPostAPI = ({role, postNo, recordType, memberNo}) => {
    const reqParam = `/${role}/${postNo}/${recordType}/${memberNo}`;

    console.log(reqParam);

    return async (dispatch, getState) => {
        const result = await request(
            'GET',
            `${BOARD_PATH}${reqParam}`,
            null,
            null
        );

        if (result?.status === 201) {
            console.log('callBoardPostAPI result : ', result);
            dispatch(getPost(result.data));
        } else {
            console.log("boardPostAPI 거부");
        }
    };
};

export const callPostListAPI = ({role, currPage = 1}) => {
    const reqParam = `/${role}?requestPage=${currPage}`

    return async (dispatch, getState) => {
        const result = await request(
            'GET',
            `${BOARD_PATH}${reqParam}`,
            null,
            null
        )

        if (result?.status === 200) {
            console.log('callBoardPostListAPI result : ', result)
            dispatch(getPosts(result.data))
        } else {
            console.log("boardPostList Call Fail")
        }
    }
}

export const callAccessToPostAPI = ({role, postNo, recordType, memberNo}) => {
    const reqParam = `/${role}/${postNo}/${recordType}/${memberNo}`;

    return async (dispatch, getState) => {
        const result = await request(
            'GET',
            `${BOARD_PATH}${reqParam}`,
            null,
            null
        );

        if (result?.status === 201) {
            console.log('callAccessToPostAPI result : ', result)
            dispatch(setPostAccessStatus(true))
        } else {
            console.log("callAccessToPostAPI Call Fail")
            dispatch(setPostAccessStatus(false))
        }
    }
}

export const callCreationToPostAPI = ({role, postCreationReq}) => {
    const reqParam = `/${role}`;

    return async (dispatch, getState) => {
        const result = await request(
            'POST',
            `${BOARD_PATH}${reqParam}`,
            {'Content-Type': 'application/json'},
            JSON.stringify(postCreationReq)
        );

        if (result?.status === 201) {
            console.log('callCreationToPostAPI result : ', result)
            dispatch(setPostCreationStatus(true))
        } else {
            console.log("callCreationToPostAPI Call Fail")
            dispatch(setPostCreationStatus(false))
        }
    }
}

export const callEditToPostAPI = ({role, postNo, postEditRequest}) => {
    const reqParam = `/${role}/${postNo}`;

    return async (dispatch, getState) => {
        const result = await request(
            'PUT',
            `${BOARD_PATH}${reqParam}`,
            {'Content-Type': 'application/json'},
            JSON.stringify(postEditRequest)
        );

        if (result?.status === 201) {
            console.log('callEditToPostAPI result : ', result)
            dispatch(setPostEditStatus(true))
        } else {
            console.log("callEditToPostAPI Call Fail")
            dispatch(setPostEditStatus(false))
        }
    }
}

export const callDeletionToPostAPI = ({role, postNo}) => {
    const reqParam = `/${role}/${postNo}`;

    return async (dispatch, getState) => {
        const result = await request(
            'DELETE',
            `${BOARD_PATH}${reqParam}`,
            null,
            null
        );

        if (result?.status === 204) {
            console.log('callDeletionToPostAPI result : ', result)
            dispatch(setPostDeletionStatus(true))
        } else {
            console.log("callDeletionToPostAPI Call Fail")
            dispatch(setPostDeletionStatus(false))
        }
    }
}

export const callCreationPostReplyAndMoveAPI = ({role, postCreationReq}) => {
    const reqParam = `/${role}`;

    return async (dispatch, getState) => {
        const result = await request(
            'POST',
            `${BOARD_PATH}${reqParam}`,
            {'Content-Type': 'application/json'},
            JSON.stringify(postCreationReq)
        );

        if (result?.status === 201) {
            console.log('callCreationPostReplyAndMoveAPI result : ', result)
            dispatch(setPostingReplyCreationNo(result.data.no))
        } else {
            console.log("callCreationPostReplyAndMoveAPI Call Fail")
            dispatch(setPostingReplyCreationNo(-1))
        }
    }
}

export const callCommentListAPI = ({postNo, currPage = 1}) => {
    const reqParam = `/${postNo}/${currPage}`

    return async (dispatch, getState) => {
        const result = await request(
            'GET',
            `${COMMENT_PATH}${reqParam}`,
            null,
            null
        )

        if (result?.status === 200) {
            console.log('callPostCommentListAPI result : ', result)
            dispatch(getComments(result.data))
        } else {
            console.log("callPostCommentListAPI Call Fail")
        }
    }
}

export const callCreationToCommentAPI = ({cmtCreationReq}) => {
    return async (dispatch, getState) => {
        const result = await request(
            'POST',
            `${COMMENT_PATH}`,
            {'Content-Type': 'application/json'},
            JSON.stringify(cmtCreationReq)
        )

        if (result?.status === 200) {
            console.log('callCreationToCommentAPI result : ', result)
            dispatch(setCommentCreationStatus(true))
        } else {
            console.log("callCreationToCommentAPI Call Fail")
            dispatch(setCommentCreationStatus(false))
        }
    }
}

export const callEditToCommentAPI = ({cmtNo, cmtEditReq}) => {
    const reqParam = `/${cmtNo}`

    return async (dispatch, getState) => {
        const result = await request(
            'PUT',
            `${COMMENT_PATH}${reqParam}`,
            {'Content-Type': 'application/json'},
            JSON.stringify(cmtEditReq)
        )

        if (result?.status === 200) {
            console.log('callPostEditedCommentAPI result : ', result)
            dispatch(setCommentEditStatus(true))
        } else {
            console.log("callPostEditedCommentAPI Call Fail")
            dispatch(setCommentEditStatus(false))
        }
    }
}

export const callDeleteToCommentAPI = ({cmtNo}) => {
    const reqParam = `/${cmtNo}`

    return async (dispatch, getState) => {
        const result = await request(
            'DELETE',
            `${COMMENT_PATH}${reqParam}`,
            null,
            null
        )

        if (result?.status === 200) {
            console.log('callDeleteToCommentAPI result : ', result)
            dispatch(setCommentDeletionStatus(true))
        } else {
            console.log("callDeleteToCommentAPI Call Fail")
            dispatch(setCommentDeletionStatus(false))
        }
    }
}

