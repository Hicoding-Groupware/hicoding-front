import {BrowserRouter, Route, Routes} from "react-router-dom";
import Layout from "./layouts/Layout";
import React from "react";
import Main from "./pages/main/Main";
import './main.css';
import Login from "./pages/member/Login";
import ProtectedRoute from "./components/router/ProtectedRoute";
import MyPageLayout from "./layouts/MyPageLayout";
import Profile from "./pages/member/Profile";
import LectureList from "./pages/lecture/LectureList";
import MyLectureInProgressList from "./pages/course/MyLectureInProgressList";
import Creation from "./pages/member/Creation";
import {MEMBER_PATH} from "./apis/MemberAPICalls";

function App() {


    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path="/login" element={<Login/>}/>
                    <Route path="/" element={<Layout/>}>
                        <Route index element={<Main/>}/>
                        {/*<Route path="mypage" element={<MyPageLayout/>}>*/}
                        {/*<Route path="profile" element={<Profile/>}/>*/}
                        {/*</Route>*/}
                        <Route path="lecture" element={<LectureList/>}/>


                        <Route path={MEMBER_PATH}>
                            <Route path='creation' element={<Creation/>}/>
                        </Route>

                    </Route>
                </Routes>
            </BrowserRouter>
        </>
    );
}

export default App;
