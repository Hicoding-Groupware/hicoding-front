import {useDispatch, useSelector} from "react-redux";
import {useLocation, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import MyCourseStudentListMonthItem from "../items/MyCourseStudentListMonthItem";
import {callMyCourseStudentMonthListAPI} from "../../../apis/AttendanceAPICalls";

function MonthAttendanceList() {

    const dispatch = useDispatch();
    const { monthStudentsInfo } = useSelector(state => state.attendanceReducer);
    const { cosCode } = useParams();
    const location = useLocation();
    const { cosName, dayStatus, cosSdt, cosEdt } = location.state || {};


    return(
        <>
            <MyCourseStudentListMonthItem
                cosCode={cosCode}
                title={cosName}
                monthStudents={monthStudentsInfo || []}
                dayStatus={dayStatus}
                cosSdt={cosSdt}
                cosEdt={cosEdt}
            />
        </>
    )
}


export default MonthAttendanceList;