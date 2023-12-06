import {BrowserRouter, Route, Routes} from "react-router-dom";
import Layout from "./layouts/Layout";
import React from "react";
import Main from "./pages/main/Main";
import './Student.css';
import './lecture.css';
import './mainCss/navbar.css';
import './mainCss/login.css';
import './mainCss/main.css';
import './course.css';
import Login from "./pages/member/Login";
import Student from "./pages/student/Student";
import StudentRegist from "./pages/student/StudentRegist";
import Creation from "./pages/member/Creation";
import {MEMBER_PATH} from "./apis/MemberAPICalls";
import LectureMain from "./pages/lecture/LectureMain";
import CourseMain from "./pages/course/CourseMain";
import MyCourseMain from "./pages/course/MyCourseMain";
import ProtectedRoute from "./components/router/ProtectedRoute";
import StudentModify from "./pages/student/StudentModify";
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

                    <Route path="/login" element={<ProtectedRoute loginCheck={false}><Login/></ProtectedRoute>}/>
                    <Route path="/" element={<ProtectedRoute loginCheck={true}><Layout/></ProtectedRoute>}>
                        <Route index element={<Main/>}/>
                        {/*<Route path="mypage" element={<MyPageLayout/>}>*/}
                        {/*<Route path="profile" element={<Profile/>}/>*/}
                        {/*</Route>*/}
                        <Route path="lecture" element={<LectureMain/>}/>
                        <Route path="courses">
                            <Route path="" element={<CourseMain/>}/>
                            <Route path=":cosCode" element={ <CourseDetail/> }/>
                        </Route>
                        <Route path="course-regist" element={<CourseRegist/>}/>
                        <Route path="schedule">
                            <Route path="academy" element={<AcademySchedule/>}/>
                            <Route path="course" element={<CourseSchedule/>}/>
                            <Route path="classroom" element={ <ClassroomSchedule/> }/>
                        </Route>
                        <Route path="mylecture" element={<MyCourseMain/>}/>
                        <Route
                            path="students"
                            element={
                                <Student/>
                            }
                        />
                        <Route
                            path="studentRegist"
                            element={
                                <StudentRegist/>
                            }
                        />
                        <Route
                            path="student-modify/:stdCode"
                            element={
                                <StudentModify/>
                            }
                        />
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
