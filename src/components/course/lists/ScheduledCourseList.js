import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import PagingBar from "../../common/PagingBar";
import {callScheduledMyCourseListAPI} from "../../../apis/MyCourseAPICalls";
import MyLectureDetailInfoModal from "../../modal/MyLectureDetailInfo";


function ScheduledCourseList() {

    const [courseDetailInfoModal, setCourseDetailInfoModal] = useState(false)
    const [cosCode, setCosCode] = useState(0)
    const [currentPage, setCurrentPage] = useState(1);
    const {courses} = useSelector(state => state.myCourseReducer);
    const dispatch = useDispatch();

    useEffect(() => {
        /* 진행 중인 강의(과정)에 대한 정보 요청 */
        dispatch(callScheduledMyCourseListAPI({currentPage}));
    }, [currentPage]);

    /* 강의 상세 조회 모달 */
    const onClickCourseDetailInfoHandler = (cosCode) => {
        setCosCode(cosCode);
        setCourseDetailInfoModal(true);
    };

    /* 일일 출결 관리 페이지로 이동 */
    const onClickDayAttendanceHandler = (cosCode) => {
    };

    const getFormattedDayStatus = (status) => {
        if (status === "WEEKDAY") return "평일반";
        if (status === "WEEKEND") return "주말반";
        return status;
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
                    cosCode={cosCode}
                    setCourseDetailInfoModal={setCourseDetailInfoModal}
                />
            }
            {
                courses &&
                <>
                    <div className="main-container">
                        <h1>예정 강의</h1>
                        <div className="table-container">
                            <div className="table-row header">
                                <div className="table-cell">강의명</div>
                                <div className="table-cell">담당 강사</div>
                                <div className="table-cell">요일</div>
                                <div className="table-cell">시간대</div>
                                <div className="table-cell">수강 인원</div>
                                <div className="table-cell">강의실</div>
                                <div className="table-cell">기간</div>
                                <div className="table-cell"></div>
                            </div>
                            <div>
                                {courses.data.map((course, index) => (
                                    <div key={course.cosCode || index} className="table-row">
                                        <div className="table-cell"
                                             onClick={() =>
                                                 onClickCourseDetailInfoHandler(course.cosCode)
                                             }
                                        >
                                            {course.cosName}
                                        </div>
                                        <div className="table-cell teacher">
                                            {course.teacherMemberName}
                                        </div>
                                        <div className="table-cell dayStatus">
                                            {getFormattedDayStatus(course.dayStatus)}
                                        </div>
                                        <div className="table-cell timeStatus">
                                            {getFormattedTimeStats(course.timeStatus)}
                                        </div>
                                        <div className="table-cell curCnt">{course.curCnt}명</div>
                                        <div className="table-cell roomName">{course.roomName}</div>
                                        <div className="table-cell sdtEdt">
                                            {course.cosSdt} ~ {course.cosEdt}
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

export default ScheduledCourseList;
