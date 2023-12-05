import {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import { useNavigate} from "react-router-dom";
import {InfoUpdateAPI} from "../../apis/LoginAPICalls";

function FirstLoginModal() {

    const {logins} = useSelector(state => state.loginReducer);
    const dispatch = useDispatch();
    const [info, setInfo] = useState({});
    const navigate = useNavigate();

    const onChangeHandler = e => {
        setInfo({
            ...info,
            [e.target.name] : e.target.value
        })
    }

    const onClickInfoUpdateHandler = () => {
        setInfo({
            ...info,
            memberId : logins.memberId
        });
        dispatch(InfoUpdateAPI({InfoUpdateRequest : info}));
    }


    const onClickCancelHandler = () => {
        navigate("/login");
    }


    return (
        <>

            <div>

                <input
                    type="password"
                    name="memberPwd"
                    placeholder="새로운 비밀번호를 입력하세요"
                    onChange={onChangeHandler}
                />
                <input
                    type="text"
                    name="postNo"
                    placeholder="우편번호"
                    onChange={onChangeHandler}
                />
                <input
                    type="text"
                    name="address"
                    placeholder="주소"
                    onChange={onChangeHandler}
                />
                <input
                    type="text"
                    name="detailAddress"
                    placeholder="상세 주소를 입력하세요"
                    onChange={onChangeHandler}
                />
                <input
                    type="text"
                    name="memberEmail"
                    placeholder="이메일을 입력하세요"
                    onChange={onChangeHandler}
                />
                <input
                    type="text"
                    name="memberPhone"
                    placeholder="전화번호를 입력하세요"
                    onChange={onChangeHandler}
                />
                <input
                    type="text"
                    name="memberBirth"
                    placeholder="생년월일8자리를 입력하세요"
                    onChange={onChangeHandler}
                />

                <input
                    type="radio"
                    name="memberGender"
                    value="female"
                    checked={info.memberGender == "female"}
                    onChange={onChangeHandler}
                />
                <label htmlFor="female">여성</label>

                <input
                    type="radio"
                    name="memberGender"
                    value="male"
                    checked={info.memberGender == "male"}
                    onChange={onChangeHandler}
                />
                <label htmlFor="male">남성</label>


                <button
                    onClick={ onClickInfoUpdateHandler }
                >
                    확인
                </button>
                <button
                    onClick={ onClickCancelHandler }
                >
                    취소
                </button>

            </div>

        </>
    );
}

export default FirstLoginModal;
