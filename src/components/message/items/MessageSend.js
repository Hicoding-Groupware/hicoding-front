import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {callMessageFileAPI, callSendDelete, callSendDetailAPI} from "../../../apis/MessageAPICalls";
import Modal from "react-modal";

function MessageSend ({data}){

    const dispatch = useDispatch();
    const [isOpen, setIsOpen] = useState(false);
    const [msgNo, setMsgNo] = useState(0);
    const {sendDetail} = useSelector(state => state.messageReducer);
    const [sendCheckedList, setSendCheckedList] = useState([]);
    const [isChecked, setIsChecked] = useState(false);

    const formatDate = (date) => {
        if (!date) return ''; // null 값 처리
        const options = { year: 'numeric', month: '2-digit', day: '2-digit' ,hour: '2-digit', minute: '2-digit', second: '2-digit'};
        return new Date(date.replace('T', ' ')).toLocaleDateString('ko-KR', options).replace(/\.\s?/g, '-').replace(/-$/, '');
    };

    const onClickFileDown = (fileNo) => {

        dispatch(callMessageFileAPI({fileNo}));
    }

    const sendDetailMessage = (msgNo) => {
        setIsOpen(true);
        setMsgNo(msgNo);
        dispatch(callSendDetailAPI({msgNo}));
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

    /* 체크박스 핸들러 */
    const checkedItemHandler = (value: string, isChecked: boolean) => {
        if (isChecked) {
            setSendCheckedList((prev) => [...prev, value]);

            return;
        }

        if (!isChecked && sendCheckedList.includes(value)) {
            setSendCheckedList(sendCheckedList.filter((item) => item !== value));

            return;
        }

        return;
    };

    const checkHandler = (e, value: string) => {
        setIsChecked(!isChecked);
        checkedItemHandler(value, e.target.checked);

        console.log(value, e.target.checked);
        console.log(sendCheckedList);
    }

    /* 체크 박스 전체 체크 */
    const handleHeaderCheckboxChange = (isChecked)  => {
        const allMsgNos = data.map((message) => message.msgNo);

        if (isChecked) {
            setSendCheckedList(allMsgNos);
        } else {
            setSendCheckedList([]);
        }

        console.log(sendCheckedList);
    };

    /* 체크박스 선택후 삭제 버튼 클릭시 삭제 상태 */
    const sendDelete = () => {

        dispatch(callSendDelete({deleteRequest : { msgNos : sendCheckedList}}));
    }

    /* 보낸메세지 모달창에서 삭제 */
    const sendDetailDelete = () => {
        dispatch(callSendDelete({deleteRequest : { msgNos : [msgNo]}}));
    }

    const onRequestCloseHandler = () => {
        setIsOpen(false);
    }

    const sendList = () => {
        setIsOpen(false);
    }

    return (
        <div>
            <Modal
                isOpen={isOpen}
                ariaHideApp={false}
                style={customStyles}
                onRequestClose={onRequestCloseHandler}
                >
                {sendDetail && (
                    <>
                        <div className="message-write-sub">
                            <div className="message-write-title">보낸사람</div>
                            <div className="message-detail-sendedAt">{formatDate(sendDetail.sendedAt)}</div>
                        </div>
                        <div className="message-detail-sender">{sendDetail.receiver}</div>
                        <div className="write-content">{sendDetail.msgContent}</div>
                        <div className="message-upload">
                            <div className="message-detail-file">첨부된 파일</div>
                            {sendDetail.fileName ? (
                                <div className="detail-upload-name">
                                    <span className="messageFile" onClick={() => onClickFileDown(sendDetail.fileNo)}>
                                    {sendDetail.fileName}
                                    </span>
                                </div>
                            ) : (
                                <div className="detail-upload-name">
                                </div>
                            )}
                        </div>
                        <div className="message-buttons">
                            <div className="message-reset" onClick={ sendDetailDelete }>삭제</div>
                            <div className="message-send-back" onClick={ sendList }>목록으로</div>
                        </div>
                    </>
                )}
            </Modal>
            <div className="message-table-tr">
                <div className="message-th-no">
                    <input
                        type="checkbox"
                        onChange={(e) => handleHeaderCheckboxChange(e.target.checked)}
                        className="message-checkbox"
                    />
                    <span className="message-th-msgNo">NO.</span>
                    <button className="message-delete" onClick={ sendDelete }>삭제</button></div>
                <div className="message-th-name">받는 사람</div>
                <div className="message-th-sendContent">내용</div>
                <div className="message-th-readStatus">읽은 상태</div>
                <div className="message-th-sendedAt">읽은 일시</div>
                <div className="message-th-file">파일</div>
            </div>
            {
                data.map(message => (
                    <label key={message.msgNo}>
                    <div className="message-item" onDoubleClick={() => sendDetailMessage(message.msgNo)}>
                        <div className="message-no">
                            <input type="checkbox"
                                   id={message.msgNo}
                                   checked={sendCheckedList.includes(message.msgNo)}
                                   onChange={(e) => checkHandler(e, message.msgNo)}
                                   className="message-checkbox"
                            />
                            <span className="message-msgNo">{message.msgNo}</span>
                        </div>
                        <div className="message-sender">{message.receiver}</div>
                        <div className="message-sendContent">{message.msgContent}</div>
                        <div className="message-readStatus">{message.readStatus === 'notRead' ? '' : '읽음'}</div>
                        <div className="message-sendedAt">{formatDate(message.readAt)}</div>
                        {message.fileName ? (
                            <div className="message-fileName">
                                <span class="messageFile" onClick={() => onClickFileDown(message.fileNo)}>
                                {message.fileName}
                                </span>
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

export default MessageSend;