import {NavLink} from "react-router-dom";
import {MEMBER_PATH} from "../../apis/MemberAPICalls";
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
                        <li>원생등록</li>
                        <li>원생조회</li>
                    </ul>
                    <ul>
                        <li>강의등록</li>
                        <li>강의목록</li>

                        <li>내강의</li>
                        <li>출석부</li>
                    </ul>
                    <ul>
                        <li>학원일정</li>
                        <li>강의실 일정</li>
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