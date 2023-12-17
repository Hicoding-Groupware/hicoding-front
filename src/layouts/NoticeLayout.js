import {Outlet} from "react-router-dom";
import React from "react";
import NoticeSidebar from "../pages/notice/NoticeSidebar";

function NoticeLayout() {
    return (
        <>
            <div className="notice-container">

                <NoticeSidebar/>

                <main className="notice-board">
                    <Outlet/>
                </main>

            </div>
        </>
    )
}

export default NoticeLayout