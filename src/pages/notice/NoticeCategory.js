import React from "react";
import {NavLink} from "react-router-dom";

function NoticeCategory() {
    return (
        <>
            <div className="notice-category">

                <NavLink to="/board/전체글보기/00">전체글보기</NavLink><br/>
                <NavLink to="/board/인기글/00">인기글</NavLink><br/>

                <p>전사게시판</p>
                <ul className="">
                    <li><NavLink to="/board/전사 공지/01">전사 공지</NavLink></li>
                    <li><NavLink to="/notification">전사 알림</NavLink></li>
                </ul>

                <p>부서게시판</p>

                <p>행정팀</p>
                <ul className="">
                    <li><NavLink to="/board/행정 공지/02">행정 공지</NavLink></li>
                    <li><NavLink to="/notification">행정 알림</NavLink></li>
                </ul>

                <p>강사팀</p>
                <ul className="">
                    <li><NavLink to="/board/강사 공지/03">강사 공지</NavLink></li>
                    <li><NavLink to="/notification">강사 알림</NavLink></li>
                </ul>

            </div>
        </>
    )
}

export default NoticeCategory