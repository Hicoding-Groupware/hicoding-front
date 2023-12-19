import MyCourseSidebar from "../../common/MyCourseSidebar";
import MyLectureDetailInfoModal from "../../modal/MyLectureDetailInfo";
import React, {useState} from "react";
import {useNavigate} from "react-router-dom";


function MyCourseListItem({title, courses}){

    const [courseDetailInfoModal, setCourseDetailInfoModal] = useState(false) // 모달
    const [course, setCourse] = useState({});
    const navigate = useNavigate();
    const [currentPage, setCurrentPage] = useState(1)

    /* 강의 상세 조회 모달 버튼 이벤트 */
    const onClickCourseDetailInfoHandler = (course) => {
        setCourse(course);
        setCourseDetailInfoModal(true);
        console.log("courses : ", course);
        console.log("cosName :", course.cosName);
    };

    /* 일일 출결 관리 페이지로 이동 */
    const onClickDailyAttendanceHandler = (cosCode, course) => {
        console.log("cosCode : ", cosCode);
        console.log("cosSdt : ", course.cosSdt);
        navigate(`/attendance/day/${cosCode}`, { state : { course }});
    };

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
            <MyCourseSidebar/>
            {
                courseDetailInfoModal &&
                <MyLectureDetailInfoModal
                    course={course}
                    setCourseDetailInfoModal={setCourseDetailInfoModal}
                />
            }
            {
                courses &&
                <>
                    <div className="main-container">
                        <h2>{title}</h2>
                        <div className="course-name-description">과정명을 누르면 세부 사항을 확인할 수 있습니다.</div>
                        <div className="table-container">
                            <div className="table-row course-header">
                                <div className="table-cell thead">과정명</div>
                                <div className="table-cell thead">담당 강사</div>
                                <div className="table-cell thead">요일</div>
                                <div className="table-cell thead">시간대</div>
                                <div className="table-cell thead">수강 인원</div>
                                <div className="table-cell thead">강의실</div>
                                <div className="table-cell thead">기간</div>
                                <div className="table-cell thead"></div>
                            </div>
                            <div className="course-info-cell">
                                {
                                    courses.data.map((course, index) => (
                                        <div className="table-row" key={course.cosCode || index}>
                                            <div className="table-cell tinfo cosName"
                                                 onClick={() =>
                                                     onClickCourseDetailInfoHandler(course)
                                                 }
                                            >
                                                {course.cosName}
                                            </div>
                                            <div className="table-cell tinfo teacher">
                                                {course.teacherMemberName}
                                            </div>
                                            <div className="table-cell tinfo dayStatus">
                                                {getFormattedDayStatus(course.dayStatus)}
                                            </div>
                                            <div className="table-cell tinfo timeStatus">
                                                {getFormattedTimeStats(course.timeStatus)}
                                            </div>
                                            <div className="table-cell tinfo curCnt">{course.curCnt}명</div>
                                            <div className="table-cell tinfo roomName">{course.roomName}</div>
                                            <div className="table-cell tinfo sdtEdt">
                                                {course.cosSdt}<br/> ~ {course.cosEdt}
                                            </div>
                                            <div className="table-cell">
                                                <button
                                                    className="attendButton"
                                                    onClick={ () => onClickDailyAttendanceHandler(course.cosCode, course) }
                                                >
                                                    출석 관리
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                            </div>
                        </div>
                    </div>
                </>
            }
        </>
    );
}

export default MyCourseListItem;