import {isAdmin} from "../../../utils/TokenUtils";
import {useEffect, useState} from "react";
import LectureCreateModal from "../modal/LectureCreateModal";
import LectureUpdateModal from "../modal/LectureUpdateModal";
import {useDispatch, useSelector} from "react-redux";
import {callLectureDetailAPI, callLectureRemoveAPI} from "../../../apis/LectureAPICalls";

function LectureList({data,course}){


    const dispatch = useDispatch()
    const [lecCode,setLecCode] = useState(null);
    const [lectureCreateModal, setLectureCreateModal] = useState(false);
    const [lectureUpdateModal, setLectureUpdateModal] = useState(false);
    const {lecture} = useSelector(state => state.lectureReducer);


    const lectureCreateHandler = () => {setLectureCreateModal(true)};
    const lectureUpdateHandler = () => {
        setLectureUpdateModal(true);
    };


    const lectureDeleteHandler = () => {
        if(lecCode != null) {
            if (!window.confirm('해당 강의를 삭제하시겠습니까?')) {
                alert('취소되었습니다.')
                return false;
            } else {
                dispatch(callLectureRemoveAPI({lecCode}))
            }
        }
    }

    return(
<>
        {isAdmin()&& document.location.pathname === '/lecture'&&
        <div className="btnArea">
            <div>
                <button className='buttonD' onClick={()=>lectureCreateHandler()} >등록</button>
                <button className='buttonD' onClick={()=>lectureUpdateHandler()} >수정</button>
                <button className='buttonD' onClick={lectureDeleteHandler}>삭제</button>
            </div>
        </div>
}
    {lectureCreateModal && <LectureCreateModal setLectureCreateModal = {setLectureCreateModal}/>}
    {lectureUpdateModal && <LectureUpdateModal setLectureUpdateModal = {setLectureUpdateModal} lecCode = {lecCode}/>}

        <table className="lecture-table">
            <thead>
                <tr>
                    <td>강의명</td>
                    <td>교재</td>
                    <td>기술스택</td>
                </tr>
            </thead>
            <tbody>
            {data.map(lecture => (
                <tr key={lecture.lecCode}
                    style={document.location.pathname === '/lecture' ? lecCode === lecture.lecCode ? {background : '#3a74d614'} : null : lecture.lecCode === course ? {background : '#3a74d614'} : null}
                    onClick={()=>{setLecCode(lecture.lecCode)}}
                >
                    <td>{lecture.lecName}</td>
                    <td>{lecture.textbook}</td>
                    <td>{lecture.techStack}</td>
                </tr>
            ))}
            </tbody>
        </table>
</>
    );
}

export default LectureList;