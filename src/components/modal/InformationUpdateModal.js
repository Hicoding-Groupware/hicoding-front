import {useDispatch, useSelector} from "react-redux";
import React, {useEffect, useState} from "react";
import {InfoUpdateAPI, InfoUpdateWithoutPasswordAPI} from "../../apis/LoginAPICalls";
import {toast} from "react-toastify";
import DaumPostcode from "react-daum-postcode";
import Modal from "react-modal";
import {tr} from "date-fns/locale";
import {useNavigate} from "react-router-dom";


function InformationUpdateModal({profile,setInformationUpdateModal}){

    const {putSuccess} = useSelector(state => state.loginReducer);
    const [modifyMode, setModifyMode] = useState(false);
    const [info, setInfo] = useState({});
    const dispatch = useDispatch();
    const [open, setOpen] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {

            if (putSuccess === true) {
                alert('개인정보 업데이트를 완료했습니다.');
                window.location.replace("/profile");
            }

    }, [putSuccess]);


    const onChangeHandler = e => {
            setInfo({
                ...info,
                [e.target.name]: e.target.value
            })
    }

    const onClickInfoUpdateHandler = () => {

       if (!info.postNo || !info.address || !info.detailAddress || !info.memberEmail || !info.memberPhone || !info.memberBirth || !info.memberGender){
           toast.warning("수정하신 개인정보가 없습니다.");
       }else {
        dispatch(InfoUpdateWithoutPasswordAPI({InfoUpdateWithoutPasswordRequest : {...info, memberId : profile.memberId}}));
           }
    }

    const onClickModifyHandler = () => {
        setModifyMode(true);
         setInfo({...profile});


    }
    const inputStyle = !modifyMode ? { backgroundColor : 'rgba(0, 0, 0, 0.07)' } : null;

    /* ----------------------------- 모달 쪽  --------------------------*/

    const searchAddress = () => {
        setOpen(!open);
        setModifyMode(true);
        setInfo({...profile});
    };

    /* 모달이 아닌 다른 곳을 눌러도 모달리 닫히게 하는 핸들러 */
    const onRequestCloseHandler = () => {
        setOpen(false);
    };

    /* data를 넣는 핸들러 */
    const completeHandler = data =>{
        const zipcode = data.zonecode;
        setInfo({
            ...info,
            postNo : zipcode,
            address : data.address

        });
        setOpen(false);
    }

    const customStyles = {
        overlay: {
            backgroundColor: "rgba(0,0,0,0.5)",
            zIndex : '6'
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


    return(

        <>
            <Modal isOpen={open} ariaHideApp={false} style={customStyles} onRequestClose={onRequestCloseHandler}>
                <DaumPostcode onComplete={ completeHandler } height="100%"/>
            </Modal>

            <div className="info-box">


                <h3 style={{textAlign : "center", paddingTop : 40, fontSize : 30}}>Information</h3>
                <table style={{paddingLeft : 50}}>
                    <tbody>
                    <tr>
                        <td>
                            <input className="info-input1"
                                type="text"
                                name="postNo"
                                value={!modifyMode ? profile.postNo : info.postNo}
                                placeholder="우편번호"
                                onChange={onChangeHandler}
                                style = {inputStyle}
                                readOnly
                            />
                            <button  style={{ borderColor : 'rgba(117, 100, 166, 0.18)', margin : '0px 0px 0px 10px', height : 30, width : 49,
                                borderRadius : 8, background : '#5940a3', color : "white" }} onClick={searchAddress}>찾기</button>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <input className="info-input2"
                                type="text"
                                name="address"
                                value={!modifyMode ? profile.address : info.address}
                                placeholder="주소"
                                onChange={onChangeHandler}
                                style = {inputStyle}
                                readOnly
                            />
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <input
                                type="text" className="info-input2"
                                name="detailAddress"
                                placeholder="상세 주소를 입력하세요"
                                onChange={onChangeHandler}
                                onClick={onClickModifyHandler}
                                value={!modifyMode ? profile.detailAddress : info.detailAddress}
                                style = {inputStyle}
                                readOnly={!modifyMode}
                            />
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <input
                                type="text" className="info-input2"
                                name="memberEmail"
                                placeholder="이메일을 입력하세요"
                                onClick={onClickModifyHandler}
                                value={!modifyMode ? profile.memberEmail : info.memberEmail}
                                onChange={onChangeHandler}
                                style = {inputStyle}
                                readOnly={!modifyMode}
                            />
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <input
                                type="text" className="info-input2"
                                name="memberPhone"
                                placeholder="전화번호를 '-' 포함해서 입력하세요"
                                onChange={onChangeHandler}
                                onClick={onClickModifyHandler}
                                value={!modifyMode ? profile.memberPhone : info.memberPhone}
                                style = {inputStyle}
                                readOnly={!modifyMode}
                            />
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <input
                                type="text" className="info-input2"
                                name="memberBirth"
                                placeholder="생년월일8자리를 '-' 포함해서 입력하세요"
                                onChange={onChangeHandler}
                                onClick={onClickModifyHandler}
                                value={!modifyMode ? profile.memberBirth : info.memberBirth}
                                style = {inputStyle}
                                readOnly={!modifyMode}                            />
                        </td>
                    </tr>
                    <tr>
                        <td>

                            <input
                                type="radio" className="choose-gender"
                                name="memberGender"
                                value={!modifyMode ? profile.memberGender : "FEMALE"}
                                checked={info.memberGender === "FEMALE"}
                                onClick={onClickModifyHandler}
                                onChange={onChangeHandler}
                                style = {inputStyle}
                                readOnly={!modifyMode}

                            />
                            <label htmlFor="FEMALE">여성</label>


                            <input className="choose-gender"
                                   type="radio"
                                   name="memberGender"
                                   value={!modifyMode ? profile.memberGender : "MALE"}
                                   checked={info.memberGender === "MALE"}
                                   onClick={onClickModifyHandler}
                                   onChange={onChangeHandler}

                                   readOnly={!modifyMode}

                            />
                            <label htmlFor="MALE">남성</label>
                        </td>

                    </tr>
                    <tr>
                        <td>

                            <button className="modal-button"
                                    onClick={ onClickInfoUpdateHandler }
                                    style={{width : '125px', margin : '48px 10px 10px 0px', height : '45px',
                                    borderRadius :8, color : "white", borderColor : "white", fontWeight : "bolder", backgroundColor : "#583ea2", cursor : "pointer"}}

                            >
                                확인
                            </button>


                            <button className="modal-button"
                                    onClick={ () => setInformationUpdateModal(false)}
                                    style={{width : '125px', margin : '48px 0px 10px 0px',  height : '45px',
                                        borderRadius :8, color : "#583ea2", borderColor : "white", fontWeight : "bolder", backgroundColor : "#f3f3f3", cursor : "pointer"}}
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

export default InformationUpdateModal;