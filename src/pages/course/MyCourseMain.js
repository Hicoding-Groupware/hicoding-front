/* 메인 페이지 만들 것 */

import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {callMyCourseListAPI} from "../../apis/MyCourseAPICalls";
import InProgressList from "../../components/course/lists/InProgressList";
import PagingBar from "../../components/course/pagingbar/PagingBar";

function MyCourseMain() {

    // const dispatch = useDispatch();
    // const [currentPage, setCurrentPage] = useState(1);
    // const {course} = useSelector(state => state.myCourseReducer);
    //
    // useEffect(() => {
    //     dispatch(callMyCourseListAPI({currentPage}));
    // }, [currentPage]);

    return (
        <>
            안녕하세요
            {/*{*/}
            {/*    course &&*/}
            {/*    <>*/}
            {/*        <InProgressList data={course}/>*/}
            {/*        <PagingBar pageInfo={course.pageInfo} setCurrentPage={setCurrentPage}/>*/}
            {/*    </>*/}
            {/*}*/}
        </>
    );
}

export default MyCourseMain;