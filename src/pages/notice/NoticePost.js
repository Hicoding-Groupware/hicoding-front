import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useMatch, useNavigate} from "react-router-dom";
import PagingBar from "../../components/notice/pagingBar/PagingBar";
import CommentList from "../../components/notice/list/CommentList";
import {
    callPostAPI,
    callCommentListAPI,
    callCreationToCommentAPI,
    callCreationPostReplyAndMoveAPI, callDeletionToPostAPI, callEditToPostAPI, callAccessToPostAPI
} from "../../apis/NoticeAPICalls";

function NoticePost() {

    const dispatch = useDispatch()

    const navigate = useNavigate();

    const {
        boardPost,
        isPostAccessGranted,
        newPostingReplyNo,
        isPostEditSuccessfully,
        isPostDeletionSuccessfully,
    } = useSelector(state => state.boardReducer);

    const {
        postCommentList,
        isCommentCreationSuccessfully,
        isCommentEditSuccessfully,
        isCommentDeletionSuccessfully
    }
        = useSelector(state => state.commentReducer);

    const match = useMatch({
        path: '/board/:title/:role/:postNo/:recordType/:memberNo',
    });

    const {
        title: title,
        role: role,
        postNo: postNo,
        recordType: recordType,
        memberNo: memberNo
    } = match?.params || {};

    const [currPage, setCurrPage] = useState(1)

    // 초기화
    useEffect(() => {
        dispatch(callPostAPI({role, postNo, recordType, memberNo}));
        dispatch(callCommentListAPI({postNo, currPage}));
    }, []);

    // 댓글 작업 시 갱신
    useEffect(() => {
        dispatch(callCommentListAPI({postNo, currPage}));
    }, [
        isCommentCreationSuccessfully,
        isCommentEditSuccessfully,
        isCommentDeletionSuccessfully
    ]);

    // 새 답글 작성 시 새 답글 게시글로 이동
    useEffect(() => {
        if (newPostingReplyNo) {
            dispatch(callPostAPI({role, postNo, recordType, memberNo}));
            navigate(`/board/전체글보기/${role}/${newPostingReplyNo}/${recordType}/${memberNo}`)
        }
    }, [newPostingReplyNo])

    // 게시글 수정 시 갱신
    useEffect(() => {
        if (isPostEditSuccessfully === true || isPostAccessGranted === true) {
            dispatch(callPostAPI({role, postNo, recordType, memberNo}));
            dispatch(callCommentListAPI({postNo, currPage}));
        }
    }, [isPostEditSuccessfully, isPostAccessGranted]);

    // 게시글 삭제 시 목록으로 이동
    useEffect(() => {
        if (isPostDeletionSuccessfully === true) {
            navigate(`/board/전체글보기/${role}`)
        }
    }, [isPostDeletionSuccessfully])

    const handleClick = (action) => (e) => {
        switch (action) {
            case "likes":
                dispatch(callAccessToPostAPI({ role, postNo, recordType: "likes", memberNo }));
                break;
            case "postingReply":
                navigate(`/board/${title}/${role}/${memberNo}/${postNo}`)
                break;
            case "edit":
                dispatch(callEditToPostAPI({
                    role: role,
                    postNo: postNo,
                    postEditRequest: {
                        title: "수정된 게시글입니다.",
                        content: "수정된 내용은 이렇습니다.",
                        isPublic: true,
                        isNoticePost: false,
                        status: "USABLE",
                    }
                }))
                break;
            case "deletion":
                dispatch(callDeletionToPostAPI({role: role, postNo: postNo}))
                break;
            case "postListMove":
                navigate(`/board/전체글보기/${role}`)
                break;
            case "cmtWriting":
                dispatch(callCreationToCommentAPI({
                    cmtCreationReq: ({
                        content: "작성된 댓글",
                        postNo: postNo,
                        writerNo: memberNo,
                        parentNo: null
                    })
                }))
                break;
        }
    }

    return (
        (boardPost && postCommentList) ? (
            <>
                <div class="notice-post-page-tool">
                    <button onClick={handleClick("postingReply")}>답글쓰기</button>
                    <button onClick={handleClick("edit")}>수정</button>
                    <button onClick={handleClick("deletion")}>삭제</button>
                    <button onClick={handleClick("postListMove")}>목록</button>
                </div>

                <div>제목: {boardPost.title}</div>
                <button onClick={handleClick("likes")}>좋아요</button>
                <div>작성자: {boardPost.writer.memberName}</div>
                <div>등록일자: {boardPost.createdAt}</div>
                <div>내용: {boardPost.content}</div>

                <div style={{display: "flex", whiteSpace: "nowrap"}}>
                    <div>총 댓글 수: {0}</div>
                    <div>조회수: {boardPost.views}</div>
                    <div>좋아요: {boardPost.likesCnt}</div>
                </div>
                <CommentList commentList={postCommentList.data}/>
                <PagingBar pageInfo={postCommentList.pageInfo} setCurrentPage={setCurrPage}/>

                <button onClick={handleClick("cmtWriting")}>댓글 작성</button>
            </>
        ) : (
            <div>
            <div>Loading...</div>
            </div>
        )
    );
}

export default NoticePost