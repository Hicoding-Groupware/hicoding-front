import {useDispatch, useSelector} from "react-redux";
import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {callCourseDetailAPI} from "../../apis/CourseAPICalls";
import CourseItem from "../../components/course/items/CourseItem";
import LectureList from "../../components/lecture/lists/LectureList";
import {callLectureListAPI} from "../../apis/LectureAPICalls";

function CourseDetail (){

    const dispatch = useDispatch();
    const { cosCode } = useParams();
    const [currentPage, setCurrentPage] = useState(1);
    const { course } = useSelector(state => state.courseReducer);
    const {lectures} = useSelector(state => state.lectureReducer);


    useEffect(() => {
        dispatch(callCourseDetailAPI({cosCode}));
        dispatch(callLectureListAPI({currentPage}));
        }, []);


    return(
        <>
            {course &&
                lectures&&
                <>
                <div className="courseDetailWrap">
                    <CourseItem course = {course}/>
                </div>
                    <LectureList data={lectures.data} course = {course}/>
                </>
            }
        </>
    )
}

export default CourseDetail;

