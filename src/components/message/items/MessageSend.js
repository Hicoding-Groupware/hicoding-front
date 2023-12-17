import {useEffect, useState} from "react";
import {useDispatch} from "react-redux";
import {callMessageFileAPI} from "../../../apis/MessageAPICalls";

function MessageSend ({data}){

    const dispatch = useDispatch();

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

    return (
        <div>
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
                    <div className="message-item" key={message.msgNo}>
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