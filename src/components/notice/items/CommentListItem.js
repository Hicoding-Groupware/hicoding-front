import React, {useState} from "react";
import {useDispatch} from "react-redux";
import {callCreationToCommentAPI, callDeleteToCommentAPI, callEditToCommentAPI} from "../../../apis/NoticeAPICalls";

function CommentListItem({item}) {

    const dispatch = useDispatch()

    const [showInput, setShowInput] = useState(false);
    const [showInput2, setShowInput2] = useState(false);
    const [inputValue, setInputValue] = useState('');
    const [form, setForm]= useState('');
    const [editInput, setEditInput] = useState('')

    const handleButtonClick = () => {
        setShowInput(!showInput); // show/hide toggle
    };

    const handleButtonClick2 = () => {
        setShowInput2(!showInput2); // show/hide toggle
    };

    const handleInputChange = (e) => {
        setInputValue(e.target.value);
    };

    const handleInputReplySubmit = () => {
        // 여기에서 inputValue를 사용하여 필요한 작업을 수행하십시오.
        console.log('입력 값:', inputValue);

        // 입력 후에 입력 창 감추기
        setShowInput(false);

        dispatch(callCreationToCommentAPI({
            cmtCreationReq: ({
                content: inputValue,
                postNo: item.postNo,
                writerNo: item.writer.memberNo,
                parentNo: item.no
            })
        }))
    };

    const handleInputModificationSubmit = () => {
        // 입력 후에 입력 창 감추기
        setShowInput2(false);

        dispatch(callEditToCommentAPI({
            cmtNo: (item.no),
            cmtEditReq: ({content: editInput, status: "USABLE"})
        }))
    };

    // 행동에 따라 댓글을 조작 가능
    const handleClick = (action) => (e) => {
        switch (action) {
            case "modification":

                break;
            case "delete":
                dispatch(callDeleteToCommentAPI({cmtNo: (item.no)}))
                break;
        }
    }

    const onChangeHandler = e => {
        setEditInput(e.target.value)

        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
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
                    <div className="notice-comment">

                        <div className="notice-comment-info">
                            <div>{item.writer.memberName}</div>
                            <div className="notice-comment-createdAt">{item.createdAt}</div>

                            <div className="notice-comment-tool">
                                <button className="notice-comment-tool-btn-id" onClick={handleButtonClick}>댓글달기
                                </button>
                                <button className="notice-comment-tool-btn-id"
                                        onClick={handleButtonClick2}>수정
                                </button>
                                <button className="notice-comment-tool-btn-id" onClick={handleClick("delete")}>삭제
                                </button>
                            </div>

                        </div>

                        {!showInput2 && (
                            <div className="notice-commentTitle" style={renderIndentation(item.depthLevel)}>
                                {item.content}
                            </div>
                        )}

                        {showInput2 && (
                            <div className="notice-commentTitle">
                                <input
                                    type="text"
                                    value={form.content}
                                    onChange={onChangeHandler}
                                />
                                <button onClick={handleInputModificationSubmit}>확인</button>
                            </div>
                        )}

                        {showInput && (
                            <div className="notice-comment-hidden-reply-button"
                                 style={renderIndentation(item.depthLevel + 1)}>
                                <input
                                    type="text"
                                    value={inputValue}
                                    onChange={handleInputChange}
                                    placeholder="입력하세요"
                                />
                                <button onClick={handleInputReplySubmit}>확인</button>
                            </div>
                        )}

                    </div>
                </>
            )}

            {/*{item.childrenList &&*/}
            {/*    item.childrenList.map((child) => (*/}
            {/*        <CommentListItem key={child.no} item={child}/>*/}
            {/*    ))}*/}
        </>
    )
}

export default CommentListItem