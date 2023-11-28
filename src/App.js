import {BrowserRouter, Route, Routes} from "react-router-dom";
import Layout from "./layouts/Layout";
import React from "react";
import Main from "./pages/main/Main";
import './main.css';
import Login from "./pages/member/Login";
import ProtectedRoute from "./components/router/ProtectedRoute";
import MyPageLayout from "./layouts/MyPageLayout";
import Profile from "./pages/member/Profile";
import MyLectureInProgressList from "./pages/course/MyLectureInProgressList";

function App() {

    return (
        <BrowserRouter>
            <Routes>
                {/*<Route path="/" element={<Login/>}/>*/}
                <Route path="mainpage" element={<Layout/>}>
                    <Route index element={<Main/>}/>
                    {/*<Route path="mypage" element={<MyPageLayout/>}>*/}
                    {/*<Route path="profile" element={<Profile/>}/>*/}
                    {/*</Route>*/}
                </Route>
                <Route path="/myLecture">
                    <Route path="inProgress/:" element={ <MyLectureInProgressList/> }/>
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
