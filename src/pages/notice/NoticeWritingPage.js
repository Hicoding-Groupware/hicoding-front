import {useDispatch, useSelector} from "react-redux";
import {useMatch, useNavigate} from "react-router-dom";
import {callCreationToPostAPI} from "../../apis/NoticeAPICalls";
import {useEffect, useState} from "react";

function NoticeWritingPage() {

    const dispatch = useDispatch()
    const {boardPost} = useSelector(state => state.boardReducer);
    const navigate = useNavigate();

    const match = useMatch({
        path: '/board/:title/:role/:memberNo/:curPostNo',
    });

    const {
        board: board,
        title: postTitle,
        role: role,
        memberNo: memberNo,
        curPostNo: curPostNo,
    } = match?.params || {};

    const [title, setTitle] = useState('');
    const [file, setFile] = useState(null);
    const [content, setContent] = useState('');
    const [isPublic, setIsPublic] = useState(true);
    const [isNotice, setIsNotice] = useState(false);
    const [isPressedButton, setIsPressedButton] = useState(false);

    useEffect(() => {
        if (boardPost && isPressedButton === true) {
            setIsPressedButton(false)
            navigate(`/board/${postTitle}/${role}/${boardPost.no}/views/${memberNo}`);
        }
    }, [boardPost]);

    const handleTitleChange = (e) => {
        setTitle(e.target.value);
    };

    const handleFileChange = (e) => {
        // 파일 처리 로직 추가
        const selectedFile = e.target.files[0];
        setFile(selectedFile);
    };

    const handleContentChange = (e) => {
        setContent(e.target.value);
    };

    const handlePublicChange = () => {
        setIsPublic(!isPublic);
    };

    const handleNoticeChange = () => {
        setIsNotice(!isNotice);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        dispatch(callCreationToPostAPI({
            role: role,
            postCreationReq: {
                title: title,
                content: content,
                isPublic: isPublic,
                isNoticePost: isNotice,
                writerNo: memberNo,
                parentNo: curPostNo != null ? curPostNo : 1
            }
        }))

        setIsPressedButton(true)
    };

    return (
        <>
            <div className="notice-writing-main">

                <h2>글쓰기</h2>

                <form onSubmit={handleSubmit}>
                    <div className="notice-writing-top">
                        <label>
                            제목
                            <input className="notice-writing-top-sub" type="text" value={title}
                                   onChange={handleTitleChange}/>
                        </label>

                        <br/>

                        <label>
                            파일 첨부
                            <input className="notice-writing-top-sub" type="file" onChange={handleFileChange}/>
                        </label>
                    </div>

                    <br/>

                    <div className="notice-writing-content">
                        <textarea value={content} onChange={handleContentChange}/>
                    </div>

                    <div className="notice-writing-function">
                        <div>
                            <label>
                                공개 설정:
                                <input type="checkbox" checked={isPublic} onChange={handlePublicChange}/>
                            </label>
                        </div>

                        <div>
                            <label>
                                공지로 등록:
                                <input type="checkbox" checked={isNotice} onChange={handleNoticeChange}/>
                            </label>
                        </div>
                    </div>

                    <div className="notice-writing-submission">
                        <button id="notice-writing-btnId" type="submit">등록</button>
                    </div>
                </form>
            </div>
        </>
    )
}

export default NoticeWritingPage