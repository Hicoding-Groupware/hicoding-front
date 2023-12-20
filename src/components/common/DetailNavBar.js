import {NavLink} from "react-router-dom";
import React from "react";
import {BOARD_PATH} from "../../apis/NoticeAPICalls";

function DetailNavBar(){

    return(
        <div className="nav-detail">
            <ul className="nav-detail-ul">
                <li>

                    <ul style={{paddingLeft : '30px'}}>
                        <li><NavLink to="/mylecture/inprogress">진행중인 강의</NavLink></li>
                        <li><NavLink to="/mylecture/scheduledcourse">예정 강의</NavLink></li>
                        <li><NavLink to="/mylecture/lastcourse">지난 강의</NavLink></li>
                    </ul>
                    <ul style={{paddingLeft : '45px'}}>
                    <li><NavLink to="/lecture">강의관리</NavLink></li>
                    <li><NavLink to="/courses/proceeding">과정관리</NavLink></li>
                    </ul>
                    <ul style={{paddingLeft : '40px'}}>
                        <li><NavLink to="/schedule/academy">과정일정</NavLink></li>
                        <li><NavLink to="/schedule/classroom"> 강의실일정</NavLink></li>
                    </ul>

                    <ul style={{paddingLeft : '40px'}}>
                        <li><NavLink to={BOARD_PATH}>공지사항</NavLink></li>
                    </ul>
                    <ul style={{paddingLeft : '34px'}}>
                        <li><NavLink to="/message">쪽지함</NavLink></li>
                    </ul>
                </li>
            </ul>
        </div>
    );
}

export default DetailNavBar;