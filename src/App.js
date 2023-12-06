import {BrowserRouter, Route, Routes} from "react-router-dom";
import Layout from "./layouts/Layout";
import React from "react";
import Main from "./pages/main/Main";
import './lecture.css';
import './mainCss/navbar.css';
import './mainCss/login.css';
import './mainCss/main.css';
import './course.css';
import Login from "./pages/member/Login";

import Creation from "./pages/member/Creation";
import {MEMBER_PATH} from "./apis/MemberAPICalls";
import LectureMain from "./pages/lecture/LectureMain";
import CourseMain from "./pages/course/CourseMain";
import MyCourseMain from "./pages/course/MyCourseMain";
import DetailsView from "./pages/member/DetailsView";

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
                        <Route path="lecture" element={<LectureMain/>}/>
                          <Route path="course" element={<CourseMain/>}/>
                          <Route path="mylecture" element={<MyCourseMain/>}/>


                        <Route path={MEMBER_PATH}>
                            <Route path='creation' element={<Creation/>}/>
                            <Route path='detailsView' element={<DetailsView/>}/>
                        </Route>

                    </Route>
                </Routes>
            </BrowserRouter>
        </>
    );
}

export default App;
