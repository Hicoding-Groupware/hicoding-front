import {NavLink} from "react-router-dom";
import {MEMBER_PATH} from "../../apis/MemberAPICalls";
import {BOARD_PATH} from "../../apis/NoticeAPICalls";

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
                        <li><NavLink to="/courses/proceeding">과정관리</NavLink></li>
                        <li><NavLink to="/course-regist">과정등록</NavLink></li>
                    </ul>
                    <ul>
                        <li><NavLink to="/schedule/academy">과정일정</NavLink></li>
                        <li><NavLink to="/schedule/classroom"> 강의실일정</NavLink></li>
                    </ul>
                    <ul>
                        <li><NavLink to={BOARD_PATH}>공지사항</NavLink></li>
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

export default ManagerDetailNavBar;