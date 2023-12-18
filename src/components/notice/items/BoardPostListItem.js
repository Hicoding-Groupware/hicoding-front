import React from "react";
import {useNavigate} from "react-router-dom";
import {useDispatch} from "react-redux";
import {callAccessToPostAPI} from "../../../apis/NoticeAPICalls";

function BoardPostListItem({node, role, memberNo}) {

    const dispatch = useDispatch()
    const navigate = useNavigate();

    const handleClick = (recordType) => (e) => {
        const clickedElement = e.target;
        console.log("Clicked element:", clickedElement);
        console.log("id", memberNo)

        switch (recordType) {
            case "views":
                console.log("DDDDDDDDDDDDDDDDDDDDDDD")
                navigate(`${node.no}/${recordType}/${memberNo}`);
                break;
            case "likes":
                dispatch(callAccessToPostAPI({role, postNo: node.no, recordType, memberNo}))
                console.log("CCCCCCCCCCCCCCCCCCCCCCCCCCCCC")
                break;
        }
    };

    const renderIndentation = (level) => {
        console.log(level);
        return {
            paddingLeft: `${level * 20}px`,
        };
    };

    return (
        <>
            {
                <tr key={node.no}>
                    <td>[]</td>
                    <td>{node.no}</td>
                    <td
                        onClick={handleClick("views")}
                        className="notice-postTitle" style={renderIndentation(node.depthLevel)}
                    >
                        {node.title}</td>
                    <td>{node.writer.memberName}</td>
                    <td>{node.createdAt}</td>
                    <td>{node.views}</td>
                    <td
                        onClick={handleClick("likes")}
                    >
                        {node.likesCnt}</td>
                </tr>
            }

            {node.childrenList &&
                node.childrenList.map((child) => (
                    <BoardPostListItem key={child.no} node={child} role={role} memberNo={memberNo}/>
                ))}
        </>
    )
}

export default BoardPostListItem