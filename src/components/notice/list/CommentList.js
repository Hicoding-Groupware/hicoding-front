
import React from "react";
import CommentListItem from "../items/CommentListItem";

function CommentList({commentList}) {

    return (
        <>
            {commentList.map((cmtParent) => (
                <CommentListItem key={cmtParent.no} item={cmtParent}/>
            ))}
        </>
    )
}

export default CommentList