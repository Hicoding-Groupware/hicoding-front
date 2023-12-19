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

    const [cmtInput, setCmtInput] = useState("")
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
        if (currPage || isPostEditSuccessfully === true || isPostAccessGranted === true) {
            dispatch(callPostAPI({role, postNo, recordType, memberNo}));
            dispatch(callCommentListAPI({postNo, currPage}));
        }
    }, [currPage, isPostEditSuccessfully, isPostAccessGranted]);

    // 게시글 삭제 시 목록으로 이동
    useEffect(() => {
        if (isPostDeletionSuccessfully === true) {
            navigate(`/board/전체글보기/${role}`)
        }
    }, [isPostDeletionSuccessfully])

    const handleInputChange = (e) => {
        setCmtInput(e.target.value);
    };

    const handleClick = (action) => (e) => {
        switch (action) {
            case "likes":
                dispatch(callAccessToPostAPI({role, postNo, recordType: "likes", memberNo}));
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
                        content: cmtInput,
                        postNo: postNo,
                        writerNo: memberNo,
                        parentNo: null
                    })
                }))

                setCmtInput('')

                break;
        }
    }

    return (
        (boardPost && postCommentList) ? (
            <>
                <div className="notice-post-container">
                    <div class="notice-post-page-tool">
                        <button className="notice-post-btn" onClick={handleClick("postingReply")}>답글쓰기</button>
                        <button className="notice-post-btn" onClick={handleClick("edit")}>수정</button>
                        <button className="notice-post-btn" onClick={handleClick("deletion")}>삭제</button>
                        <button className="notice-post-btn" onClick={handleClick("postListMove")}>목록</button>
                    </div>

                    <div className="notice-post-main">
                        <div className="notice-post-header">
                            <div className="notice-post-title"><h3>{boardPost.title}</h3></div>
                            <button id="notice-post-likesBtnId" onClick={handleClick("likes")}>좋아요</button>
                        </div>

                        <div className="notice-post-writerInfo">
                            <div className="notice-post-writerInfo-sub">{boardPost.writer.memberName}</div>
                            <div className="notice-post-writerInfo-sub1">{boardPost.createdAt}</div>
                        </div>

                        <div className="notice-post-contents">
                            <textarea className="notice-post-content" value={boardPost.content} readOnly='true'/>

                            <div className="notice-post-marks">
                                <div className="notice-post-mark">댓글 수: {0}</div>
                                <div className="notice-post-mark">조회수: {boardPost.views}</div>
                                <div className="notice-post-mark">좋아요: {boardPost.likesCnt}</div>
                            </div>
                        </div>
                    </div>

                    <div className="notice-post-comments">
                        <CommentList commentList={postCommentList.data}/>

                        <textarea className="comment-input" placeholder="댓글을 작성하세요" value={cmtInput} onChange={handleInputChange}/>
                        <span><button id="notice-post-comment-btnId" onClick={handleClick("cmtWriting")}>댓글 작성</button></span>

                        <PagingBar pageInfo={postCommentList.pageInfo} setCurrentPage={setCurrPage}/>
                    </div>
                </div>


            </>
        ) : (
            <div>
                <div>Loading...</div>
            </div>
        )
    );
}

export default NoticePost