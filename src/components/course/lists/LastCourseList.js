import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {callLastMyCourseListAPI} from "../../../apis/MyCourseAPICalls";
import MyCourseListItem from "../items/MyCourseListItem";
import PagingBar from "../pagingbar/PagingBar";
import MyPagingBar from "../../common/MyPagingBar";


function LastCourseList() {

    const {courses} = useSelector(state => state.myCourseReducer);
    const [currentPage, setCurrentPage] = useState(1);
    const dispatch = useDispatch();

    useEffect(() => {
        /* 지난 강의(과정)에 대한 정보 요청 */
        dispatch(callLastMyCourseListAPI({currentPage}));

    }, [currentPage]);


    return (
        <>
            <MyCourseListItem title="지난 강의" listType="LastCourseList"
                              courses={courses} setCurrentParge={setCurrentPage}/>
            <MyPagingBar pageInfo={courses.pageInfo} setCurrentPage={setCurrentPage}/>
        </>
    );
}

export default LastCourseList;
