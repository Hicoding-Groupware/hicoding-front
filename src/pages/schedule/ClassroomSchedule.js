import ClassroomCalendar from "../../components/Schedule/ClassroomCalendar";
import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {callAllCoursesAPI, callCourseListAPI} from "../../apis/CourseAPICalls";
import {callClassroomsAPI} from "../../apis/ClassroomAPICalls";

function ClassroomSchedule(){

    const dispatch = useDispatch();
    const {courselist} = useSelector(state => state.courseReducer);
    const {classrooms} = useSelector(state => state.classroomReducer);

    useEffect(() => {
        dispatch(callClassroomsAPI());
        dispatch(callAllCoursesAPI());
    }, []);
    return(
        <>
            {courselist &&
            <ClassroomCalendar data = {courselist} classrooms = {classrooms}/>
            }
        </>
    );
}

export default ClassroomSchedule;