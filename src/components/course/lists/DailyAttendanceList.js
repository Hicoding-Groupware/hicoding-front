import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {callMyCourseStudentListAPI} from "../../../apis/AttendanceAPICalls";
import MyCourseStudentListItem from "./MyCourseStudentListItem";


function DailyAttendanceList({course}) {

    const {students} = useSelector(state => state.attendanceReducer);
    const [currentPage, setCurrentPage] = useState(1);
    const dispatch = useDispatch();

    useEffect(() => {
        /* 해당 강의 일별 출석부 - 학생 정보 리스트 조회 */
        dispatch(callMyCourseStudentListAPI({currentPage}));
    }, [currentPage]);

    return(
        <>
            <MyCourseStudentListItem course={course}
                 students={students} setCurrentPage={setCurrentPage}/>
        </>
    );
}

export default DailyAttendanceList;