import DetailNavBar from "./DetailNavBar";
import {NavLink, useNavigate} from "react-router-dom";
import {removeToken} from "../../utils/TokenUtils";
import {useDispatch, useSelector} from "react-redux";
import React, {useEffect} from "react";
import {callMemberProfileAPI} from "../../apis/MemberAPICalls";

function Navbar() {

    const onClickLogoutHandler = () => {
        removeToken();
        window.location.replace("/login");
    }

    const dispatch = useDispatch();
    const {profileInfo} = useSelector(state => state.memberReducer);
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(callMemberProfileAPI());
    }, []);

    const onClickImageHandler = () => {
        navigate('/profile')
    }

    return (
        <>
            <div className="navbar-div">
                <NavLink to="/"><img className="logo-img" alt="logo" src="/img/logo.png" /></NavLink>
                <ul className="nav-list-ul" style={{maxWidth: 830}}>
                    <ul className="dropDown">
                        <ul className="dropDownMain">
                            <li className="dropDownMain">내강의</li>
                            <li style={{paddingLeft : '60px'}} className="dropDownMain">과정관리</li>
                            <li style={{paddingLeft : '60px'}} className="dropDownMain">일정</li>
                            <li style={{paddingLeft : '60px'}} className="dropDownMain">게시판</li>
                            <li style={{paddingLeft : '50px'}} className="dropDownMain">쪽지</li>
                        </ul>
                        <ul className="dropDownMenu">
                            <DetailNavBar/>
                        </ul>
                    </ul>
                </ul>
                <div style={{display : "flex", alignItems : "center"}}>
                    {
                        profileInfo &&
                        <div style={{display : "flex", alignItems : "center"}}>
                            {profileInfo.memberProfile === null ?
                                (
                                    <div style={{height : 40, width : 40, borderRadius : 100
                                        , display : "inline-flex", border : "1px solid rgba(7, 7, 7, 0.16)", marginRight : 10
                                    }}>
                                        <img onClick={onClickImageHandler} style={{top : 0, left : 0, width : "100%", height : "100%", borderRadius : 100, cursor : "pointer"}}
                                             src="https://github.com/Hicoding-Groupware/hicoding-front/assets/138549261/98298a80-33e9-4918-9e77-09ebd8bfc335"
                                        />
                                    </div>
                                ) : (
                                    <div style={{height : 40, width : 40, borderRadius : 100
                                        , display : "inline-flex", border : "1px solid rgba(7, 7, 7, 0.16)", marginRight : 10
                                    }}>
                                        <img onClick={onClickImageHandler} style={{top : 0, left : 0, width : "100%", height : "100%", borderRadius : 100, cursor : "pointer"}} src={profileInfo.memberProfile}/>
                                    </div>
                                )
                            }
                            <p
                                style={{display : "flex", maxWidth : "42px",left : 1760, top: -95, color : "white"}}
                            >{profileInfo.memberName}</p>
                        </div>
                    }
                    <img className="logout-img" alt="logout" src="/img/logout.png" onClick={onClickLogoutHandler}/>
                </div>
            </div>

        </>
    );
}

export default Navbar;