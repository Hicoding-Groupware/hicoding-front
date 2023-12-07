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
import InProgressList from "./components/course/lists/InProgressList";
import MyLectureDetailInfo from "./components/modal/MyLectureDetailInfo";
import LastCourseList from "./components/course/lists/LastCourseList";
import ScheduledCourseList from "./components/course/lists/ScheduledCourseList";
import DailyAttendance from "./components/course/lists/DailyAttendance";

function App() {

    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path="/login" element={<Login/>}/>
                    <Route path="/" element={<Layout/>}>
                        <Route index element={<Main/>}/>
                        <Route path="lecture" element={<LectureMain/>}/>
                        <Route path="course" element={<CourseMain/>}/>
                        <Route path="mylecture">
                            <Route path="inprogress" element={<InProgressList/>}/>
                            <Route path="lastcourse" element={<LastCourseList/>}/>
                            <Route path="scheduledcourse" element={<ScheduledCourseList/>}/>
                            <Route path=":cosCode" element={<MyLectureDetailInfo/>}/>
                        </Route>
                        <Route path="mylecture">

                        </Route>
                        <Route path="attendance">
                            <Route path="day/:cosCode" element={<DailyAttendance/>}/>
                        </Route>
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
                        <Route path={MEMBER_PATH}>
                            <Route path='creation' element={<Creation/>}/>
                        </Route>

                    </Route>
                </Routes>
            </BrowserRouter>
        </>
    )
};

export default App;
