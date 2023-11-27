import {isAdmin, isLogin} from "../../utils/TokenUtils";
import {Navigate} from "react-router-dom";

function ProtectedRoute({loginCheck, children}){
    /*<ProtectedRoute>
    * <Login/>    -->>>>>>>>>>>>이게 children
    * </ProtectedRoute>
    * */

    if (loginCheck){
        /* 로그인 해야만 볼 수 있는 기능(마이페이지)*/
        return isLogin() ? children : <Navigate to="/member/login"/>
    }else {
        /* 로그인 하면 볼 수 없는 기능(로그인, 회원가입)*/
        return !isLogin() ? children : <Navigate to="/"/>
    }
}

export default ProtectedRoute;