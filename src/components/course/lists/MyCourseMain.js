import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {callMyCourseListAPI} from "../../../apis/MyCourseAPICalls";
import InProgressList from "./InProgressList";
import {useParams} from "react-router-dom";

function MyCourseMain() {

    const dispatch = useDispatch();
    const { cosCode } = useParams();
    const {courses} = useSelector(state => state.myCourseReducer); // api
    const [currentPage, setCurrentPage] = useState(1); // api

    useEffect(() => {
        /* 진행 중인 강의(과정)에 대한 정보 요청 */
        dispatch(callMyCourseListAPI({currentPage, cosCode}));
    }, [currentPage, cosCode]);


    return(
        <>
            {
                courses &&
                <div className="course-main">
                    <InProgressList course={courses} data={courses.data}/>
                </div>
            }
        </>
    );
}

export default MyCourseMain;