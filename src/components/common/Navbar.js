import DetailNavBar from "./DetailNavBar";
import {NavLink} from "react-router-dom";
import {removeToken} from "../../utils/TokenUtils";

function Navbar() {

    const onClickLogoutHandler = () => {
        removeToken();
        window.location.replace("/login");
    }

    return (
        <>
            <div className="navbar-div">
                <NavLink to="/"><img className="logo-img" alt="logo" src="/img/logo.png" /></NavLink>
                <ul className="nav-list-ul">

                    <ul className="dropDown">
                        <ul className="dropDownMain">
                            <li style={{paddingLeft : '130px'}} className="dropDownMain">내강의</li>
                            <li style={{paddingLeft : '60px'}} className="dropDownMain">과정관리</li>
                            <li style={{paddingLeft : '60px'}} className="dropDownMain">일정</li>
                            <li style={{paddingLeft : '60px'}} className="dropDownMain">게시판</li>
                            <li style={{paddingLeft : '60px'}} className="dropDownMain">쪽지</li>
                        </ul>
                        <ul className="dropDownMenu">
                            <DetailNavBar/>
                        </ul>
                    </ul>
                    <img className="logout-img" alt="logout" src="/img/logout.png" onClick={onClickLogoutHandler}/>
                </ul>
            </div>
        </>
    );
}

export default Navbar;