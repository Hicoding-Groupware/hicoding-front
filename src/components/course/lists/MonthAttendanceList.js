import {useDispatch, useSelector} from "react-redux";
import {useLocation, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {callMyCourseStudentMonthListAPI} from "../../../apis/AttendanceAPICalls";
import MyCourseStudentListMonthItem from "../items/MyCourseStudentListMonthItem";

function MonthAttendanceList() {

    const dispatch = useDispatch();
    const { monthStudents } = useSelector(state => state.attendanceReducer);
    const { cosCode } = useParams();
    const location = useLocation();
    const { cosName } = location.state || {};

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


    //
    // useEffect(() => {
    //     /* 해당 강의 월별 출석부 - 학생 정보, 출석 정보 리스트 조회 */
    //     dispatch(callMyCourseStudentMonthListAPI({cosCode}));
    // }, []);


    if (isLoading) {
        return <div>loading...</div>
    }

    return(
        <>
            <MyCourseStudentListMonthItem
                title={cosName}
                monthStudents={monthStudents}
            />
        </>
    )
}


export default MonthAttendanceList;