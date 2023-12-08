import React, { useState, useEffect, useRef } from "react";
import ManagerDetailNavBar from "./ManagerDetailNavBar";
import {removeToken} from "../../utils/TokenUtils";
import {NavLink} from "react-router-dom";
import DetailNavBar from "./DetailNavBar";
import {useDispatch, useSelector} from "react-redux";
import {callMemberProfileAPI} from "../../apis/MemberAPICalls";

function Navbar() {

    const onClickLogoutHandler = () => {
        removeToken();
        window.location.replace("/login");
    }

    const dispatch = useDispatch();
    const {profileInfo} = useSelector(state => state.memberReducer);

    useEffect(() => {
        dispatch(callMemberProfileAPI());
    }, []);

    return (
        <>
            <div className="navbar-div">
                <NavLink to="/"><img className="logo-img" alt="logo" src="/img/logo.png" /></NavLink>
                <ul className="nav-list-ul" style={{maxWidth : 910}}>
                    <ul className="dropDown">
                        <ul className="dropDownMain">
                            <li className="dropDownMain">직원관리</li>
                            <li style={{paddingLeft : '35px'}} className="dropDownMain">원생관리</li>
                            <li style={{paddingLeft : '35px'}} className="dropDownMain">과정관리</li>
                            <li  style={{paddingLeft : '40px'}} className="dropDownMain">일정</li>
                            <li  style={{paddingLeft : '40px'}} className="dropDownMain">게시판</li>
                            <li  style={{paddingLeft : '40px'}} className="dropDownMain">쪽지</li>
                        </ul>
                        <ul className="dropDownMenu">
                            <ManagerDetailNavBar/>
                        </ul>
                    </ul>
                </ul>
                {
                    profileInfo &&
                    <p
                        style={{display : "flex", maxWidth : "42px", position : "relative", left : 1760, top: -40, color : "white"}}
                    >{profileInfo.memberName}</p>
                }
                <img className="logout-img" alt="logout" src="/img/logout.png" onClick={onClickLogoutHandler}
                     style={{display : "flex", position : "relative", }}/>
            </div>
        </>
    );
}

export default Navbar;
