import React, {useState} from "react";
import {useLocation, useNavigate, useParams} from "react-router-dom";
import MpagingBar from "../paging/MpagingBar";


function MainMyCourseListItem({courses, setCurrentPage}) {

    const navigate = useNavigate();


    const toMylecture = (course) => {
        navigate(`/attendance/day/${course.cosCode}`, {state:{course}});
    }

    console.log("----------------------------------------", courses);

    const getFormattedDayStatus = (status) => {
        if (status === "WEEKDAY") return "평일반";
        if (status === "WEEKEND") return "주말반";

    };

    const getFormattedTimeStats = (status) => {
        if (status === "MORNING") return "오전";
        if (status === "AFTERNOON") return "오후";
        if (status === "ALLDAY") return "종일";
    };


    return (
        <>

            {
                courses &&
                <>


                    <div className="main-teacher-table-back">
                        <MpagingBar pageInfo={courses.pageInfo} setCurrentPage={setCurrentPage}/>
                        <div className="main-teacher-table">
                            {
                                courses.data && courses.data.length > 0 ? (
                                    courses.data.map((course, index) => (
                                        <div className="teacher-table-row" key={course.cosCode || index}>
                                            <table style={{width: '400px'}}>
                                                <thead>
                                                <tr>
                                                    <td><h3 style={{fontWeight: "bolder"}}>{course.lecName}</h3></td>
                                                </tr>
                                                </thead>
                                                <tbody>
                                                <tr>
                                                    <td style={{width: 200}}>{course.cosSdt} ~ {course.cosEdt}</td>
                                                    <td> {getFormattedDayStatus(course.dayStatus)}/{getFormattedTimeStats(course.timeStatus)}</td>
                                                </tr>

                                                <tr>
                                                    <td>강사 :{course.teacherMemberName}</td>
                                                </tr>

                                                <tr>
                                                    <td>강의실 :{course.roomName}</td>
                                                </tr>

                                                <tr>
                                                    <td>수강인원 : {course.curCnt}/{course.capacity}</td>
                                                </tr>

                                                <tr>
                                                    <td style={{width: 270, whiteSpace: "nowrap",
                                                        textOverflow: "ellipsis",
                                                        overflow: "hidden",}}>{course.cosName}</td>
                                                    <td style={{    display: 'flex',
                                                        justifyContent: 'center'}}><button onClick={() => toMylecture(course)}
                                                                style={{ borderRadius : 10, color : "white", fontWeight : "bolder", backgroundColor : "#5a38a8", cursor: "pointer", width : 80}}>출석 관리</button></td>
                                                </tr>


                                                </tbody>
                                            </table>
                                        </div>
                                    ))
                                ) : (
                                    <>
                                        <div className="another-teacher-table-row">
                                             현재 진행중인 강의가 없습니다.
                                        </div>
                                        <div className="another-teacher-table-row">
                                            현재 진행중인 강의가 없습니다.
                                        </div>
                                    </>
                                )
                            }

                        </div>

                    </div>
                </>
            }
        </>
    );
}

export default MainMyCourseListItem;