import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {callMemberProfileAPI} from "../../apis/MemberAPICalls";

function NoticeProfile() {
    const dispatch = useDispatch()

    const {profileInfo} = useSelector(state => state.memberReducer);

    useEffect(() => {
        dispatch(callMemberProfileAPI());
    }, []);

    return (
        <>
            {profileInfo &&
                <div className="notice-memberInfo">
                    <p>이름: {profileInfo.memberName} </p>
                    <p>가입일: {profileInfo.joinedAt} </p>
                    <p>권한: {profileInfo.memberRole} </p>
                </div>
            }
        </>
    )
}

export default NoticeProfile