import React, { useState, useEffect, useRef } from "react";
import DetailNavBar from "./DetailNavBar";
import {NavLink, useNavigate} from "react-router-dom";

function Navbar() {

    const navigate = useNavigate();

    return (
        <>
            <div className="navbar-div">
                <ul className="nav-list-ul">
                    <NavLink to="/"><img className="logo-img" alt="logo" src="/img/logo.png" /></NavLink>
                    <ul className="dropDown">
                        <ul className="dropDownMain">
                            <li className="dropDownMain">강의관리</li>
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