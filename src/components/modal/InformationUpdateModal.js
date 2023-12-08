import {useSelector} from "react-redux";
import React, {useState} from "react";

function InformationUpdateModal(){

    const {logins} = useSelector(state => state.loginReducer);
    const [info, setInfo] = useState({});
    

    const onChangeHandler = e => {
        setInfo({
            ...info,
            [e.target.name] : e.target.value
        })
    }

    return(

        <>
            <div>
                <h3>Information</h3>
                <p>개인정보를 추가로 입력해주세요</p>
                <table>
                    <tbody>

                    <tr>
                        <td>
                            <input
                                type="text"
                                style={{width : '150px', borderColor : 'rgba(117, 100, 166, 0.18)', height : '40px'}}
                                name="postNo"
                                value={info.postNo}
                                placeholder="우편번호"
                                onChange={onChangeHandler}
                                readOnly
                            />
                            <button style={{width : '130px', borderColor : 'rgba(117, 100, 166, 0.18)', height : '40px', margin : '0px 0px 0px 15px'}} onClick={searchAddress}>찾기</button>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <input
                                type="text"
                                style={{borderColor : 'rgba(117, 100, 166, 0.18)', height : '40px'}}
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
                            <input
                                type="text"
                                style={{borderColor : 'rgba(117, 100, 166, 0.18)', height : '40px'}}
                                name="detailAddress"
                                placeholder="상세 주소를 입력하세요"
                                onChange={onChangeHandler}

                            />
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <input
                                type="text"
                                style={{borderColor : 'rgba(117, 100, 166, 0.18)', height : '40px'}}
                                name="memberEmail"
                                placeholder="이메일을 입력하세요"
                                onChange={onChangeHandler}

                            />
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <input
                                type="text"
                                style={{borderColor : 'rgba(117, 100, 166, 0.18)', height : '40px'}}
                                name="memberPhone"
                                placeholder="전화번호를 '-' 포함해서 입력하세요"
                                onChange={onChangeHandler}
                            />
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <input
                                type="text"
                                style={{borderColor : 'rgba(117, 100, 166, 0.18)', height : '40px'}}
                                name="memberBirth"
                                placeholder="생년월일8자리를 '-' 포함해서 입력하세요"
                                onChange={onChangeHandler}
                            />
                        </td>
                    </tr>
                    <tr>
                        <td>

                            <input
                                type="radio" className="choose-gender"
                                style={{width: '20px', height : 'auto'}}
                                name="memberGender"
                                value="FEMALE"
                                checked={info.memberGender === "FEMALE"}
                                onChange={onChangeHandler}
                            />
                            <label htmlFor="FEMALE">여성</label>


                            <input className="choose-gender"
                                   type="radio"
                                   style={{width: '20px', height : 'auto', position : "relative"}}
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
                                    onClick={ onClickInfoUpdateHandler }
                                    style={{width : '150px', margin : '10px 10px 40px 0px', height : '45px'}}

                            >
                                확인
                            </button>


                            <button className="modal-button"
                                    onClick={ onClickCancelHandler }
                                    style={{width : '150px', margin : '10px 0px 40px 0px',  height : '45px'}}
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