import {NavLink, useNavigate} from "react-router-dom";
import {MEMBER_PATH} from "../../apis/MemberAPICalls";

function DetailNavBar(){

    const navigate = useNavigate();

    // 클릭 시 사원 생성 페이지 이동
    return(
        <div className="nav-detail">
            <ul className="nav-detail-ul">
                <li>
                    <ul>
                        <li><NavLink to={MEMBER_PATH + '/creation' }>사원생성</NavLink></li>
                        <li>사원관리</li>

                        <li>사원정보승인</li>
                    </ul>
                    <ul>
                        <li>원생등록</li>
                        <li>원생조회</li>
                    </ul>
                    <ul>
                        <li><NavLink to="/lecture">강의관리</NavLink></li>
                        <li><NavLink to="/course">과정관리</NavLink></li>
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