import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {callLectureDetailAPI, callLectureModifyAPI} from "../../../apis/LectureAPICalls";
import {useNavigate, useParams} from "react-router-dom";

function LectureUpdateModal({setLectureUpdateModal,lecCode}){

    const [form, setForm] = useState();
    const dispatch = useDispatch();
    const {putSuccess} = useSelector(state => state.lectureReducer);
    const navigate = useNavigate();



    const onChangeHandler = e => {
        setForm({
            ...form,
            [e.target.name] : e.target.value
        })
    }

    useEffect(() => {
        if(putSuccess === true) {
            navigate(`/lecture`, { replace : true });
        }
    }, [putSuccess]);


    const lectureUpdateHandler = () =>{

        dispatch(callLectureModifyAPI({lecCode, modifyRequest : form }));
    }


    return(
    <>
        <div className='lectureModal'>
            <div className='modalBody'>
                <button className='modalCloseBtn'onClick={()=>setLectureUpdateModal(false)}>X</button>
                <div className='modalContent'>
                    <h2>강의 수정</h2>

                    <input name='lecName' placeholder='강의명' onChange={onChangeHandler} />
                    <input name='textbook' placeholder='교재' onChange={onChangeHandler}/>
                    <input name='techStack' placeholder='기술스택'  onChange={onChangeHandler}/>

                    <button className='modalRegistBtn' onClick={lectureUpdateHandler}>수정</button>
                    <button className='modalCancelBtn' onClick={()=>setLectureUpdateModal(false)}>취소</button>
                </div>

            </div>
        </div>
    </>
    )
}
export default LectureUpdateModal;
