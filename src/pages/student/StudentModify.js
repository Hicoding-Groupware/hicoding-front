import {useNavigate, useParams} from "react-router-dom";
import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {callStudentDetailAPI, callStudentModifyAPI} from "../../apis/StudentAPICalls";
import Modal from "react-modal";
import DaumPostcode from "react-daum-postcode";
import DatePicker from "react-datepicker";
import {ko} from "date-fns/esm/locale";


function StudentModify() {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { stdCode } = useParams();
    const [isOpen, setIsOpen] = useState(false);
    const [form, setForm] = useState({});
    const [birthDate, setBirthDate] = useState(new Date());
    const { studentDetail, putSuccess } = useSelector(state => state.studentReducer);

    console.log(birthDate);

    useEffect(() => {
        dispatch(callStudentDetailAPI({stdCode}));
    }, []);

    useEffect(() => {
        setForm({...studentDetail});
        setBirthDate(new Date(studentDetail?.stdBirth));
    }, [studentDetail]);

    useEffect(() => {
        if(putSuccess === true) {
            navigate('/students', { replace : true })
        }
    }, [putSuccess]);

    const onChangeHandler = e => {
        setForm({
            ...form,
            [e.target.name] : e.target.value
        })
    }

    const customStyles = {
        overlay: {
            backgroundColor: "rgba(0,0,0,0.5)",
        },
        content: {
            left: "0",
            margin: "auto",
            width: "500px",
            height: "600px",
            padding: "0",
            overflow: "hidden",
        },
    };

    const onRequestCloseHandler = () => {
        setIsOpen(false);
    };

    const completeHandler = data => {
        setForm({
            ...form,
            postNo: data.zonecode,
            address : data.address
        });
        setIsOpen(false);
    }

    const searchAddress = () => {
        setIsOpen(!isOpen);
    }

    const onClickStudentUpdate = () => {
        form.stdBirth = birthDate;
        console.log(form.stdBirth);
        dispatch(callStudentModifyAPI({ stdCode, modifyRequest : form }))

    }

    return (
        <>
            <Modal isOpen={isOpen} ariaHideApp={false} style={customStyles} onRequestClose={ onRequestCloseHandler }>
                <DaumPostcode onComplete={ completeHandler } height="100%"/>
            </Modal>
            <div className="student-regist-title">원생 수정</div>
            { studentDetail && form.stdName &&
            <div className="student-regist-table">
                <div className="student-regist-input-first">
                    <div className="student-regist-sub">원생 이름(필수)</div>
                    <input
                        className="student-regist-input-name"
                        type="text"
                        placeholder="원생 이름을 입력해 주세요."
                        name='stdName'
                        value={ form.stdName }
                        onChange={ onChangeHandler }
                    />
                    <div className="student-regist-sub">성별(필수)</div>
                    <input
                        className="student-regist-input-gender"
                        type="radio"
                        name="stdGender"
                        id="radio1"
                        value='남자'
                        checked={ form.stdGender === '남자' }
                        onChange={ onChangeHandler }
                    />
                    <label className="radio-label1" htmlFor="radio1">남성</label>
                    <input
                        className="student-regist-input-gender"
                        type="radio"
                        name="stdGender"
                        id="radio2"
                        value='여자'
                        checked={ form.stdGender === '여자'}
                        onChange={ onChangeHandler }
                    />
                    <label className="radio-label2" htmlFor="radio2">여성</label>
                    <div className="student-regist-sub">생년월일(필수)</div>
                    <DatePicker
                        locale={ko}
                        selected={ birthDate }
                        onChange={ date => setBirthDate(date) }
                        dateFormat="yyyy-MM-dd"
                        placeholderText="YYYY/MM/DD"
                        className="student-regist-input-birth"
                        showYearDropdown

                    />
                    <div className="student-regist-sub">전화 번호(필수)</div>
                    <input
                        className="student-regist-input-phone"
                        type="tel"
                        placeholder="전화번호를 입력해 주세요."
                        name='stdPhone'
                        onChange={ onChangeHandler }
                        value={ form.stdPhone }
                    />
                    <div className="student-regist-sub">이메일</div>
                    <input
                        className="student-regist-input-email"
                        type="text"
                        placeholder="email@gmail.com"
                        name='stdEmail'
                        onChange={ onChangeHandler }
                        value={ form.stdEmail }
                    />
                </div>
                <div className="student-regist-input-second">
                    <div className="student-regist-sub">주소</div>
                    <div className="regist-postNo">
                        <input
                            className="student-regist-input-postNo"
                            type="text"
                            readOnly placeholder="우편번호"
                            value={ form.postNo }
                            name='postNo'
                            onChange={ onChangeHandler }
                        />
                        <button className="search-postNo" onClick={ searchAddress }>주소지 검색</button>

                    </div>
                    <div>
                        <input
                            className="student-regist-input-address"
                            type="text"
                            readOnly placeholder="주소를 입력해 주세요"
                            value={ form.address }
                            name='address'
                            onChange={ onChangeHandler }
                        />
                    </div>
                    <div>
                        <input
                            className="student-regist-input-detailAddress"
                            type="text"
                            placeholder="상세 주소"
                            name='detailAddress'
                            onChange={ onChangeHandler }
                            value={ form.detailAddress }
                        />
                    </div>
                    <div className="student-regist-sub">메모</div>
                    <div>
                        <textarea
                            className="student-regist-input-memo"
                            placeholder="메모를 입력해 주세요."
                            name='stdMemo'
                            onChange={ onChangeHandler }
                            value={ form.stdMemo }
                        />
                    </div>
                    <button className="regist-cancel" onClick={ () => navigate(-1) }>취소</button><button className="regist" onClick={ onClickStudentUpdate }>수정</button>
                </div>
            </div>
            }
        </>
    );

}

export default StudentModify;