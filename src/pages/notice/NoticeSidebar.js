import React from "react";
import NoticeProfile from "./NoticeProfile";
import NoticeCategory from "./NoticeCategory";

function NoticeSidebar() {



    return(
        <>
            <div className="notice-sidebar">
                <NoticeProfile/>
                <NoticeCategory/>
            </div>
        </>
    )
}

export default NoticeSidebar