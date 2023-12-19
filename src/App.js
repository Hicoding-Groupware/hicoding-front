import {BrowserRouter, Route, Routes} from "react-router-dom";
import Layout from "./layouts/Layout";
import React from "react";
import './Student.css';
import './lecture.css';
import './mainCss/navbar.css';
import './mainCss/login.css';
import './mainCss/main.css';
import './course.css';
import './notice.css';
import './Message.css';
import Login from "./pages/member/Login";
import Student from "./pages/student/Student";
import StudentRegist from "./pages/student/StudentRegist";
import Creation from "./pages/member/Creation";
import {MEMBER_PATH} from "./apis/MemberAPICalls";
import LectureMain from "./pages/lecture/LectureMain";
import DetailsView from "./pages/member/DetailsView";
import ProtectedRoute from "./components/router/ProtectedRoute";
import StudentModify from "./pages/student/StudentModify";
import CourseDetail from "./pages/course/CourseDetail";
import AcademySchedule from "./pages/schedule/AcademySchedule";
import ClassroomSchedule from "./pages/schedule/ClassroomSchedule";
import CourseRegist from "./pages/course/CourseRegist";
import InProgressList from "./components/course/lists/InProgressList";
import MyLectureDetailInfo from "./components/modal/MyLectureDetailInfo";
import LastCourseList from "./components/course/lists/LastCourseList";
import ScheduledCourseList from "./components/course/lists/ScheduledCourseList";
import DailyAttendanceList from "./components/course/lists/DailyAttendanceList";
import Profile from "./pages/member/Profile";
import NoticeLayout from "./layouts/NoticeLayout";
import NoticeBoard from "./pages/notice/NoticeBoard";
import NoticePost from "./pages/notice/NoticePost";
import MainLayout from "./layouts/MainLayout";
import NoticeWritingPage from "./pages/notice/NoticeWritingPage";
import CourseMainProceeding from "./pages/course/CourseMainProceeding";
import CourseMainExpected from "./pages/course/CourseMainExpected";
import Message from "./pages/message/Message";
import CourseModify from "./pages/course/CourseModify";
import MonthAttendanceList from "./components/course/lists/MonthAttendanceList";
import {BOARD_PATH} from "./apis/NoticeAPICalls";
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
                            <Route path="proceeding" element={<CourseMainProceeding/>}/>
                            <Route path="expected" element={<CourseMainExpected/>}/>
                            <Route path=":cosCode" element={<CourseDetail/>}/>
                        </Route>
                        <Route path="course-regist" element={<CourseRegist/>}/>
                        <Route path="course-modify/:cosCode" element={<CourseModify/>}/>
                        <Route path="schedule">
                            <Route path="academy" element={<AcademySchedule/>}/>
                            <Route path="classroom" element={<ClassroomSchedule/>}/>
                        </Route>
                        <Route path="mylecture">
                            <Route path="inprogress" element={<InProgressList/>}/>
                            <Route path="lastcourse" element={<LastCourseList/>}/>
                            <Route path="scheduledcourse" element={<ScheduledCourseList/>}/>
                            <Route path=":cosCode" element={<MyLectureDetailInfo/>}/>
                        </Route>
                        <Route path="attendance">
                            <Route path="day/:cosCode" element={<DailyAttendanceList/>}/>
                            <Route path="month/:cosCode" element={<MonthAttendanceList/>}/>
                        </Route>
                        <Route path="students" element={
                            <ProtectedRoute authCheck={true}>
                            <Student/>
                            </ProtectedRoute>
                        }
                        />
                        <Route path="studentRegist" element={
                            <ProtectedRoute authCheck={true}>
                            <StudentRegist/>
                            </ProtectedRoute>
                            }
                        />
                        <Route path="student-modify/:stdCode" element={
                            <ProtectedRoute authCheck={true}>
                            <StudentModify/>
                            </ProtectedRoute>
                        }
                        />
                        <Route path="message">
                            <Route path="" element={<Message/>}/>
                        </Route>

                        <Route path={MEMBER_PATH}>
                            <Route path='creation' element={<Creation/>}/>
                            <Route path='detailsView' element={<DetailsView/>}/>
                        </Route>
                        <Route path={BOARD_PATH} element={<NoticeLayout/>}>
                            <Route path="board"/>
                            <Route path=":title/:role" element={<NoticeBoard/>}/>
                            <Route path=":title/:role/:memberNo/:curPostNo" element={<NoticeWritingPage/>}/>
                            <Route path=":title/:role/:postNo/:recordType/:memberNo" element={<NoticePost/>}/>
                        </Route>

                    </Route>
                </Routes>
            </BrowserRouter>
        </>
    );
};

export default App;
