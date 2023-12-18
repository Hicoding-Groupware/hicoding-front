import React from "react";
import {isAdmin} from "../utils/TokenUtils";
import ManagerMain from "../pages/main/ManagerMain";
import Main from "../pages/main/Main";

function MainLayout(){
    return(
        <>
            {isAdmin() ? <ManagerMain/> : <Main/>}
        </>
    );
}


export default MainLayout;