import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {callMyCourseStudentListAPI} from "../../../apis/AttendanceAPICalls";
import MyCourseStudentListItem from "../items/MyCourseStudentListItem";
import {useParams} from "react-router-dom";


function DailyAttendanceList() { // 이 부분 체크!!

    const {students} = useSelector(state => state.attendanceReducer);
    const [currentPage, setCurrentPage] = useState(1);
    const dispatch = useDispatch();
    const {cosCode} = useParams();

    const [selectedDate, setSelectedDate] = useState(new Date()); // 선택된 날짜 상태 추가

    useEffect(() => {
        /* 해당 강의 일별 출석부 - 학생 정보 리스트 조회 */
        dispatch(callMyCourseStudentListAPI({cosCode}));

    }, []);


    return(
        <>
            <MyCourseStudentListItem cosCode={cosCode}
                 students={students} setCurrentPage={setCurrentPage}/>
        </>
    );
}

export default DailyAttendanceList;