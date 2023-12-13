import {useEffect, useRef, useState} from "react";
import {callMemberProfileAPI, InfoUpdateProfileAPI} from "../../apis/MemberAPICalls";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import login from "../../pages/member/Login";
import {toast} from "react-toastify";

function ImageUpload ({profile, setOpenUpload}) {
    const imageInput = useRef();
    const [imageUrl, setImageUrl] = useState('');
    const [form, setForm] = useState({memberId : profile.memberId});
    const dispatch = useDispatch();
    const loginReducer = useSelector(state => state.loginReducer);
    const navigate = useNavigate();



    useEffect(() => {
        if(loginReducer.postSuccess === true) {
            setOpenUpload(false);
        }
    }, [loginReducer]);


    const onClickImageUpload = () => {
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

        const formData = new FormData();
        formData.append("memberProfile", imageInput.current.files[0]);

    }

    const onClickMemberRegistrationHandler = () => {
        /* 서버로 전달한 FormData 형태의 객체 설정 */
        const formData = new FormData();
        formData.append("memberProfile", imageInput.current.files[0]);
        formData.append("memberProfileUpdate", new Blob([JSON.stringify(form)], { type : 'application/json' }));

        if (imageUrl === ''){
            toast.warning("업로드할 파일이 없습니다");
        }else {
            dispatch(InfoUpdateProfileAPI({registRequest : formData }));

        }

    }
    return (
        <div className="imageUpload">
            { imageUrl &&
                <img
                    className="member-profile-img"
                    alt="preview"
                    src={ imageUrl }
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
                onClick={ onClickImageUpload }
            >
                이미지 업로드
            </button>
            <button
                onClick={ onClickMemberRegistrationHandler }
            >
                이미지 등록
            </button>
            <button
                onClick={ () => {setOpenUpload(false)} }
            >
                이미지 등록 취소
            </button>

        </div>

    );
}

export default ImageUpload;