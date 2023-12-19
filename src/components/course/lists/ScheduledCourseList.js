import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {callScheduledMyCourseListAPI} from "../../../apis/MyCourseAPICalls";
import MyCourseListItem from "../items/MyCourseListItem";
import PagingBar from "../pagingbar/PagingBar";
import MyPagingBar from "../../common/MyPagingBar";


function ScheduledCourseList() {

    const {courses} = useSelector(state => state.myCourseReducer);
    const [currentPage, setCurrentPage] = useState(1);
    const dispatch = useDispatch();

    useEffect(() => {
        /* 예정 강의(과정)에 대한 정보 요청 */
        dispatch(callScheduledMyCourseListAPI({currentPage}));
    }, [currentPage]);

    return (
        <>
            <MyCourseListItem title="예정 강의" listType="ScheduledCourseList"
                              courses={courses} setCurrentPage={setCurrentPage}/>
            <MyPagingBar pageInfo={courses.pageInfo} setCurrentPage={setCurrentPage}/>

        </>
    );
}

export default ScheduledCourseList;
