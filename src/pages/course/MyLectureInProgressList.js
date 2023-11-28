import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import PagingBar from "../../components/common/PagingBar";
import {callCourseListAPI} from "../../apis/CourseAPICalls";
import {ToastContainer} from "react-toastify";
import LectureDetailInfoModal from "../../components/modal/LectureDetailInfoModal";


function MyLectureInProgressList() {

    const [courseDetailInfoModal, setCourseDetailInfoModal] = useState(false)
    const [cosCode, setCosCode] = useState(0)
    const [currentPage, setCurrentPage] = useState(1);
    const {courses} = useSelector(state => state.courseReducer);
    const dispatch = useDispatch();

    useEffect(() => {
        /* 진행 중인 강의(과정)에 대한 정보 요청 */
        dispatch(callCourseListAPI({currentPage}));
    }, [currentPage]);

    /* 강의 상세 조회 모달 */
    // const onClickDetailLectureInfoHandler = (cosCode) => {
    //     setCosCode(cosCode);
    //     setCourseDetailInfoModal(true);
    // };

    /* 일일 출결 관리 페이지로 이동 */
    // const onClickDayAttendanceHandler (cosCode) => {
    //     set
    // };

    return (
        <>
            <ToastContainer hideProgressBar={true} position="top-center"/>
            {
                courseDetailInfoModal &&
                <LectureDetailInfoModal
                    cosCode={cosCode}
                    setCourseDetailInfoModal={setCourseDetailInfoModal}
                />
            }
            {
                courses &&
                <>
                    <div className="">
                        <h1>진행중인 강의</h1>
                        <table className="">
                            <colgroup>
                                <col width="20%"/>
                                <col width="20%"/>
                                <col width="20%"/>
                                <col width="20%"/>
                                <col width="20%"/>
                                <col width="20%"/>
                            </colgroup>
                            <thead>
                            <tr>
                                <th>강의명</th>
                                <th>담당 강사</th>
                                <th>요일</th>
                                <th>시간</th>
                                <th>수강 인원</th>
                                <th>강의실</th>
                                <th>기간</th>
                            </tr>
                            </thead>
                            <tbody>
                            {courses.data.map(course => (
                                <tr key={course.cosName}>
                                    <td>{course.memberName}</td>
                                    <td>{course.dayStatus}</td>
                                    <td>{course.timeStatus}</td>
                                    <td>{course.curCnt}</td>
                                    <td>{course.roomName}</td>
                                    <td>{course.cosSdt} ~ {course.cosEdt}</td>
                                    <td>
                                        <button
                                            // className=""
                                            // onClick={() =>
                                            //     onClickDayAttendanceHandler(course.cosCode)
                                            // }
                                        >
                                            출석 관리
                                        </button>
                                    </td>
                                </tr>
                            ))
                            }
                            </tbody>
                        </table>
                    </div>
                    <PagingBar pageInfo={courses.pageInfo} setCurrentPage={setCurrentPage}/>
                </>
            }
        </>
    );
}

export default MyLectureInProgressList;