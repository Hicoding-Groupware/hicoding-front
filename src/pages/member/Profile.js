import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {callMemberProfileAPI, callMemberProfileRemoveAPI} from "../../apis/MemberAPICalls";
import InformationUpdateModal from "../../components/modal/InformationUpdateModal";
import {ToastContainer} from "react-toastify";
import PasswordUpdateModal from "../../components/modal/PasswordUpdateModal";
import ImageUpload from "../../components/modal/ImageUpload";
import {tr} from "date-fns/locale";
import ImageModify from "../../components/modal/ImageModify";

function Profile() {
    const [informationUpdateModal, setInformationUpdateModal] = useState(false);
    const [passwordUpdateModal, setPasswordUpdateModal] = useState(false);
    const [openUpload, setOpenUpload] = useState(false);
    const [openModify, setOpenModify] = useState(false);
    const {profileInfo} = useSelector(state => state.memberReducer);
    const [isTableVisible, setTableVisible] = useState(false);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(callMemberProfileAPI());
        console.log("여기있써~~~~~~~~~~~~~~~~~", profileInfo);
    }, []);

    const onClickInfoUpdateHandler = () => {
        setInformationUpdateModal(true);

    }
    const onClickPasswordUpdateHandler = () => {
        setPasswordUpdateModal(true);


    }
    const onClickChoose = () => {
        setTableVisible(!isTableVisible);
    }
    const onRequestCloseHandler = () => {
        setTableVisible(false);
    };

    /*--------------------------------- 이미지 onClickHandler ---------------------------------------*/

    const onClickImageUpload = () => {
        setOpenUpload(true);
    }

    const onClickImageModify = () => {
        setOpenModify(true);
    }

    const onCLickDeleteImage = () => {
        dispatch(callMemberProfileRemoveAPI());
    }


    return (
        <>
            <ToastContainer hideProgressBar={true} position="top-center"/>
            {
                informationUpdateModal &&
                <InformationUpdateModal
                    profile={profileInfo}
                    setInformationUpdateModal={setInformationUpdateModal}
                />
            }
            {
                passwordUpdateModal &&
                <PasswordUpdateModal
                    profile={profileInfo}
                    setPasswordUpdateModal={setPasswordUpdateModal}
                />
            }
            {
                openUpload &&
                <ImageUpload
                    profile={profileInfo}
                    setOpenUpload={setOpenUpload}
                />
            }

            {
                openModify &&
                <ImageModify
                    profile={profileInfo}
                    setOpenModify={setOpenModify}
                />
            }

            {
                profileInfo &&
                <>
                    <div className="profile-main">
                        <h1 style={{paddingLeft: 135, paddingTop: 20, paddingBottom: 10}}>MyPage</h1>
                        <table className="profile-img">
                            <thead>
                            <tr>
                                <td>

                                    <div style={{
                                        height: 150, width: 150, borderRadius: 100, position: "relative"
                                        , display: "inline-flex", border: "1px solid rgba(7, 7, 7, 0.16)",
                                        left: 10
                                    }}>
                                        {profileInfo.memberProfile === null ? (
                                            <img
                                                style={{
                                                    position: "absolute",
                                                    top: 0,
                                                    left: 0,
                                                    width: "100%",
                                                    height: "100%",
                                                    borderRadius: 100
                                                }}
                                                src="img/noUser.png"/>

                                        ) : (
                                            <img style={{
                                                position: "absolute",
                                                top: 0,
                                                left: 0,
                                                width: "100%",
                                                height: "100%",
                                                borderRadius: 100
                                            }} src={profileInfo.memberProfile}/>

                                        )}


                                    </div>
                                    <div style={{
                                        height: 20,
                                        width: 20,
                                        borderRadius: 100,
                                        position: "relative"
                                        ,
                                        display: "inline-flex",
                                        border: "1px solid white",
                                        right: 40,
                                        backgroundColor: "white",
                                        cursor: "pointer"
                                    }}>
                                        <img style={{
                                            position: "absolute",
                                            top: 2,
                                            left: 2,
                                            width: "15px",
                                            height: "15px",
                                            borderRadius: 5
                                        }}
                                             src="img/camera.png"
                                             onClick={onClickChoose}/>
                                    </div>
                                </td>
                            </tr>
                            </thead>
                            <tbody>
                            <tr style={{height: 10}}>
                                <td style={{height: 10}}>
                                    <p style={{
                                        fontWeight: "bolder",
                                        fontSize: 20,
                                        marginBottom: 0
                                    }}>{profileInfo.memberName}</p>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <button onClick={onClickPasswordUpdateHandler} className="profile-password">비밀번호
                                        변경
                                    </button>
                                </td>
                            </tr>
                            </tbody>
                        </table>
                        <table className="profile-submain">
                            <thead>
                            <tr>
                                <td>
                                    <h1 style={{paddingLeft: 50, paddingBottom: 45, paddingTop: 20}}>
                                        {profileInfo.memberName}
                                    </h1>
                                </td>
                            </tr>
                            </thead>
                            <tbody>
                            <tr>
                                <td>
                                    <p style={{paddingLeft: 50}}>사번</p>
                                </td>
                                <td className="sub-td">
                                    <p>{profileInfo.memberId}</p>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <p style={{paddingLeft: 50}}>부서</p>
                                </td>
                                <td className="sub-td">
                                    <p>{profileInfo.memberRole}</p>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <p style={{paddingLeft: 50}}>연락처</p>
                                </td>
                                <td className="sub-td">
                                    <p>{profileInfo.memberPhone}</p>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <p style={{paddingLeft: 50}}>이메일</p>
                                </td>
                                <td className="sub-td">
                                    <p>{profileInfo.memberEmail}</p>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <p style={{paddingLeft: 50, paddingBottom: 30}}>입사일</p>

                                </td>
                                <td className="sub-td">
                                    <p>{profileInfo.joinedAt}</p>
                                </td>
                            </tr>

                            </tbody>
                        </table>
                        <button onClick={onClickInfoUpdateHandler} className="info-fix">개인정보 수정</button>
                    </div>
                    <div style={{display: isTableVisible ? 'flex' : 'none', height: 0}} className="td-test"
                         onClick={onRequestCloseHandler}>
                        {isTableVisible &&
                            (
                                <table className="choose-profile-sub">
                                    <tbody>
                                    <tr>
                                        <td onClick={onCLickDeleteImage}
                                            style={{borderBottom: "1px solid rgba(0, 0, 0, 0.09)"}}>기본 이미지
                                        </td>
                                    </tr>
                                    {
                                        profileInfo.memberProfile === null ? (
                                            <tr>
                                                <td onClick={onClickImageUpload}>프로필 업로드</td>
                                            </tr>
                                        ) : (
                                            <tr>
                                                <td onClick={onClickImageModify}>프로필 수정</td>
                                            </tr>
                                        )

                                    }

                                    </tbody>
                                </table>
                            )}
                    </div>
                </>
            }
        </>
    );

}

export default Profile;