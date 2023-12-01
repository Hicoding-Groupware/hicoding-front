import {Outlet} from "react-router-dom";
import Profile from "../pages/member/Profile";
import React from "react";

function MyPageLayout(){
    return(
        <div>
            <p>마이페이지 입니다</p>
            <Profile/>
         </div>
    );
}


export default MyPageLayout;