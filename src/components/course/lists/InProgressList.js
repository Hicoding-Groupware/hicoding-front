import React, {useState} from "react";
import {useDispatch} from "react-redux";
import MyLectureDetailInfoModal from "../../modal/MyLectureDetailInfoModal";
import {useNavigate, useParams} from "react-router-dom";


function InProgressList({data, course}) {

    const [courseDetailInfoModal, setCourseDetailInfoModal] = useState(false) // 모달
    const [cosCode, setCosCode] = useState(0);
    const dispatch = useDispatch(); // api
    // const navigate = useNavigate();



    /* 강의 상세 조회 모달 버튼 이벤트 */
    const onClickCourseDetailInfoHandler = (cosCode) => {
       setCosCode(cosCode);
       setCourseDetailInfoModal(true);
    };

    /* 일일 출결 관리 페이지로 이동 */
    // const onClickDayAttendanceHandler = (cosCode) => {
    // };

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
            <>
                <div className="main-container">
                    <h1>진행중인 강의</h1>
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
                            {
                                data.map((course, index) => (
                                    <div className="table-row" key={course.cosCode || index}>
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
                                                // onClick={() =>
                                                //     onClickDayAttendanceHandler(course.cosCode)
                                                // }
                                            >
                                                출석 관리
                                            </button>
                                        </div>
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                    {/*<PagingBar pageInfo={courses.pageInfo} setCurrentPage={setCurrentPage}/>*/}
                </div>
            </>
            {/*}*/}
        </>
    );
}

export default InProgressList;
