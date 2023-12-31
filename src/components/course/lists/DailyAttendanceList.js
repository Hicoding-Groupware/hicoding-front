import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {callMyCourseStudentListAPI} from "../../../apis/AttendanceAPICalls";
import MyCourseStudentListItem from "../items/MyCourseStudentListItem";
import {useLocation, useParams} from "react-router-dom";


function DailyAttendanceList() { // 이 부분 체크!!

    const { students } = useSelector(state => state.attendanceReducer);
    const [currentPage, setCurrentPage] = useState(1);
    const dispatch = useDispatch();
    const { cosCode} = useParams();
    const location = useLocation();
    const { course } = location.state || {};


    useEffect((course) => {
        /* 해당 강의 일별 출석부 - 학생 정보 리스트 조회 */
        dispatch(callMyCourseStudentListAPI({cosCode}));
    }, []);


    return(
        <>
            {course && <MyCourseStudentListItem
                course={course}
                cosCode={cosCode}
                cosSdt={course.cosSdt}
                cosEdt={course.cosEdt}
                dayStatus={course.dayStatus}
                attendanceStatus={course.attendanceStatus}
                students={students} setCurrentPage={setCurrentPage}/>}
        </>
    );
}

export default DailyAttendanceList;