import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import PagingBar from "../../common/PagingBar";
import {callLastMyCourseListAPI} from "../../../apis/MyCourseAPICalls";
import MyLectureDetailInfoModal from "../../modal/MyLectureDetailInfo";


function LastCourseList() {

    const [courseDetailInfoModal, setCourseDetailInfoModal] = useState(false)
    const [course, setCourse] = useState({})

    const [currentPage, setCurrentPage] = useState(1);
    const {courses} = useSelector(state => state.myCourseReducer);
    const dispatch = useDispatch();

    useEffect(() => {
        /* 진행 중인 강의(과정)에 대한 정보 요청 */
        dispatch(callLastMyCourseListAPI({currentPage}));
    }, [currentPage]);

    /* 강의 상세 조회 모달 */
    const onClickCourseDetailInfoHandler = (course) => {
        setCourse(course);
        setCourseDetailInfoModal(true);
    };

    /* 일일 출결 관리 페이지로 이동 */
    const onClickDayAttendanceHandler = (cosCode) => {
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
                        <h2>지난 강의</h2>
                        <div className="course-name-description">과정명을 누르면 세부 사항을 확인할 수 있습니다.</div>
                        <div className="table-container">
                            <div className="table-row course-header">
                                <div className="table-cell thead">강의명</div>
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
                                    <div key={course.cosCode || index} className="table-row">
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
                                                onClick={() =>
                                                    onClickDayAttendanceHandler(course.cosCode)
                                                }
                                            >
                                                출석 관리
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <PagingBar pageInfo={courses.pageInfo} setCurrentPage={setCurrentPage}/>
                    </div>
                </>
            }
        </>
    );
}

export default LastCourseList;
