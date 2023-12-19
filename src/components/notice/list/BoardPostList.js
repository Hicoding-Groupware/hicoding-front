import React from "react";
import BoardPostListItem from "../items/BoardPostListItem";

function BoardPostList({postList, role, memberNo}) {

    return (
        <>
            <table className="notice-postTable">
                <thead>
                <tr>
                    <th><input type="checkbox"/></th>
                    <th>번호</th>
                    <th>제목</th>
                    <th>작성자</th>
                    <th>작성일</th>
                    <th>조회수</th>
                    <th>좋아요</th>
                </tr>
                </thead>

                <tbody className="notice-postTableBody">
                {postList.map((postParent) => (
                    <BoardPostListItem key={postParent.no} node={postParent} role={role} memberNo={memberNo}/>
                ))}
                </tbody>
            </table>
        </>
    )
}

export default BoardPostList;