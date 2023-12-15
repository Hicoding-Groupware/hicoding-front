import {BrowserRouter, Route, Routes} from "react-router-dom";
import Layout from "./layouts/Layout";
import React from "react";
import './Student.css';
import './lecture.css';
import './mainCss/navbar.css';
import './mainCss/login.css';
import './mainCss/main.css';
import './course.css';
import './board.css';
import Login from "./Login";
import Student from "./pages/student/Student";
import StudentRegist from "./pages/student/StudentRegist";
import Creation from "./pages/member/Creation";
import {MEMBER_PATH} from "./apis/MemberAPICalls";
import LectureMain from "./pages/lecture/LectureMain";
import CourseMain from "./pages/course/CourseMain";
import DetailsView from "./pages/member/DetailsView";
import ProtectedRoute from "./components/router/ProtectedRoute";
import StudentModify from "./pages/student/StudentModify";
import CourseDetail from "./pages/course/CourseDetail";
import AcademySchedule from "./pages/schedule/AcademySchedule";
import ClassroomSchedule from "./pages/schedule/ClassroomSchedule";
import CourseSchedule from "./pages/schedule/CourseSchedule";
import CourseRegist from "./pages/course/CourseRegist";
import InProgressList from "./components/course/lists/InProgressList";
import MyLectureDetailInfo from "./components/modal/MyLectureDetailInfo";
import LastCourseList from "./components/course/lists/LastCourseList";
import ScheduledCourseList from "./components/course/lists/ScheduledCourseList";
import DailyAttendance from "./components/course/lists/DailyAttendance";
import Profile from "./pages/member/Profile";
import MainLayout from "./layouts/MainLayout";
import {BOARD_PATH} from "./apis/BoardAPICalls";
import Notice from "./pages/board/Notice";

function App() {

    return (
        <>
            <BrowserRouter>
                <Routes>

                    <Route path="/login" element={<ProtectedRoute loginCheck={false}><Login/></ProtectedRoute>}/>
                    <Route path="/" element={<ProtectedRoute loginCheck={true}><Layout/></ProtectedRoute>}>
                        <Route index element={<MainLayout/>}/>
                        <Route path="profile" element={<Profile/>}/>

                        <Route path="lecture" element={<LectureMain/>}/>
                        <Route path="courses">
                            <Route path="" element={<CourseMain/>}/>
                            <Route path=":cosCode" element={<CourseDetail/>}/>
                        </Route>
                        <Route path="course-regist" element={<CourseRegist/>}/>
                        <Route path="schedule">
                            <Route path="academy" element={<AcademySchedule/>}/>
                            <Route path="course" element={<CourseSchedule/>}/>
                            <Route path="classroom" element={<ClassroomSchedule/>}/>
                        </Route>
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
                        <Route
                            path="student-modify/:stdCode"
                            element={
                                <StudentModify/>
                            }
                        />
                        <Route path={MEMBER_PATH}>
                            <Route path='creation' element={<Creation/>}/>
                            <Route path='detailsView' element={<DetailsView/>}/>
                        </Route>
                        <Route path={BOARD_PATH}>
                            <Route path='notice' element={<Notice/>}/>
                        </Route>

                    </Route>
                </Routes>
            </BrowserRouter>
        </>
    );
};

export default App;
