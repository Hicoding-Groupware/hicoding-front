import {useDispatch, useSelector} from "react-redux";
import {callMessageFileAPI, callReceiveDetailAPI} from "../../../apis/MessageAPICalls";
import Modal from "react-modal";
import {useState} from "react";

function MessageReceive({data}) {

    const dispatch = useDispatch();
    const [isOpen, setIsOpen] = useState(false);
    const [msgNo, setMsgNo] = useState(0);
    const {receiveDetail} = useSelector(state => state.messageReducer);

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
                        <div className="write-button">답장하기</div>
                        </div>
                    </>
                )}
            </Modal>
            <div className="message-table-tr">
                <div className="message-th-no"><input type="checkbox" className="message-checkbox"/><span
                    className="message-th-msgNo">NO.</span>
                    <button className="message-delete">삭제</button>
                </div>
                <div className="message-th-name">보낸 사람</div>
                <div className="message-th-content">내용</div>
                <div className="message-th-sendedAt">보낸 일시</div>
                <div className="message-th-file">파일</div>
            </div>
            {
                data.map(message => (
                    <div className="message-item" onDoubleClick={() => receiveDetailMessage(message.msgNo)}
                         key={message.msgNo}>
                        <div className="message-no"><input type="checkbox" className="message-checkbox"/><span
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
                ))
            }
        </div>
    );

}

export default MessageReceive;