import AcademyCalendar from "../../components/Schedule/AcademyCalendar";
import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {callCourseListAPI} from "../../apis/CourseAPICalls";

function AcademySchedule(){

    const dispatch = useDispatch();
    const [currentPage, setCurrentPage] = useState(1);
    const {courses} = useSelector(state => state.courseReducer);

    console.log(courses)
    useEffect(() => {
        dispatch(callCourseListAPI({currentPage}));
    }, [currentPage]);

    return(
        <>
            {courses &&
            <AcademyCalendar data={courses.data}/>
            }
        </>
    );
}

export default AcademySchedule