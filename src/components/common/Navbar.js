import React, { useState, useEffect, useRef } from "react";
import DetailNavBar from "./DetailNavBar";

function Navbar() {
    const [isDropDownOpen, setIsDropDownOpen] = useState(false);
    const dropDownRef = useRef(null);

    const handleDropDownClick = () => {
        setIsDropDownOpen(!isDropDownOpen);
    };

    const handleClickOutside = (event) => {
        if (dropDownRef.current && !dropDownRef.current.contains(event.target)) {
            // 클릭한 요소가 드롭다운 메뉴 외부에 있는 경우 닫기
            setIsDropDownOpen(false);
        }
    };

    useEffect(() => {
        // 전역 클릭 이벤트 리스너 등록
        document.addEventListener("click", handleClickOutside);

        // 컴포넌트가 언마운트될 때 클릭 이벤트 리스너 제거
        return () => {
            document.removeEventListener("click", handleClickOutside);
        };
    }, []); // 빈 배열을 전달하여 컴포넌트가 마운트될 때만 실행되도록 설정

    return (
        <>
            <div className="navbar-div">
                <ul className="nav-list-ul">
                    <img className="logo-img" alt="logo" src="/img/logo.png" />
                    <li className="dropDown" onClick={handleDropDownClick} ref={dropDownRef}>
                        <div className="dropDownMain">
                            <p className="dropDownMain">직원관리</p>
                            <p className="dropDownMain">원생관리</p>
                            <p className="dropDownMain">강의관리</p>
                            <p className="dropDownMain">일정</p>
                            <p className="dropDownMain">게시판</p>
                            <p className="dropDownMain">쪽지</p>
                        </div>
                        {isDropDownOpen && (
                            <div className="dropDownMenu">
                                <DetailNavBar />
                            </div>
                        )}
                    </li>
                    <img className="logout-img" alt="logout" src="/img/logout.png" />
                </ul>
            </div>
        </>
    );
}

export default Navbar;