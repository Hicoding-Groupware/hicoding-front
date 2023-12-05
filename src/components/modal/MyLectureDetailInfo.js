import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {callCourseDetailAPI} from "../../apis/MyCourseAPICalls";
import {useParams} from "react-router-dom";

function MyLectureDetailInfo() {

    const dispatch = useDispatch();
    const { cosCode } = useParams();
    const { course } = useSelector(state => state.myCourseReducer);

    useEffect(() => {
        dispatch(callCourseDetailAPI({cosCode}));
    }, [cosCode]);

    return(
        <>
            {
                course &&
                <div className="detail-container">
                    <h2>과정 상세 정보</h2>
                    <div>
                        <div className="detail-box">
                            <div className="detail-table header">
                                <h3>과정</h3>
                                <div className="detail-head-cell">과정명</div>
                                <div className="detail-head-cell">강사명</div>
                                <div className="detail-head-cell">수강요일</div>
                                <div className="detail-head-cell">수강시간</div>
                                <div className="detail-head-cell">수강날짜</div>
                                <div className="detail-head-cell">수강인원</div>
                                <div className="detail-head-cell">강의실</div>
                                <div className="detail-head-cell">담당직원</div>
                                <div className="detail-head-cell">담당직원 이메일</div>
                            </div>
                            <div>
                                {course.data.map((course, index) => (
                                    <div key={course.cosCode || index} className="">
                                        <div className="detail-cell">{course.cosName}</div>
                                        <div className="detail-cell">{course.teacherMemberName}</div>
                                        <div className="detail-cell">{course.dayStatus}</div>
                                        <div className="detail-cell">{course.timeStatus}</div>
                                        <div className="detail-cell">{course.cosSdt} ~ {course.cosEdt}</div>
                                        <div className="detail-cell">{course.cosCnt}명</div>
                                        <div className="detail-cell">{course.roomName}</div>
                                        <div className="detail-cell">{course.staffMemberName}</div>
                                        <div className="detail-cell">{course.staffMemberEamil}</div>
                                    </div>
                                    ))}
                            </div>
                        </div>
                    </div>
                </div>
            }
        </>
    );
}

export default MyLectureDetailInfo;