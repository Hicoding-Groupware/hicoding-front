import React, {useEffect} from "react";
import {NavLink} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {callMemberRoleToNumberAPI} from "../../apis/MemberAPICalls";

function NoticeCategory() {

    const dispatch = useDispatch()
    const {profileInfo} = useSelector(state => state.memberReducer);
    const {convertedMemberRole} = useSelector(state => state.memberRoleReducer);

    useEffect(() => {
        dispatch(callMemberRoleToNumberAPI());
    }, []);

    return (
        <>
            <div className="notice-category">

                <NavLink to="/board/전체글보기/00" >전체글보기</NavLink><br/>
                <NavLink to="/board/인기글/00">인기글</NavLink><br/>

                <p>전사게시판</p>
                <ul className="">
                    <li><NavLink to="/board/전체글보기/01">전사공지</NavLink></li>
                </ul>

                <p>부서게시판</p>

                <p>행정팀</p>
                <ul className="">
                    <li><NavLink to="/board/행정공지/02">행정공지</NavLink></li>
                </ul>

                <p>강사팀</p>
                <ul className="">
                    <li><NavLink to="/board/강사공지/03">강사공지</NavLink></li>
                </ul>

            </div>
        </>
    )
}

export default NoticeCategory