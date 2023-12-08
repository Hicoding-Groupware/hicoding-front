import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {callMemberProfileAPI} from "../../apis/MemberAPICalls";

function Profile() {

    const dispatch = useDispatch();
    const {profileInfo} = useSelector(state => state.memberReducer);

    useEffect(() => {
        dispatch(callMemberProfileAPI());
    }, []);


    return (
        <>
            {
                profileInfo &&
                <div className="profile-main">
                    <h1 style={{paddingLeft : 135, paddingTop : 20, paddingBottom : 10}}>MyPage</h1>
                    <table className="profile-img">
                        <thead>
                        <tr>
                            <td>
                                {profileInfo.memberProfile}
                            </td>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <td>
                                <p style={{fontWeight : "bolder", fontSize : 20}}>{profileInfo.memberName}</p>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <button className="profile-password">비밀번호 변경</button>
                            </td>
                        </tr>
                        </tbody>
                    </table>
                    <table className="profile-submain">
                        <thead>
                        <tr>
                            <td>
                                <h1 style={{paddingLeft : 50, paddingBottom : 45, paddingTop : 20}}>
                                    {profileInfo.memberName}
                                </h1>
                            </td>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <td>
                                <p style={{paddingLeft : 50}}>사번</p>
                            </td>
                            <td className="sub-td">
                                <p>{profileInfo.memberId}</p>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <p style={{paddingLeft : 50}}>부서</p>
                            </td>
                            <td className="sub-td">
                                <p>{profileInfo.memberRole}</p>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <p style={{paddingLeft : 50}}>연락처</p>
                            </td>
                            <td className="sub-td">
                                <p>{profileInfo.memberPhone}</p>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <p style={{paddingLeft : 50}}>이메일</p>
                            </td>
                            <td className="sub-td">
                                <p>{profileInfo.memberEmail}</p>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <p style={{paddingLeft : 50, paddingBottom : 30}}>입사일</p>

                            </td>
                            <td className="sub-td">
                                <p>{profileInfo.joinedAt}</p>
                            </td>
                        </tr>

                        </tbody>
                        <button className="info-fix">개인정보 수정</button>
                    </table>
                </div>
            }
        </>
    );

}

export default Profile;