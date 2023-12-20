// import {useEffect} from "react";
//
//
// function MyLectureDetailInfo({course, setCourseDetailInfoModal}) {
//
//     // 모달 esc 적용
//     useEffect(() => {
//         const handleKeyPress = (e) => {
//             if(e.key === 'Escape') {
//                 setCourseDetailInfoModal(false);
//             }
//         };
//
//         window.addEventListener('keydown', handleKeyPress);
//
//         return () => {
//             window.removeEventListener('keydown', handleKeyPress);
//         };
//     }, [setCourseDetailInfoModal]);
//
//     const getFormattedDayStatus = (status) => {
//         if (status === "WEEKDAY") return "평일반";
//         if (status === "WEEKEND") return "주말반";
//         return status;
//     };
//
//     const getFormattedTimeStats = (status) => {
//         if (status === "MORNING") return "오전";
//         if (status === "AFTERNOON") return "오후";
//         if (status === "ALLDAY") return "종일";
//     };
//
//     return (
//         <>
//             {
//                 course &&
//                 <div className="modal">
//
//                     <div className="modal-container">
//                         <h2>과정 상세 정보</h2>
//                         <div className="detail-box-color">
//                             <h3 className="h3-detail">과정</h3>
//                             <div className="course-detail-modal-div">
//                                 <div className="detail-head">과정명</div>
//                                 <div className="detail-head">강사명</div>
//                                 <div className="detail-head">수강요일</div>
//                                 <div className="detail-head">수강시간</div>
//                                 <div className="detail-head">수강날짜</div>
//                                 <div className="detail-head">수강인원</div>
//                                 <div className="detail-head">강의실</div>
//                                 <div className="detail-head">담당직원</div>
//                                 <div className="detail-head">담당직원 이메일</div>
//                                 <div className="detail-head">담당직원 연락처</div>
//                                 <div className="detail-head">안내사항</div>
//                             </div>
//                             <div className="course-detail-modal-cell" key={course.cosCode}>
//                                 <div className="detail-cell">{course.cosName}</div>
//                                 <div className="detail-cell">{course.teacherMemberName}</div>
//                                 <div className="detail-cell">{getFormattedDayStatus(course.dayStatus)}</div>
//                                 <div className="detail-cell">{getFormattedTimeStats(course.timeStatus)}</div>
//                                 <div className="detail-cell">{course.cosSdt} ~ {course.cosEdt}</div>
//                                 <div className="detail-cell">{course.curCnt}명</div>
//                                 <div className="detail-cell">{course.roomName}</div>
//                                 <div className="detail-cell">{course.staffMemberName}</div>
//                                 <div className="detail-cell">{course.staffMemberEmail}</div>
//                                 <div className="detail-cell">{course.staffMemberPhone}</div>
//                                 <div className="detail-cell">{course.cosNotice}</div>
//                             </div>
//                             <h3 className="h3-detail">강의</h3>
//                             <div className="lecture-detail-modal-div">
//                                 <div className="detail-head">강의명</div>
//                                 <div className="detail-head">교재</div>
//                                 <div className="detail-head">기술스택</div>
//                             </div>
//                             <div className="lecture-detail-modal-cell">
//                                 <div className="detail-cell">{course.lecName}</div>
//                                 <div className="detail-cell">{course.textbook}</div>
//                                 <div className="detail-cell">{course.techStack}</div>
//                             </div>
//                             <button className="modal-close-button" onClick={() => setCourseDetailInfoModal(false)}>
//                                 돌아가기
//                             </button>
//                         </div>
//                     </div>
//                 </div>
//             }
//         </>
//     );
// }
//
// export default MyLectureDetailInfo;
//
//
import { useEffect } from "react";

function MyLectureDetailInfo({ course, setCourseDetailInfoModal }) {
    // 모달 esc 적용
    useEffect(() => {
        const handleKeyPress = (e) => {
            if (e.key === 'Escape') {
                setCourseDetailInfoModal(false);
            }
        };

        window.addEventListener('keydown', handleKeyPress);

        return () => {
            window.removeEventListener('keydown', handleKeyPress);
        };
    }, [setCourseDetailInfoModal]);

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
            {course && (
                <div className="modal">
                    <div className="modal-container">
                        <h2>과정 상세 정보</h2>
                        <div className="detail-box-color">
                            <table>
                                <tbody>
                                <tr>
                                    <th>과정명</th>
                                    <td>{course.cosName}</td>
                                </tr>
                                <tr>
                                    <th>강사명</th>
                                    <td>{course.teacherMemberName}</td>
                                </tr>
                                <tr>
                                    <th>수강요일</th>
                                    <td>{getFormattedDayStatus(course.dayStatus)}</td>
                                </tr>
                                <tr>
                                    <th>수강시간</th>
                                    <td>{getFormattedTimeStats(course.timeStatus)}</td>
                                </tr>
                                <tr>
                                    <th>수강날짜</th>
                                    <td>{course.cosSdt} ~ {course.cosEdt}</td>
                                </tr>
                                <tr>
                                    <th>수강인원</th>
                                    <td>{course.curCnt}명</td>
                                </tr>
                                <tr>
                                    <th>강의실</th>
                                    <td>{course.roomName}</td>
                                </tr>
                                <tr>
                                    <th>담당직원</th>
                                    <td>{course.staffMemberName}</td>
                                </tr>
                                <tr>
                                    <th>담당직원 이메일</th>
                                    <td>{course.staffMemberEmail}</td>
                                </tr>
                                <tr>
                                    <th>담당직원 연락처</th>
                                    <td>{course.staffMemberPhone}</td>
                                </tr>
                                <tr>
                                    <th>안내사항</th>
                                    <td>{course.cosNotice}</td>
                                </tr>
                                <tr>
                                    <th>강의명</th>
                                    <td>{course.lecName}</td>
                                </tr>
                                <tr>
                                    <th>교재</th>
                                    <td>{course.textbook}</td>
                                </tr>
                                <tr>
                                    <th>기술스택</th>
                                    <td>{course.techStack}</td>
                                </tr>
                                </tbody>
                            </table>
                            <button className="modal-close-button" onClick={() => setCourseDetailInfoModal(false)}>
                                돌아가기
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

export default MyLectureDetailInfo;
