import ClassroomCalendar from "../../components/Schedule/ClassroomCalendar";
import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {callCourseListAPI} from "../../apis/CourseAPICalls";
import {callClassroomsAPI} from "../../apis/ClassroomAPICalls";

function ClassroomSchedule(){

    const dispatch = useDispatch();
    const [currentPage, setCurrentPage] = useState(1);
    const {courses} = useSelector(state => state.courseReducer);
    const {classrooms} = useSelector(state => state.classroomReducer);

    useEffect(() => {
        dispatch(callClassroomsAPI());
        dispatch(callCourseListAPI({currentPage}));
    }, [currentPage]);
    return(
        <>
            {courses &&
            <ClassroomCalendar data = {courses.data} classrooms = {classrooms}/>
            }
        </>
    );
}

export default ClassroomSchedule;