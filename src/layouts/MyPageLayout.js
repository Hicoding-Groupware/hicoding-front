import {Outlet} from "react-router-dom";

function MyPageLayout(){
    return(
        <div>
            <p>마이페이지 입니다</p>
            <Outlet/>
         </div>
    );
}


export default MyPageLayout;