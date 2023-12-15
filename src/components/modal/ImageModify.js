import {useEffect, useRef, useState} from "react";
import {callMemberProfileAPI, callMemberProfileModifyAPI, InfoUpdateProfileAPI} from "../../apis/MemberAPICalls";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import {toast} from "react-toastify";

function ImageModify ({profile, setOpenModify}) {
    const imageInput = useRef();
    const [form, setForm] = useState({memberId : profile.memberId});
    const [imageUrl, setImageUrl] = useState('');
    const dispatch = useDispatch();
    const loginReducer = useSelector(state => state.loginReducer);
    const navigate = useNavigate();



    useEffect(() => {
        if(loginReducer.putSuccess === true) {
            setOpenModify(false);
            dispatch(callMemberProfileAPI());

        }
    }, [loginReducer]);


    const onClickImageModify = () => {
        imageInput.current.click();
    }

    const onChangeImageUpload = () => {
        const fileReader = new FileReader();
        fileReader.onload = e => {
            const { result } = e.target;
            if(result) setImageUrl(result);
        }
        if(imageInput.current.files[0])
            fileReader.readAsDataURL(imageInput.current.files[0]);


    }

    const onClickMemberRegistrationHandler = () => {
        /* 서버로 전달한 FormData 형태의 객체 설정 */
        const formData = new FormData();
        formData.append("memberProfile", imageInput.current.files[0]);
        formData.append("memberProfileUpdate", new Blob([JSON.stringify(form)], { type : 'application/json' }));


            dispatch(callMemberProfileModifyAPI({registRequest : formData }));


    }
    return (
        <div className="imageUpload">
            { profile &&
                <img
                    className="member-profile-img"
                    alt="preview"
                    src={ !imageUrl ? profile.memberProfile : imageUrl }
                />
            }
            <input
                style={{display: 'none'}}
                type="file"
                name='memberProfile'
                accept='image/jpg,image/png,image/jpeg,image/gif'
                onChange={onChangeImageUpload}
                ref={imageInput}
            />
            <button
                className="product-image-button"
                onClick={ onClickImageModify }
            >
                이미지 업로드
            </button>
            <button
                onClick={ onClickMemberRegistrationHandler }
            >
                이미지 수정
            </button>
            <button
                onClick={ () => {setOpenModify(false)} }
            >
                이미지 수정 취소
            </button>

        </div>

    );
}

export default ImageModify;