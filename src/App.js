import {BrowserRouter, Route, Routes} from "react-router-dom";
import Layout from "./layouts/Layout";
import React from "react";
import Main from "./pages/main/Main";
import './main.css';
import './lecture.css';
import Login from "./pages/member/Login";
import ProtectedRoute from "./components/router/ProtectedRoute";
import MyPageLayout from "./layouts/MyPageLayout";
import Profile from "./pages/member/Profile";
import LectureList from "./components/lecture/lists/LectureList";
import LectureMain from "./pages/lecture/LectureMain";
import CourseMain from "./pages/course/CourseMain";

function App() {

  return (
      <>
          <BrowserRouter>
              <Routes>
                  {/*<Route path="/" element={<Login/>}/>*/}
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
