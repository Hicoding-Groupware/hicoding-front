import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {callMessageFileAPI, callSendDetailAPI} from "../../../apis/MessageAPICalls";
import Modal from "react-modal";

function MessageSend ({data}){

    const dispatch = useDispatch();
    const [isOpen, setIsOpen] = useState(false);
    const [msgNo, setMsgNo] = useState(0);
    const {sendDetail} = useSelector(state => state.messageReducer);

    const formatDate = (dateString) => {
        if (!dateString) return ''; // null 값 처리
        const options = { year: 'numeric', month: '2-digit', day: '2-digit' ,hour: '2-digit', minute: '2-digit', second: '2-digit'};
        return new Date(dateString.replace('T', ' ')).toLocaleDateString('ko-KR', options).replace(/\.\s?/g, '-').replace(/-$/, '');
    };

    const onClickFileDown = (fileNo) => {

        //const parsedFileNo = Number(fileNo);
        console.log(typeof fileNo);

        console.log(fileNo);
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
                                    {sendDetail.fileName}
                                    <button onClick={() => onClickFileDown(sendDetail.fileNo)}>다운</button>
                                </div>
                            ) : (
                                <div className="detail-upload-name">
                                </div>
                            )}
                        </div>
                        <div className="message-buttons">
                            <div className="message-reset">삭제</div>
                            <div className="message-send-back">목록으로</div>
                        </div>
                    </>
                )}
            </Modal>
            <div className="message-table-tr">
                <div className="message-th-no"><input type="checkbox" className="message-checkbox"/><span className="message-th-msgNo">NO.</span> <button className="message-delete">삭제</button></div>
                <div className="message-th-name">받는 사람</div>
                <div className="message-th-sendContent">내용</div>
                <div className="message-th-readStatus">읽은 상태</div>
                <div className="message-th-sendedAt">읽은 일시</div>
                <div className="message-th-file">파일</div>
            </div>
            {
                data.map(message => (
                    <div className="message-item" onDoubleClick={() => sendDetailMessage(message.msgNo)} key={message.msgNo}>
                        <div className="message-no"><input type="checkbox" className="message-checkbox"/><span className="message-msgNo">{message.msgNo}</span></div>
                        <div className="message-sender">{message.receiver}</div>
                        <div className="message-sendContent">{message.msgContent}</div>
                        <div className="message-readStatus">{message.readStatus === 'notRead' ? '' : '읽음'}</div>
                        <div className="message-sendedAt">{formatDate(message.readAt)}</div>
                        {message.fileName ? (
                            <div className="message-fileName">
                                {message.fileName}<button onClick={() => onClickFileDown(message.fileNo)}>다운</button>
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

export default MessageSend;