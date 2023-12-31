import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import {InfoFirstLoginUpdateAPI, InfoUpdateAPI} from "../../apis/LoginAPICalls";
import Modal from "react-modal";
import DaumPostcode from "react-daum-postcode";
import {toast, ToastContainer} from "react-toastify";
import {validateEmail, validatePassword} from "../../utils/Validation";
import DatePicker from "react-datepicker";
import { ko } from "date-fns/esm/locale";
import styled from 'styled-components';

/* date 스타일 */
const CustomDatePicker = styled(DatePicker)`
      border-color: rgba(117, 100, 166, 0.18);
      height: 40px;
      width: 300px;
      border-radius: 10px;
      text-indent: 10px;
      margin-top: 5px;
      margin-bottom: 5px;
    `;



function FirstLoginModal() {

    const {logins, putSuccess} = useSelector(state => state.loginReducer);
    const dispatch = useDispatch();
    const [info, setInfo] = useState({});
    const navigate = useNavigate();
    const [open, setOpen] = useState(false);
    const [passwordErrorMessage, setPasswordErrorMessage] = useState("");
    const [emailErrorMessage, setEmailErrorMessage] = useState("");
    const [number, setNumber] = useState("");
    const [memberBirth, setMemberBirth] = useState("");


    useEffect(() => {
        const updateAndNavigate = async () => {
            if (putSuccess === true) {
                alert('개인정보 업데이트를 완료했습니다.');
                await navigate('/login', {replace: true});  // await를 사용하여 navigate가 완료될 때까지 기다림
            }
        };

    }, [putSuccess, navigate]);


    const onChangeHandler = e => {
        setInfo({
            ...info,
            [e.target.name]: e.target.value
        })

        if (e.target.name === 'memberPwd') {
            setPasswordErrorMessage(
                validatePassword(e.target.value) ? "" : "숫자또는 특수문자가 포함되어 있어야 합니다."
            );
        }

        if (e.target.name === 'memberEmail') {
            setEmailErrorMessage(
                validateEmail(e.target.value) ? "" : "이메일 형식을 다시 확인해주세요"
            );
        }

        if (e.target.name === 'memberPhone') {
            const input = e.target.value.replace(/[^\d]/g, '');
            if (input.length <= 11) {
                setNumber(
                    input.replace(/(\d{3})(\d{4})(\d{4})/, '$1-$2-$3')
                );
            }
        }

    }

    const onClickInfoUpdateHandler = () => {
        console.log(info);
        if (!info.memberPwd || !info.postNo || !info.address || !info.detailAddress || !info.memberEmail || !number || !memberBirth || !info.memberGender) {
            toast.error('모든 항목을 입력해주세요.');
        } else {

            info.memberBirth = memberBirth;
            info.number = number;
            console.log(info);
            dispatch(InfoFirstLoginUpdateAPI({InfoUpdateRequest: {...info, memberId: logins.memberId}}));
        }
    }


    const onClickCancelHandler = () => {
        window.location.replace("/login");
    }


    /* ----------------------------- 모달 쪽  --------------------------*/

    const searchAddress = () => {
        setOpen(!open);
    };

    /* 모달이 아닌 다른 곳을 눌러도 모달리 닫히게 하는 핸들러 */
    const onRequestCloseHandler = () => {
        setOpen(false);
    };

    /* data를 넣는 핸들러 */
    const completeHandler = data => {
        const zipcode = data.zonecode;
        setInfo({
            ...info,
            postNo: zipcode,
            address: data.address

        });
        setOpen(false);
    }

    const customStyles = {
        overlay: {
            backgroundColor: "rgba(0,0,0,0.5)",
            zIndex: '6'
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




    return (
        <>

            <Modal isOpen={open} ariaHideApp={false} style={customStyles} onRequestClose={onRequestCloseHandler}>
                <DaumPostcode onComplete={completeHandler} height="100%"/>
            </Modal>

            <div className="modal-div">
                <img
                    src="https://github.com/Hicoding-Groupware/hicoding-front/assets/138549261/d9b5ccf5-fc91-499d-96f3-aba36daead46"
                    style={{width: '110px', position: 'relative', top: '40px', right: '120px'}}/>
                <h3>Information</h3>
                <p>개인정보를 추가로 입력해주세요</p>
                <table>
                    <tbody>
                    <tr>
                        <td>
                            <p style={{margin: '5px 0px 0px 0px', fontSize: '15px'}}>{logins.memberName}님 환영합니다</p>
                        </td>
                    </tr>
                    <tr style={{display: "grid"}}>
                        <td>
                            <input className="login-input"
                                type="password"
                                style={{borderColor: 'rgba(117, 100, 166, 0.18)', height: '40px'}}
                                value={info.password}
                                name="memberPwd"
                                placeholder="새로운 비밀번호를 입력하세요(영문자)"
                                onChange={onChangeHandler}
                            />
                        </td>
                        <td style={{color: "red", fontSize: 10}}>
                            {passwordErrorMessage}
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <input className="login-input"
                                type="text"
                                style={{width: '150px', borderColor: 'rgba(117, 100, 166, 0.18)', height: '40px'}}
                                name="postNo"
                                value={info.postNo}
                                placeholder="우편번호"
                                onChange={onChangeHandler}
                                readOnly
                            />
                            <button
                                className="modal-button"
                                style={{
                                width: '130px',
                                borderColor: 'rgba(117, 100, 166, 0.18)',
                                height: '40px',
                                margin: '0px 0px 0px 10px',
                                cursor: "pointer"
                            }} onClick={searchAddress}>찾기
                            </button>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <input className="login-input"
                                type="text"
                                style={{borderColor: 'rgba(117, 100, 166, 0.18)', height: '40px'}}
                                name="address"
                                value={info.address}
                                placeholder="주소"
                                onChange={onChangeHandler}
                                readOnly
                            />
                        </td>

                    </tr>
                    <tr>
                        <td>
                            <input className="login-input"
                                type="text"
                                style={{borderColor: 'rgba(117, 100, 166, 0.18)', height: '40px'}}
                                value={info.detail}
                                name="detailAddress"
                                placeholder="상세 주소를 입력하세요"
                                onChange={onChangeHandler}

                            />
                        </td>
                    </tr>
                    <tr style={{display: "grid"}}>
                        <td>
                            <input className="login-input"
                                type="text"
                                style={{borderColor: 'rgba(117, 100, 166, 0.18)', height: '40px'}}
                                value={info.email}
                                name="memberEmail"
                                placeholder="이메일을 입력하세요"
                                onChange={onChangeHandler}

                            />
                        </td>
                        <td style={{color: "red", fontSize: 10}}>
                            {emailErrorMessage}
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <input className="login-input"
                                type="text"
                                style={{borderColor: 'rgba(117, 100, 166, 0.18)', height: '40px'}}
                                value={number}
                                name="memberPhone"
                                placeholder="전화번호를 입력하세요"
                                onChange={onChangeHandler}
                            />
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <CustomDatePicker
                                locale={ko}
                                selected={memberBirth}
                                onChange={date => setMemberBirth(date)}
                                dateFormat="yyyy-MM-dd"
                                placeholderText="생년월일을 선택해주세요"
                                showYearDropdown
                                />
                        </td>
                    </tr>
                    <tr>
                        <td>

                            <input
                                type="radio" className="choose-gender"
                                style={{width: '20px', height: 'auto'}}
                                name="memberGender"
                                value="FEMALE"
                                checked={info.memberGender === "FEMALE"}
                                onChange={onChangeHandler}
                            />
                            <label htmlFor="FEMALE">여성</label>


                            <input className="choose-gender"
                                   type="radio"
                                   style={{width: '20px', height: 'auto', position: "relative"}}
                                   name="memberGender"
                                   value="MALE"
                                   checked={info.memberGender === "MALE"}
                                   onChange={onChangeHandler}
                            />
                            <label htmlFor="MALE">남성</label>
                        </td>

                    </tr>
                    <tr>
                        <td>

                            <button className="modal-button"
                                    onClick={onClickInfoUpdateHandler}
                                    style={{
                                        width: '150px',
                                        margin: '10px 10px 40px 0px',
                                        height: '45px',
                                        cursor: "pointer"
                                    }}

                            >
                                확인
                            </button>


                            <button className="modal-button"
                                    onClick={onClickCancelHandler}
                                    style={{
                                        width: '150px',
                                        margin: '10px 0px 40px 0px',
                                        height: '45px',
                                        cursor: "pointer"
                                    }}
                            >
                                취소
                            </button>
                        </td>
                    </tr>

                    </tbody>
                </table>

            </div>

        </>
    );
}

export default FirstLoginModal;
