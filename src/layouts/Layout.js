import Navbar from "../components/common/Navbar";
import {Outlet} from "react-router-dom";

function Layout(){
    return(
        <>
            <Navbar/>
            <main>
                <Outlet/>
            </main>
        </>

    );
}

export default Layout;