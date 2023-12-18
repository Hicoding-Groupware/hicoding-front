import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {callExpectedCourseListAPI} from "../../apis/CourseAPICalls";
import CourseList from "../../components/course/lists/CourseList";
import PagingBar from "../../components/course/pagingbar/PagingBar";
import {NavLink} from "react-router-dom";

function CourseMainProceeding(){

    const dispatch = useDispatch();
    const [currentPage, setCurrentPage] = useState(1);
    const {courses} = useSelector(state => state.courseReducer);

    useEffect(() => {
        dispatch(callExpectedCourseListAPI({currentPage}));
    }, [currentPage]);

    return(
        <>
            <div className="menuTitleWrap">
                <h3>과정관리</h3>
            </div>
            {
                courses &&
                <>
                    <div className="listFilterArea">
                        <NavLink to='/courses/proceeding'><button className="courseListTypeBtn" style={{borderBottom : "2px solid #e2e2e4" }}>진행중</button></NavLink>
                        <button className="courseListTypeBtn" style={{border : "2px solid #e2e2e4", borderBottom : "none" }}>개강예정</button>
                        <div className="blankSpace"></div>
                    </div>
                    <CourseList data={courses.data}/>
                    <PagingBar pageInfo={courses.pageInfo} setCurrentPage={setCurrentPage}/>
                </>
            }
        </>
    );

}

export default CourseMainProceeding;