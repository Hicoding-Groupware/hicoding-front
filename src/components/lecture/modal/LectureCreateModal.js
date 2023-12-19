import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import {callLectureListAPI, callLectureRegistAPI} from "../../../apis/LectureAPICalls";

function LectureCreateModal({setLectureCreateModal}){

    const [form, setForm] = useState({});
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const { postSuccess } = useSelector(state => state.lectureReducer);
    const [currentPage, setCurrentPage] = useState(1);


    useEffect(() => {
        if( postSuccess === true) {
            navigate('/lecture', { replace : true });
        }
    }, [postSuccess,currentPage]);

    const onChangeHandler = e => {
        setForm({
            ...form,
            [e.target.name] : e.target.value
        })
    }

    const lectureRegistHandler = () => {

        dispatch(callLectureRegistAPI({registRequest : form }));

    }


    return(
    <>
        <div className='lectureModal'>
            <div className='modalBody'>
                <button className='modalCloseBtn' onClick={()=>setLectureCreateModal(false)}>X</button>
                <div className='modalContent'>
                <h2>신규 강의 등록</h2>

                    <input name='lecName' placeholder='강의명' onChange={onChangeHandler}/>
                    <input name='textbook' placeholder='교재' onChange={onChangeHandler}/>
                    <input name='techStack' placeholder='기술스택' onChange={onChangeHandler}/>

                    <button className='modalRegistBtn' onClick={lectureRegistHandler}>등록</button>
                    <button className='modalCancelBtn' onClick={()=>setLectureCreateModal(false)}>취소</button>
                </div>
            </div>
        </div>
    </>
    )
}
export default LectureCreateModal;
