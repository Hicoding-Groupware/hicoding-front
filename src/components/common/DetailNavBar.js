import {NavLink} from "react-router-dom";
import {MEMBER_PATH} from "../../apis/MemberAPICalls";
import React from "react";

function DetailNavBar(){



    return(
        <div className="nav-detail">
            <ul className="nav-detail-ul">
                <li>
                    <ul>
                        <li><NavLink to={MEMBER_PATH + '/creation' }>사원생성</NavLink></li>
                        <li><NavLink to={MEMBER_PATH + '/detailsView' }>사원관리</NavLink></li>
                    </ul>
                    <ul>
                        <li><NavLink to="/studentRegist">원생등록</NavLink></li>
                        <li><NavLink to="/students">원생조회</NavLink></li>
                    </ul>
                    <ul>
                        <NavLink to="/lecture"><li>강의관리</li></NavLink>
                        <NavLink to="/courses"><li>과정관리</li></NavLink>
                        {<NavLink to="/course-regist"><li>과정등록</li></NavLink>}

                        <li>내강의</li>
                        <li>출석부</li>
                    </ul>
                    <ul>
                        <NavLink to="/schedule/academy"><li>학원일정</li></NavLink>
                        <NavLink to="/schedule/course"><li>과정일정</li></NavLink>
                        <NavLink to="/schedule/classroom"> <li>강의실 일정</li></NavLink>
                    </ul>
                    <ul>
                        <li>자료실</li>
                        <li>공지사항</li>
                    </ul>
                    <ul>
                        <li>쪽지 쓰기</li>
                        <li>받은 쪽지함</li>
                        <li>보낸 쪽지함</li>
                    </ul>
                </li>
            </ul>
        </div>
    );
}

export default DetailNavBar;