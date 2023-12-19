import AcademyCalendar from "../../components/Schedule/AcademyCalendar";
import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {callAllCoursesAPI, callCoursesAPI} from "../../apis/CourseAPICalls";

function AcademySchedule(){

    const dispatch = useDispatch();
    const {courselist} = useSelector(state => state.courseReducer);

    useEffect(() => {
        dispatch(callAllCoursesAPI());
    }, []);

    console.log(courselist)

    return(
        <>
            <div className="menuTitleWrap">
                <h3>과정일정</h3>
            </div>
            {courselist &&
            <AcademyCalendar data={courselist}/>
            }
        </>
    );
}

export default AcademySchedule