import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {callLectureListAPI} from "../../apis/LectureAPICalls";
import LectureListItem from "./LectureListItem";

function LectureList({data}){

    const dispatch = useDispatch();
    const [currentPage, setCurrentPage] = useState(1);
    const {lectures} = useSelector(state => state.lectureReducer);

    useEffect(() => {
        dispatch(callLectureListAPI({currentPage}));
    }, []);

    return(
        <>
            {
                data &&
                data.map(lecture => <LectureListItem key={lecture.lecCode} lecture={lecture}/>)
            }
        </>
    );
}

export default LectureList;
