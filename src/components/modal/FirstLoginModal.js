import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import { useNavigate} from "react-router-dom";
import {InfoUpdateAPI} from "../../apis/LoginAPICalls";

function FirstLoginModal() {

    const {logins, putSuccess} = useSelector(state => state.loginReducer);
    const dispatch = useDispatch();
    const [info, setInfo] = useState({});
    const navigate = useNavigate();

    useEffect(() => {
        if (putSuccess === true){
             navigate('/login', {replace : true})  //{replace : true} 이렇게 하면 새로고침 안해도 된다.
        }
    }, [putSuccess, navigate]);


    const onChangeHandler = e => {
        setInfo({
            ...info,
            [e.target.name] : e.target.value
        })
    }

    const onClickInfoUpdateHandler = () => {
        dispatch(InfoUpdateAPI({InfoUpdateRequest : {...info,  memberId : logins.memberId}}));
    }


    const onClickCancelHandler = () => {
        window.location.replace("/login");
    }


    return (
        <>

            <div className="modal-div">
                <img src="https://github.com/Hicoding-Groupware/hicoding-front/assets/138549261/d9b5ccf5-fc91-499d-96f3-aba36daead46"
                style={{width : '140px'}}/>
                <h3>Information</h3>
                <p>개인정보를 추가로 입력해주세요</p>
                <table>
                    <tbody>
                    <tr>
                        <td>
                            <p style={{margin : '5px 0px 0px 0px', fontSize : '15px'}}>{logins.memberName}님 환영합니다</p>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <input
                                type="password"
                                style={{borderColor : 'rgba(117, 100, 166, 0.18)', height : '40px'}}
                                name="memberPwd"
                                placeholder="새로운 비밀번호를 입력하세요"
                                onChange={onChangeHandler}
                            />
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <input
                                type="text"
                                style={{width : '150px', borderColor : 'rgba(117, 100, 166, 0.18)', height : '40px'}}
                                name="postNo"
                                placeholder="우편번호"
                                onChange={onChangeHandler}
                            />
                            <button
                                style={{width : '130px', borderColor : 'rgba(117, 100, 166, 0.18)', height : '40px', margin : '0px 0px 0px 15px'}}>찾기</button>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <input
                                type="text"
                                style={{borderColor : 'rgba(117, 100, 166, 0.18)', height : '40px'}}
                                name="address"
                                placeholder="주소"
                                onChange={onChangeHandler}
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
                                placeholder="전화번호를 입력하세요"
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
                                placeholder="생년월일8자리를 입력하세요"
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
                                checked={info.memberGender == "FEMALE"}
                                onChange={onChangeHandler}
                            />
                          <label htmlFor="FEMALE">여성</label>


                            <input className="choose-gender"
                                   type="radio"
                                   style={{width: '20px', height : 'auto', position : "relative"}}
                                   name="memberGender"
                                   value="MALE"
                                   checked={info.memberGender == "MALE"}
                                   onChange={onChangeHandler}
                            />
                          <label htmlFor="MALE">남성</label>
                    </td>

                    </tr>
                    <tr>
                        <td>

                            <button className="modal-button"
                                    onClick={ onClickInfoUpdateHandler }
                                    style={{width : '150px', margin : '10px 10px 15px 0px', height : '45px'}}

                            >
                                확인
                            </button>


                            <button className="modal-button"
                                    onClick={ onClickCancelHandler }
                                    style={{width : '150px', margin : '10px 0px 15px 0px',  height : '45px'}}
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
