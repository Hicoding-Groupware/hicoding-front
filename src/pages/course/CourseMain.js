import LectureList from "../../components/lecture/lists/LectureList";
import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {callLectureListAPI} from "../../apis/LectureAPICalls";
import {callCourseListAPI} from "../../apis/CourseAPICalls";
import CourseList from "../../components/course/lists/CourseList";
import PagingBar from "../../components/course/pagingbar/PagingBar";
import CourseFilter from "../../components/course/filter/CourseFilter";

function CourseMain(){

    const dispatch = useDispatch();
    const [currentPage, setCurrentPage] = useState(1);
    const {courses} = useSelector(state => state.courseReducer);

    useEffect(() => {
        dispatch(callCourseListAPI({currentPage}));
    }, [currentPage]);

    return(
        <>
            {
                courses &&
                <>
                    <CourseFilter/>
                    <CourseList data={courses.data}/>
                    <PagingBar pageInfo={courses.pageInfo} setCurrentPage={setCurrentPage}/>
                </>
            }
        </>
    );

}

export default CourseMain;