import {NavLink} from "react-router-dom";
import {MEMBER_PATH} from "../../apis/MemberAPICalls";
import React from "react";

function DetailNavBar(){

    return(
        <div className="nav-detail">
            <ul className="nav-detail-ul">
                <li>

                    <ul style={{paddingLeft : '30px'}}>
                        <li>진행중인 강의</li>
                        <li>예정 강의</li>
                        <li>지난 강의</li>
                    </ul>
                    <ul style={{paddingLeft : '45px'}}>
                        <li><NavLink to="/lecture">강의관리</NavLink></li>
                        <li><NavLink to="/course">과정관리</NavLink></li>
                    </ul>
                    <ul style={{paddingLeft : '40px'}}>
                        <li>학원일정</li>
                        <li>강의실 일정</li>
                    </ul>

                    <ul style={{paddingLeft : '40px'}}>
                        <li>자료실</li>
                        <li>공지사항</li>
                    </ul>
                    <ul style={{paddingLeft : '34px'}}>
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