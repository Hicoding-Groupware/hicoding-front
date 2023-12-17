import {NavLink} from "react-router-dom";
import {MEMBER_PATH} from "../../apis/MemberAPICalls";
function ManagerDetailNavBar(){

    return(
        <div className="nav-detail">
            <ul className="nav-detail-ul">
                <li>
                    <ul style={{paddingLeft : 30}}>
                        <li><NavLink to={MEMBER_PATH + '/creation' }>사원생성</NavLink></li>
                        <li><NavLink to={MEMBER_PATH + '/detailsView' }>사원관리</NavLink></li>
                        <li>사원정보승인</li>
                    </ul>
                    <ul>
                        <li><NavLink to="/studentRegist">원생등록</NavLink></li>
                        <li><NavLink to="/students">원생조회</NavLink></li>
                    </ul>
                    <ul style={{paddingLeft : 13}}>
                        <li><NavLink to="/lecture">강의관리</NavLink></li>
                        <li><NavLink to="/courses">과정관리</NavLink></li>
                        <li><NavLink to="/course-regist">과정등록</NavLink></li>
                    </ul>
                    <ul>
                        <li><NavLink to="/schedule/academy">학원일정</NavLink></li>
                        <li><NavLink to="/schedule/course">과정일정</NavLink></li>
                        <li><NavLink to="/schedule/classroom"> 강의실 일정</NavLink></li>
                    </ul>
                    <ul>
                        <li>자료실</li>
                        <li>공지사항</li>
                    </ul>
                    <ul>
                        <li><NavLink to="/message">받은 쪽지함</NavLink></li>
                        <li>보낸 쪽지함</li>
                    </ul>
                </li>
            </ul>
        </div>
    );
}

export default ManagerDetailNavBar;