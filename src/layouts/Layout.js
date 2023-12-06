import Navbar from "../components/common/Navbar";
import {Outlet} from "react-router-dom";
import ManagerNavbar from "../components/common/ManagerNavbar";
import {isAdmin} from "../utils/TokenUtils";

function Layout(){

    return(
        <>
            {isAdmin() ? <ManagerNavbar/> : <Navbar/>}
            <main>
                <Outlet/>
            </main>
        </>

    );
}

export default Layout;