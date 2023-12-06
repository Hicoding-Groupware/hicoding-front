import {BrowserRouter, Route, Routes} from "react-router-dom";
import Layout from "./layouts/Layout";
import React, {createContext} from "react";
import Main from "./pages/main/Main";
import './lecture.css';
import './mainCss/navbar.css';
import './mainCss/login.css';
import Login from "./pages/member/Login";
import LectureMain from "./pages/lecture/LectureMain";
import CourseMain from "./pages/course/CourseMain";
import CourseDetail from "./pages/course/CourseDetail";
import AcademyCalendar from "./components/Schedule/AcademyCalendar";
import AcademySchedule from "./pages/schedule/AcademySchedule";
import ClassroomSchedule from "./pages/schedule/ClassroomSchedule";
import CourseSchedule from "./pages/schedule/CourseSchedule";
import CourseRegist from "./pages/course/CourseRegist";

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
                          <Route path="course">
                              <Route path="" element={<CourseMain/>}/>
                              <Route path=":cosCode" element={ <CourseDetail/> }/>
                          </Route>
                          <Route path="course-regist" element={<CourseRegist/>}/>
                          <Route path="schedule">
                              <Route path="academy" element={<AcademySchedule/>}/>
                              <Route path="course" element={<CourseSchedule/>}/>
                              <Route path="classroom" element={ <ClassroomSchedule/> }/>
                          </Route>
                      </Route>
              </Routes>
          </BrowserRouter>
      </>
  );
}

export default App;
