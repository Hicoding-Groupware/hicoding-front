import React, { useState, useEffect, useRef } from "react";
import ManagerDetailNavBar from "./ManagerDetailNavBar";
import {removeToken} from "../../utils/TokenUtils";

function Navbar() {

    const onClickLogoutHandler = () => {
        removeToken();
        window.location.replace("/login");
    }

    return (
        <>
            <div className="navbar-div">
                <ul className="nav-list-ul">
                    <img className="logo-img" alt="logo" src="/img/logo.png" />
                    <ul className="dropDown">
                        <ul className="dropDownMain">
                            <li style={{paddingLeft : '120px'}} className="dropDownMain">직원관리</li>
                            <li style={{paddingLeft : '40px'}} className="dropDownMain">원생관리</li>
                            <li style={{paddingLeft : '40px'}} className="dropDownMain">과정관리</li>
                            <li style={{paddingLeft : '40px'}} className="dropDownMain">일정</li>
                            <li style={{paddingLeft : '40px'}} className="dropDownMain">게시판</li>
                            <li style={{paddingLeft : '40px'}} className="dropDownMain">쪽지</li>
                        </ul>
                        <ul className="dropDownMenu">
                            <ManagerDetailNavBar/>
                        </ul>
                    </ul>
                    <img className="logout-img" alt="logout" src="/img/logout.png" onClick={onClickLogoutHandler}/>
                </ul>
            </div>
        </>
    );
}

export default Navbar;