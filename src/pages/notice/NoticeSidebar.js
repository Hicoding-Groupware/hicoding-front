import React from "react";
import NoticeProfile from "./NoticeProfile";
import NoticeCategory from "./NoticeCategory";

function NoticeSidebar() {



    return(
        <>
            <div className="notice-sidebar">

                <NoticeProfile/>

                <div className="notice-sideWriting">글쓰기</div>
                <div className="notice-sideSearch">검색</div>

                <NoticeCategory/>
            </div>
        </>
    )
}

export default NoticeSidebar