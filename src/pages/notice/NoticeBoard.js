import React, {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {callMemberProfileAPI} from "../../apis/MemberAPICalls";
import BoardPostList from "../../components/notice/list/BoardPostList";
import PagingBar from "../../components/notice/pagingBar/PagingBar";
import {callCreationToCommentAPI, callCreationToPostAPI, callPostListAPI} from "../../apis/NoticeAPICalls";

function NoticeBoard() {

    const dispatch = useDispatch()
    const {title, role} = useParams()
    const [currPage, setCurrPage] = useState(1)
    const {profileInfo} = useSelector(state => state.memberReducer);
    const {boardPosts, isPostAccessGranted, isPostCreationSuccessfully} = useSelector(state => state.boardReducer)

    useEffect(() => {
        dispatch(callMemberProfileAPI());
        dispatch(callPostListAPI({role, currPage}))

    }, []);

    useEffect(() => {
        if (isPostAccessGranted === true || isPostCreationSuccessfully === true) {
            dispatch(callPostListAPI({role, currPage}))
        }
    }, [isPostAccessGranted, isPostCreationSuccessfully]);

    const handleClick = (action) => (e) => {
        switch (action) {
            case "postWriting":
                dispatch(callCreationToPostAPI({
                    role: role,
                    postCreationReq: {
                        title: "작성된 게시글입니다.",
                        content: "내용은 이렇습니다.",
                        isPublic: true,
                        isNoticePost: false,
                        writerNo: profileInfo.memberNo,
                        parentNo: null
                    }
                }))
                break;
        }

    }

    return (
        profileInfo &&
        boardPosts && (
            <>
                <div className="notice-title">{title}</div>
                <div className="notice-tool">
                    도구영역
                    공지 등록
                    [] 공지 숨기기
                    페이지 표시 수
                </div>

                <BoardPostList postList={boardPosts.data} role={role} memberNo={profileInfo.memberNo}/>
                <PagingBar pageInfo={boardPosts.pageInfo} setCurrentPage={setCurrPage}/>

                <div className="notice-bottomWriting">
                    <button onClick={handleClick("postWriting")}>글쓰기</button>
                </div>

                <div className="notice-bottomSearch">
                    전체기간
                    제목+내용
                    검색
                </div>
            </>
        )
    )
}

export default NoticeBoard