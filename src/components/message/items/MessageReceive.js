import {useDispatch, useSelector} from "react-redux";
import {
    callMessageFileAPI,
    callMessageSendAPI,
    callReceiveDelete,
    callReceiveDetailAPI
} from "../../../apis/MessageAPICalls";
import Modal from "react-modal";
import {useRef, useState} from "react";

function MessageReceive({data}) {

    const dispatch = useDispatch();
    const [isOpen, setIsOpen] = useState(false);
    const [msgNo, setMsgNo] = useState(0);
    const {receiveDetail} = useSelector(state => state.messageReducer);
    const [reply, setReply] = useState(false);
    const [memberNo, setMemberNo] = useState([]);
    const [message, setMessage] = useState('');
    const replyfileInput = useRef();
    const [fileUrl, setFileUrl] = useState('');
    const [fileName, setFileName] = useState('');
    const [form, setForm] = useState({});
    const [checkedList, setCheckedList] = useState([]);
    const [isChecked, setIsChecked] = useState(false);
    //const [deleteMsg, setDeleteMsg] = useState([]);

    const formatDate = (dateString) => {
        if (!dateString) return ''; // null 값 처리
        const options = {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit'
        };
        return new Date(dateString.replace('T', ' ')).toLocaleDateString('ko-KR', options).replace(/\.\s?/g, '-').replace(/-$/, '');
    };

    const onClickFileDown = (fileNo) => {
        dispatch(callMessageFileAPI({fileNo}));
    }

    /* 더블 클릭시 메세지 보기 */
    const receiveDetailMessage = (msgNo) => {
        setIsOpen(true);
        setMsgNo(msgNo);
        dispatch(callReceiveDetailAPI({msgNo}));
    }

    const customStyles = {
        overlay: {
            backgroundColor: "rgba(0,0,0,0.5)",
        },
        content: {
            left: "0",
            margin: "auto",
            width: "554px",
            height: "424px",
            padding: "0",
            overflow: "hidden",
            borderRadius: "16px",
        },
    };

    const onRequestCloseHandler = () => {
        setIsOpen(false);
    }

    /* 답장하기 모달창 띄우기 */
    const onClickReply = (memberNo) => {
        setReply(true);
        setIsOpen(false);
        setMemberNo(memberNo);
        console.log(memberNo);
    }

    /* 답장하기 모달창 닫기 */
    const onReplyCloseHandler = () => {
        setReply(false);
    }

    /* 답장 모달창 메세지내용 */
    const onChangeHandler = e => {
        setMessage(e.target.value);

    }

    /* 파일 다운 */
    const onClickFileUpload = () => {
        replyfileInput.current.click();
    }

    /* 파일 */
    const onChangeReplyFileUpload = () => {
        const selectedFile = replyfileInput.current.files[0];

        // 파일이 선택되었는지 확인
        if (selectedFile) {

            const fileName = selectedFile.name;

            setFileName(`${fileName}`);

            const fileReader = new FileReader();
            fileReader.onload = (e) => {
                const {result} = e.target;
                if (result) setFileUrl(result);
            };
            fileReader.readAsDataURL(selectedFile);
        } else {
            // 파일이 선택되지 않은 경우에 대한 처리
            console.warn("파일이 선택되지 않았습니다.");
            // 아래는 선택되지 않은 경우에 대한 예외 처리 코드입니다.
            // 선택되지 않은 경우에 할 작업이 없다면 이 블록은 생략 가능합니다.
        }
    }

    /* 쪽지 답장하기 */
    const onClickMessageRegist = () => {

        form.msgContent = message;

        console.log(memberNo);
        form.receivers = [memberNo];

        const formData = new FormData();
        formData.append("msgFile", replyfileInput.current.files[0]);
        formData.append("messageRequest", new Blob([JSON.stringify(form)], {type: 'application/json'}));
        dispatch(callMessageSendAPI({registRequest: formData}));

    }

    /* 체크박스 핸들러 */
    const checkedItemHandler = (value: string, isChecked: boolean) => {
        if (isChecked) {
            setCheckedList((prev) => [...prev, value]);

            return;
        }

        if (!isChecked && checkedList.includes(value)) {
            setCheckedList(checkedList.filter((item) => item !== value));

            return;
        }

        return;
    };

    const checkHandler = (e, value: string) => {
        setIsChecked(!isChecked);
        checkedItemHandler(value, e.target.checked);

        console.log(value, e.target.checked);
        console.log(checkedList);

    }

    /* 체크박스 전체 체크 */
    const handleHeaderCheckboxChange = (isChecked) => {
        const allMsgNos = data.map((message) => message.msgNo);

        if (isChecked) {
            setCheckedList(allMsgNos);
        } else {
            setCheckedList([]);
        }
    };

    /* 체크박스 선택후 삭제 버튼 클릭시 삭제 상태 */
    const receiveDelete = () => {

        //deleteMsg.msgNos = checkedList;
        console.log(checkedList);
        dispatch(callReceiveDelete({deleteRequest : { msgNos : checkedList}}))
    }


    return (
        <div>
            <Modal
                isOpen={isOpen}
                ariaHideApp={false}
                style={customStyles}
                onRequestClose={onRequestCloseHandler}
            >
                {receiveDetail && (
                    <>
                        <div className="message-write-sub">
                            <div className="message-write-title">보낸사람</div>
                            <div className="message-detail-sendedAt">{formatDate(receiveDetail.sendedAt)}</div>
                        </div>
                        <div className="message-detail-sender">{receiveDetail.sender}</div>
                        <div className="write-content">{receiveDetail.msgContent}</div>
                        <div className="message-upload">
                            <div className="message-detail-file">첨부된 파일</div>
                            {receiveDetail.fileName ? (
                                <div className="detail-upload-name">
                                    {receiveDetail.fileName}
                                    <button onClick={() => onClickFileDown(receiveDetail.fileNo)}>다운</button>
                                </div>
                            ) : (
                                <div className="detail-upload-name">
                                </div>
                            )}
                        </div>
                        <div className="message-buttons">
                            <div className="message-reset">삭제</div>
                            <div className="message-back">목록으로</div>
                            <div className="detail-write-button"
                                 onClick={() => onClickReply(receiveDetail.memberNo)}>답장하기
                            </div>
                        </div>
                    </>
                )}
            </Modal>
            <Modal
                isOpen={reply}
                ariaHideApp={false}
                style={customStyles}
                onRequestClose={onReplyCloseHandler}
            >
                <>

                    <div className="message-write-title">쪽지쓰기</div>
                    <div className="message-write-sub">
                        <div className="message-receiver">받는 사람</div>
                        <div className="message-receiverList">
                            {receiveDetail &&
                                <>
                                    {receiveDetail.sender}({receiveDetail.memberId})
                                </>
                            }
                        </div>

                    </div>

                    <div>
                    <textarea
                        className="write-content"
                        placeholder="쪽지를 입력해 주세요."
                        name="msgContent"
                        onChange={onChangeHandler}
                    />
                    </div>
                    <div className="message-upload">
                        <label
                            htmlFor="message-fileUpload"
                            onClick={onClickFileUpload}
                        >
                            첨부하기
                        </label>
                        <input
                            className="message-fileUpload"
                            type="file"
                            ref={replyfileInput}
                            name="msgFile"
                            onChange={onChangeReplyFileUpload}
                        />
                        <input className="upload-name" value={fileName} placeholder="Sample 명단.pdf"/>
                    </div>
                    <div className="message-buttons">
                        <button className="message-reset">삭제</button>
                        <button className="message-back">목록으로</button>
                        <button className="write-button" onClick={onClickMessageRegist}>쪽지쓰기</button>
                    </div>
                </>
            </Modal>
            <div className="message-table-tr">
                <div className="message-th-no">
                    <input
                        type="checkbox"
                        onChange={(e) => handleHeaderCheckboxChange(e.target.checked)}
                        className="message-checkbox"/>
                    <span
                        className="message-th-msgNo">NO.</span>
                    <button className="message-delete" onClick={ receiveDelete }>삭제</button>
                </div>
                <div className="message-th-name">보낸 사람</div>
                <div className="message-th-content">내용</div>
                <div className="message-th-sendedAt">보낸 일시</div>
                <div className="message-th-file">파일</div>
            </div>
            {
                data.map(message => (
                    <label key={message.msgNo}>
                    <div className="message-item" onDoubleClick={() => receiveDetailMessage(message.msgNo)}
                         >
                        <div className="message-no">
                            <input
                                type="checkbox"
                                id={message.msgNo}
                                checked={checkedList.includes(message.msgNo)}
                                onChange={(e) => checkHandler(e, message.msgNo)}
                                className="message-checkbox"/>
                            <span
                                className="message-msgNo">{message.msgNo}</span></div>
                        <div className="message-sender">{message.sender}</div>
                        <div className="message-content">{message.msgContent}</div>
                        <div className="message-sendedAt">{formatDate(message.sendedAt)}</div>
                        {message.fileName ? (
                            <div className="message-fileName">
                                {message.fileName}
                                <button onClick={() => onClickFileDown(message.fileNo)}>다운</button>
                            </div>
                        ) : (
                            <div className="message-fileName">
                            </div>
                        )}
                    </div>
                    </label>
                ))
            }
        </div>
    );

}

export default MessageReceive;