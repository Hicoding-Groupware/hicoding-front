import {useDispatch, useSelector} from "react-redux";
import {useCallback, useEffect, useRef, useState} from "react";
import {
    callMessageMemberListAPI,
    callMessageSendAPI,
    callReceiveMessageListAPI,
    callSendMessageListAPI
} from "../../apis/MessageAPICalls";
import Modal from "react-modal";
import MessageReceive from "../../components/message/items/MessageReceive";
import ReceivePagingBar from "../../components/message/pagingBar/ReceivePagingBar";
import MessageSend from "../../components/message/items/MessageSend";
import {is} from "date-fns/locale";
import {getReceiveDetail, postMessageSuccess, putDeleteSuccess} from "../../modules/MessageModule";
import {useNavigate} from "react-router-dom";
import {ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

function Message() {
    const dispatch = useDispatch();
    const [currentPage, setCurrentPage] = useState(1);
    const [sendCurrentPage, setSendCurrentPage] = useState(1);
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [selectedValue, setSelectedValue] = useState('sender');
    const [sender, setSender] = useState('');
    const [content, setContent] = useState('');
    const [writeOpen, setWriteOpen] = useState(false);
    const [isNow, setIsNow] = useState(true);
    const {receiveMessages, sendMessages, memberList, postMessageSuccess, getReceiveDetail, putDeleteSuccess} = useSelector(state => state.messageReducer);
    const [memberListOpen, setMemberListOpen] = useState(false);
    const fileInput = useRef();
    const [fileUrl, setFileUrl] = useState('');
    const [fileName, setFileName] = useState('');
    const [memberName, setMemberName] = useState('');
    const [memberNo, setMemberNo] = useState([]);
    const [form, setForm] = useState({});
    const [message, setMessage] = useState('');
    const [checkedList, setCheckedList] = useState([]);
    const [isChecked, setIsChecked] = useState(false);
    const [selectedMembersDisplay, setSelectedMembersDisplay] = useState([]);
    const navigate = useNavigate();
    const [receiver, setReceiver] = useState('');



    useEffect(() => {
        dispatch(callReceiveMessageListAPI({currentPage, sender, content, startDate, endDate}));
    }, [currentPage, sender, content, startDate, endDate, postMessageSuccess, getReceiveDetail, putDeleteSuccess, isNow]);

    useEffect(() => {
        dispatch(callSendMessageListAPI({sendCurrentPage, receiver, content, startDate, endDate}));
    }, [sendCurrentPage, receiver, content, startDate, endDate,postMessageSuccess, getReceiveDetail, putDeleteSuccess, isNow]);

    useEffect(() => {
        if(postMessageSuccess === true) {
            setWriteOpen(false);
            navigate('/message', {replace: true});
        }
    }, [postMessageSuccess]);


    const onStartDateChangeHandler = e => {
        setStartDate(e.target.value);
    }

    const onEndDateChangeHandler = e => {
        setEndDate(e.target.value);
    }

    const onSearchChangeHandler = e => {
        if (selectedValue === 'sender') {
            setSender(e.target.value);
            setReceiver(e.target.value);
        } else if(selectedValue === 'content'){
            setContent(e.target.value);
        }
        console.log("sender : ", sender);
        console.log("content : ", content);
    }

    const onSelectChangeHandler = e => {
        setSelectedValue(e.target.value);
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

    const memberListStyles = {
        overlay: {
            backgroundColor: "rgba(0,0,0,0.5)",
        },
        content: {
            left: "600px",  // 수정된 부분
            top: "186px",
            margin: "auto",
            width: "680px",
            height: "328px",
            padding: "0",
            overflow: "hidden",
            borderRadius: "16px",
        },
    };

    /* 쪽지쓰기 모달창 닫기 */
    const onRequestCloseHandler = () => {
        setWriteOpen(false);
        setFileName('');
        setSelectedMembersDisplay([]);
        setCheckedList([]);

    }

    /* 멤버 추가하는 모달창 닫는 용 */
    const onMemberListCloseHandler = () => {
        setMemberListOpen(false);

    }

    const onClickWriteMessage = () => {
        setWriteOpen(true);
    }

    /* 쪽지 멤버 검색 */
    const onSearchMember = e => {
        setMemberName(e.target.value);
    }

    const onEnterKeyHandler = e => {
        if (e.key === 'Enter') {
            dispatch(callMessageMemberListAPI({memberName}));
        }
        console.log(memberName);
    }

    const onReceiveEnterKeyHandler = e => {
        if (e.key === 'Enter') {
            if (selectedValue === 'sender') {
                setSender(e.target.value);
            } else if(selectedValue === 'content'){
                setContent(e.target.value);
            }
        }
    }

    /* 받는사람 추가하기 */
    const onClickMemberListAdd = () => {
        setMemberListOpen(true);
        dispatch(callMessageMemberListAPI({memberName}));
    }

    const receiveBox = () => {
        setIsNow(true);
        dispatch(callReceiveMessageListAPI({currentPage, sender, content, startDate, endDate}));
    }

    const sendBox = () => {
        setIsNow(false);
    }

    const onChangeFileUpload = () => {
        const selectedFile = fileInput.current.files[0];

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

    /* 파일 다운 */
    const onClickFileUpload = () => {
        fileInput.current.click();
    }

    /* 메세지 내용 삭제 버튼 */
    const onClickDeleteContent = () => {
        setFileName('');
        setSelectedMembersDisplay([]);
        setCheckedList([]);
        setMessage('');

    }

    /* 두 번째 모달에서 체크박스에서 멤버 버튼 클릭시 */
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

    };

    /* > 클릭 버튼 */
    const addMemberButton = useCallback(
        e => {
            e.preventDefault();

            const selectedMembers = memberList.filter((member) => checkedList.includes(member.memberNo));

            // 중복된 멤버는 추가하지 않도록 처리
            const uniqueSelectedMembers = selectedMembers.filter(
                (member) => !selectedMembersDisplay.some((selected) => selected.memberNo === member.memberNo)
            );

            // 선택된 멤버 목록을 state에 추가
            setSelectedMembersDisplay((prev) => [...prev, ...uniqueSelectedMembers]);
            setCheckedList([]);
        }

    );

    /* < 클릭 버튼 */
    const removeMemberButton = useCallback(
        e => {
            e.preventDefault();

            // 선택된 멤버 목록 중에서 체크된 멤버를 제외한 나머지 멤버들만 남깁니다.
            const remainingMembers = selectedMembersDisplay.filter(
                (member) => !checkedList.includes(member.memberNo)
            );

            // 선택된 멤버 목록을 갱신합니다.
            setSelectedMembersDisplay(remainingMembers);
            setCheckedList([]);
        },
        [checkedList, selectedMembersDisplay]
    );

    /* >> 클릭 버튼 (전체선택) */
    const addAllMembersButton = () => {
        // 이미 선택된 멤버들의 memberNo 목록
        const selectedMemberNos = selectedMembersDisplay.map((selectedMember) => selectedMember.memberNo);

        // memberList에서 이미 선택된 멤버들을 제외한 멤버들의 목록
        const nonSelectedMembers = memberList.filter((member) => !selectedMemberNos.includes(member.memberNo));

        // 선택된 멤버들과 중복 없이 합친 후 state 업데이트
        setSelectedMembersDisplay((prev) => [...prev, ...nonSelectedMembers]);

        // 중복 없이 선택된 멤버들의 memberNo 목록
        const uniqueSelectedMemberNos = [...new Set([...selectedMemberNos, ...nonSelectedMembers.map((member) => member.memberNo)])];

        // 체크된 멤버 목록 갱신
        setCheckedList(uniqueSelectedMemberNos);
    };

    /* << 클릭 버튼 (전체 제거) */
    const removeAllMemberButton = () => {
        // selectedMembersDisplay를 빈 배열로 초기화
        setSelectedMembersDisplay([]);
        // 체크된 멤버 목록도 초기화
        setCheckedList([]);
    };

    /* 추가하기 버튼 */
    const addMemberList = () => {
        setMemberListOpen(false);


    }

    /* 쪽지 내용 */
    const onChangeHandler = e => {
        setMessage(e.target.value);

    }

    /* 쪽지 보내기 */
    const onClickMessageRegist = () => {

        form.msgContent = message;

        const receivers = selectedMembersDisplay.map((selectedMember) => selectedMember.memberNo);
        form.receivers = receivers;

        const formData = new FormData();
        formData.append("msgFile", fileInput.current.files[0]);
        formData.append("messageRequest", new Blob([JSON.stringify(form)], {type: 'application/json'}));
        dispatch(callMessageSendAPI({registRequest: formData}));

    }

    /* 목록으로 */
    const onClickBackMessage = () => {
        setWriteOpen(false);
        setMessage('');
        setFileName('');
        setSelectedMembersDisplay([]);
        setCheckedList([]);

    }

    return (
        <>
            <ToastContainer hideProgressBar={true} position="top-center"/>
            <Modal
                isOpen={writeOpen}
                ariaHideApp={false}
                style={customStyles}
                onRequestClose={onRequestCloseHandler}
            >
                <div className="message-write-title">쪽지쓰기</div>

                <div className="message-write-sub">
                    <div className="message-receiver">받는 사람</div>
                    <div className="message-receiverList">
                        {selectedMembersDisplay.map((selectedMember, index) => (
                            <span key={index}>
                             {selectedMember.memberName}({selectedMember.memberId})
                             </span>
                        ))}
                    </div>
                    <button onClick={onClickMemberListAdd} className="add-receiver">추가하기</button>
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
                        ref={fileInput}
                        name="msgFile"
                        onChange={onChangeFileUpload}
                    />
                    <input className="upload-name" value={fileName} placeholder="Sample 명단.pdf"/>
                </div>
                <div className="message-buttons">
                    <button className="message-reset" onClick={onClickDeleteContent}>삭제</button>
                    <button className="message-back" onClick={onClickBackMessage}>목록으로</button>
                    <button className="write-button" onClick={onClickMessageRegist}>쪽지쓰기</button>
                </div>
            </Modal>
            <Modal
                isOpen={memberListOpen}
                ariaHideApp={false}
                style={memberListStyles}
                onRequestClose={onMemberListCloseHandler}
            >
                <div className="modal-receiver-title">
                    <div className="modal-receiver-sub">받는 사람</div>
                    <div className="modal-receiver-search">
                        <input
                            type="text"
                            placeholder="검색어를 입력하세요"
                            onChange={onSearchMember}
                            onKeyUp={onEnterKeyHandler}
                        />
                    </div>
                </div>
                <div className="message-memberList-add">
                    <div className="message-memberList">
                        {memberList && memberList.map((member) => (
                            <label key={member.memberNo}>
                                <div className="memberList-item">
                                    <input
                                        type="checkbox"
                                        id={member.memberNo}
                                        checked={checkedList.includes(member.memberNo)}
                                        onChange={(e) => checkHandler(e, member.memberNo)}
                                    />
                                    {member.memberName}({member.memberId})
                                </div>
                            </label>
                        ))}
                    </div>
                    <div>
                        <div>
                            <button className="change-Allmember"
                                    onClick={addAllMembersButton}
                            >
                                &gt;&gt;</button>
                        </div>
                        <div>
                            <button className="change-member"
                                    onClick={addMemberButton}
                            >&gt;</button>
                        </div>
                        <div>
                            <button className="change-member"
                                    onClick={removeMemberButton}
                            >
                                &lt;</button>
                        </div>
                        <div>
                            <button className="delete-Allmember"
                                    onClick={removeAllMemberButton}
                            >
                                &lt;&lt;</button>
                        </div>
                    </div>
                    <div className="message-receive">
                        {selectedMembersDisplay.map((selectedMember, index) => (
                            <div key={index}
                                 className="memberList-item">{selectedMember.memberName}({selectedMember.memberId})</div>
                        ))}
                    </div>
                </div>
                <div className="modal-modal-button">
                    <div>
                        <button className="out-modal-modal">취소</button>
                    </div>
                    <div>
                        <button className="modal-modal-addButton" onClick={addMemberList}>추가하기</button>
                    </div>
                </div>
            </Modal>
            <div className="message-title">쪽지함</div>
            <div className="message-condition">
                <div className="message-select-button">
                    <button className={isNow ? 'receiveBox-button' : 'sendBox-button'}
                            onClick={() => receiveBox()}>받은
                        쪽지함
                    </button>
                    <button className={isNow ? 'sendBox-button' : 'receiveBox-button'} onClick={() => sendBox()}>보낸
                        쪽지함
                    </button>
                </div>
                <div className="message-period">
                    <input type="date" onChange={onStartDateChangeHandler}/> ~ <input type="date"
                                                                                      onChange={onEndDateChangeHandler}/>
                </div>
                <div>
                    <select className="message-select" onChange={onSelectChangeHandler}>
                        <option className="message-select-item" value="sender">이름</option>
                        <option className="message-select-item" value="content">내용</option>
                    </select>
                </div>
                <div className="message-search">
                    <input
                        type="text"
                        placeholder="검색어를 입력하세요"
                        onChange={onSearchChangeHandler}
                        onKeyUp={onReceiveEnterKeyHandler}
                    />
                </div>
                <div className="message-write-button">
                    <button className="message-write" onClick={onClickWriteMessage}>쪽지쓰기</button>
                </div>
            </div>
            {
                isNow && receiveMessages && (
                    <div className="message-table">
                        <MessageReceive data={receiveMessages.data}/>
                        <ReceivePagingBar pageInfo={receiveMessages.pageInfo} setCurrentPage={setCurrentPage}/>
                    </div>

                )}
            {
                !isNow && sendMessages && (
                    <div className="message-table">
                        <MessageSend data={sendMessages.data}/>
                        <ReceivePagingBar pageInfo={sendMessages.pageInfo} setCurrentPage={setSendCurrentPage}/>
                    </div>
                )
            }

        </>
    );
}

export default Message;