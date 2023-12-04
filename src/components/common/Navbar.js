import React, { useState, useEffect, useRef } from "react";
import DetailNavBar from "./DetailNavBar";
import {useNavigate} from "react-router-dom";

function Navbar() {

    const navigate = useNavigate();

    /* 로고 클릭 시 메인 페이지로 이동 */
    const onClickHandler = () => {
        navigate("/");
    }

    return (
        <>
            <div className="navbar-div">
                <ul className="nav-list-ul">
                    <img className="logo-img" alt="logo" src="/img/logo.png" onClick={onClickHandler}/>
                    <ul className="dropDown">
                        <ul className="dropDownMain">
                            <li className="dropDownMain">직원관리</li>
                            <li className="dropDownMain">원생관리</li>
                            <li className="dropDownMain">과정관리</li>
                            <li className="dropDownMain">일정</li>
                            <li className="dropDownMain">게시판</li>
                            <li className="dropDownMain">쪽지</li>
                        </ul>
                        <ul className="dropDownMenu">
                            <DetailNavBar/>
                        </ul>
                    </ul>
                    <img className="logout-img" alt="logout" src="/img/logout.png" />
                </ul>
            </div>
        </>
    );
}

export default Navbar;