import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import LectureList from "../../components/lecture/lists/LectureList";
import {callLectureListAPI} from "../../apis/LectureAPICalls";

function LectureMain(){

    const dispatch = useDispatch();
    const [currentPage, setCurrentPage] = useState(1);
    const {lectures} = useSelector(state => state.lectureReducer);

    useEffect(() => {
        dispatch(callLectureListAPI({currentPage}));
    }, [currentPage]);

    return(
        <>
            <div className="menuTitleWrap">
                <h3>강의관리</h3>
            </div>
            {
                lectures &&
                <>
                    <LectureList data={lectures.data}/>
                </>
            }
        </>
    );
}

export default LectureMain;
