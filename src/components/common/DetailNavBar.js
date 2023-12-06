import {NavLink} from "react-router-dom";

function DetailNavBar(){



    return(
        <div className="nav-detail">
            <ul className="nav-detail-ul">
                <li>
                    <ul>
                        <li>사원생성</li>

                        <li>사원관리</li>

                        <li>사원정보승인</li>
                    </ul>
                    <ul>
                        <li>원생등록</li>
                        <li>원생조회</li>
                    </ul>
                    <ul>
                        <NavLink to="/lecture"><li>강의관리</li></NavLink>
                        <NavLink to="/course"><li>과정관리</li></NavLink>
                        {<NavLink to="/course-regist"><li>과정등록</li></NavLink>}
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
                        <li>쪽지쓰기</li>
                        <li>받은 쪽지함</li>
                        <li>보낸 쪽지함</li>
                    </ul>
                </li>
            </ul>
        </div>
    );
}

export default DetailNavBar;