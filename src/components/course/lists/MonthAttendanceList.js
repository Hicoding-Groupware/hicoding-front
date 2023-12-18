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

    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setIsLoading(true);
        dispatch(callMyCourseStudentMonthListAPI({ cosCode }))
            .then(() => {
                setIsLoading(false);
            })
            .catch(error => {
                console.error("에러 페칭 데이타 : ", error);
                setIsLoading(false);
            });
    }, [dispatch, cosCode]);

    if (isLoading) {
        return <div>loading...</div>
    }

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