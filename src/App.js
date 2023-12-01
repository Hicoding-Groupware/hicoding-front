import {BrowserRouter, Route, Routes} from "react-router-dom";
import Layout from "./layouts/Layout";
import React from "react";
import Main from "./pages/main/Main";
import './lecture.css';
import './mainCss/navbar.css';
import './mainCss/login.css';
import Login from "./pages/member/Login";
import LectureMain from "./pages/lecture/LectureMain";
import CourseMain from "./pages/course/CourseMain";
import InProgressList from "./components/course/lists/InProgressList";
import MyCourseMain from "./pages/course/MyCourseMain";


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
                      </Route>
              </Routes>
          </BrowserRouter>
      </>
  );
}

export default App;
