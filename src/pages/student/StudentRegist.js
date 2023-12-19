import DaumPostcode from "react-daum-postcode";
import React, {useEffect, useState} from "react";
import Modal from "react-modal";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {useDispatch, useSelector} from "react-redux";
import {callStudentRegistAPI} from "../../apis/StudentAPICalls";
import { ko } from "date-fns/esm/locale";
import {useNavigate} from "react-router-dom";
import {validateEmail, validateName} from "../../utils/Validation";
import {toast, ToastContainer} from "react-toastify";
import {resetSuccess} from "../../modules/StudentModule";
import styled from 'styled-components';

function StudentRegist() {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [isOpen, setIsOpen] = useState(false);
    const [form, setForm] = useState({});
    const [birthDate, setBirthDate] = useState('');
    const { postSuccess } = useSelector(state => state.studentReducer);
    const [nameErrorMessage, setNameErrorMessage] = useState('');
    const [emailErrorMessage, setEmailErrorMessage] = useState('');
    const [phoneNumber, setPhoneNumber] = useState("");

    useEffect(() => {
        if(postSuccess === true) {
           navigate('/students', { replace : true });
           dispatch(resetSuccess('postSuccess'));
            //window.location.replace("/students");
        }
    }, [postSuccess]);


    const completeHandler = data => {

        setForm({
            ...form,
            postNo : data.zonecode,
            address : data.address
        });
        setIsOpen(false);
    }


    const onChangeHandler = e => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })

        if (e.target.name === 'stdName') {
            setNameErrorMessage(
                validateName(e.target.value) ? "" : "이름 형식을 다시 확인해주세요."
            );
        }

        if (e.target.name === 'stdEmail') {
            setEmailErrorMessage(
                validateEmail(e.target.value) ? "" : "이메일 형식을 다시 확인해주세요."
            );
        }
        if (e.target.name === 'stdPhone') {
        const input = e.target.value.replace(/[^\d]/g, '');
        if (input.length <= 11) {
            setPhoneNumber(
                input.replace(/(\d{3})(\d{4})(\d{4})/, '$1-$2-$3')
            );
        }
    }


    }

    const onRequestCloseHandler = () => {
        setIsOpen(false);
    };


    const searchAddress = () => {
        setIsOpen(!isOpen);
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

    const onClickStudentRegist = () => {
        if (!form.stdName || !form.stdGender || !birthDate || !form.stdPhone ) {
            toast.error("필수 항목을 모두 입력해 주세요.");
            return;
        }

        if(!validateName(form.stdName)) {
            toast.error("이름 형식을 다시 확인해주세요");
            return;
        }

        form.stdBirth = birthDate;
        dispatch(callStudentRegistAPI({registRequest : form }));

    }

    const CustomDatePicker = styled(DatePicker)`
      margin-top: 8px;
      display: flex;
      width: 416px;
      height: 40px;
      padding-left: 16px;
      align-items: center;
      gap: 8px;
      flex: 1 0 0;
      align-self: stretch;
      border-radius: 8px;
      border: 1px solid #CED4DA;
    `;

    return (
        <>
            <ToastContainer hideProgressBar={true} position="top-center"/>
            <Modal isOpen={isOpen} ariaHideApp={false} style={customStyles} onRequestClose={ onRequestCloseHandler }>
                <DaumPostcode onComplete={ completeHandler } height="100%"/>
            </Modal>
            <div className="student-regist-title">원생 등록</div>
            <div className="student-regist-table">

                <div className="student-regist-input-first">
                    <div className="student-regist-sub">원생 이름(필수)</div>
                    <input
                        className="student-regist-input-name"
                        type="text"
                        placeholder="원생 이름을 입력해 주세요."
                        name='stdName'
                        onChange={ onChangeHandler }
                        maxLength={4}
                    />
                    <span className="emailValid">{nameErrorMessage}</span>
                    <div className="student-regist-sub">성별(필수)</div>
                    <input
                        className="student-regist-input-gender"
                        type="radio"
                        name="stdGender"
                        id="radio1"
                        value='남자'
                        onChange={ onChangeHandler }
                    />
                    <label className="radio-label1" htmlFor="radio1">남성</label>
                    <input
                        className="student-regist-input-gender"
                        type="radio"
                        name="stdGender"
                        id="radio2"
                        value='여자'
                        onChange={ onChangeHandler }
                    />
                    <label className="radio-label2" htmlFor="radio2">여성</label>
                    <div className="student-regist-sub">생년월일(필수)</div>
                    <CustomDatePicker
                        locale={ko}
                        selected={birthDate}
                        onChange={date => setBirthDate(date)}
                        dateFormat="yyyy-MM-dd"
                        placeholderText="YYYY/MM/DD"
                        showYearDropdown
                    />
                    <div className="student-regist-sub">전화 번호(필수)</div>
                    <input
                        className="student-regist-input-phone"
                        type="tel"
                        placeholder="전화번호를 입력해 주세요."
                        name='stdPhone'
                        onChange={ onChangeHandler }
                        value={phoneNumber}
                    />
                    <div className="student-regist-sub">이메일</div>
                    <input
                        className="student-regist-input-email"
                        type="text"
                        placeholder="email@gmail.com"
                        name='stdEmail'
                        onChange={ onChangeHandler }
                    />
                    <span className="emailValid">{emailErrorMessage}</span>
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
                        />
                    </div>
                    <div className="student-regist-sub">메모</div>
                    <div>
                        <textarea
                            className="student-regist-input-memo"
                            placeholder="메모를 입력해 주세요."
                            name='stdMemo'
                            onChange={ onChangeHandler }
                        />
                    </div>
                    <button className="regist-cancel" onClick={ () => navigate(-1) }>취소</button><button className="regist" onClick={ onClickStudentRegist }>등록</button>
                </div>
            </div>
        </>
    );
}

export default StudentRegist;