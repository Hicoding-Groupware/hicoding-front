import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import {post} from "axios";
import {callMyCourseDetailListAPI} from "../../apis/callMyCourseDetailListAPI";

function MyLectureDetailInfoModal({ cosCode, setCourseDetailInfoModal }) {

    const [cosCode, setCosCode] = useState({cosCode}); // 0?
    const [currentPage, setCurrentPage] = useState(1);
    const {courses} = useSelector((state) => state.myCourseReducer);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(callMyCourseDetailListAPI({currentPage}));
    }, [currentPage]);

    return(
        <div className="modal">
            <h2>과정 상세 정보</h2>
            <div className="modal-container">
                <h3>과정 정보</h3>
                <div className="modal-row coursr header">
                    <div className="modal-cell">과정명</div>
                    <div className="modal-cell">강사명</div>
                    <div className="modal-cell">수강 요일</div>
                    <div className="modal-cell">수강 시간</div>
                    <div className="modal-cell">수강 날짜</div>
                    <div className="modal-cell">수강 인원</div>
                    <div className="modal-cell">강의실</div>
                    <div className="modal-cell">담당 직원</div>
                </div>
                <h3>강의 정보</h3>
                <div className="modal-row lectuer header">
                    <div className="modal-cell">강의명</div>
                    <div className="modal-cell">교재</div>
                    <div className="modal-cell">기능</div>
                </div>



                <button
                onClick={() => setCourseDetailInfoModal(false)}
                >
                    돌아가기
                </button>
            </div>
        </div>
    );
}

export default MyLectureDetailInfoModal;