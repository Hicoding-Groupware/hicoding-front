import React from "react";
import {useDispatch} from "react-redux";
import {callCreationToCommentAPI, callDeleteToCommentAPI, callEditToCommentAPI} from "../../../apis/NoticeAPICalls";

function CommentListItem({item}) {

    const dispatch = useDispatch()

    // 행동에 따라 댓글을 조작 가능
    const handleClick = (action) => (e) => {

        switch (action) {
            case "reply":
                dispatch(callCreationToCommentAPI({
                    cmtCreationReq: ({
                        content: "생성된 대댓글",
                        postNo: item.postNo,
                        writerNo: item.writer.memberNo,
                        parentNo: item.no
                    })
                }))
                break;
            case "modification":
                dispatch(callEditToCommentAPI({
                    cmtNo: (item.no),
                    cmtEditReq: ({content: "123456789", status: "USABLE"})
                }))
                break;
            case "delete":
                dispatch(callDeleteToCommentAPI({cmtNo: (item.no)}))
                break;
        }
    }

    const renderIndentation = (level) => {
        return {
            paddingLeft: `${level * 20}px`,
        };
    };

    return (
        <>
            {item.status === 'USABLE' && (
                <>
                    <div style={{display: "flex", whiteSpace: "nowrap"}}>
                        <div>작성자: {item.writer.memberName}</div>
                        <div>등록일: {item.createdAt}</div>
                        <button onClick={handleClick("reply")}>댓글달기</button>
                        <button onClick={handleClick("modification")}>수정</button>
                        <button onClick={handleClick("delete")}>삭제</button>
                    </div>
                    <div className="notice-commentTitle" style={renderIndentation(item.depthLevel)}>
                        내용: {item.content}
                    </div>
                </>
            )}

            {item.childrenList &&
                item.childrenList.map((child) => (
                    <CommentListItem key={child.no} item={child}/>
                ))}
        </>
    )
}

export default CommentListItem