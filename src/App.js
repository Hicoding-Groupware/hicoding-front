import {BrowserRouter, Route, Routes} from "react-router-dom";
import Layout from "./layouts/Layout";
import React from "react";
import Main from "./pages/main/Main";
import './lecture.css';
import './mainCss/navbar.css';
import './mainCss/login.css';
import './mainCss/main.css';
import Login from "./pages/member/Login";
import LectureMain from "./pages/lecture/LectureMain";
import CourseMain from "./pages/course/CourseMain";
import MyPageLayout from "./layouts/MyPageLayout";
import Profile from "./pages/member/Profile";
import LectureList from "./pages/lecture/LectureList";
import MyLectureInProgressList from "./pages/course/MyLectureInProgressList";

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
                      </Route>
              </Routes>
          </BrowserRouter>
      </>
  );
}

export default App;
