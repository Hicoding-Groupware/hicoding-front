import {callCourseRegistAPI} from "../../apis/CourseAPICalls";
import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";

function CourseModify(){

    const [form, setForm] = useState({});
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const { postSuccess } = useSelector(state => state.courseReducer);

    const onChangeHandler = e => {
        setForm({
            ...form,
            [e.target.name] : e.target.value
        })
    }

    useEffect(() => {
        if(postSuccess === true) {
            navigate('/courses', { replace : true });
        }
    }, [postSuccess]);

    const onClickCourseRegistrationHandler = () => {

        dispatch(callCourseRegistAPI({registRequest : form }));

    }

    return(
        <>
            <div className="menuTitleWrap">
                <h3>과정 수정</h3>
            </div>
            <div className="btnArea">
                <div>
                    <button className='buttonD' onClick={()=> navigate(-1)}>목록</button>
                    <p>최근수정일:1111</p>
                </div>
            </div>
            <div className="courseRegistWrap">
                <div className="titleBox">
                    <p className="courseTitle">
                        <input
                            name='cosName'
                            className='courseTitleInput'
                            type='text'
                            placeholder="과정명"
                            onChange={onChangeHandler}
                        />
                        <span className="statusTag"></span>
                    </p>
                </div>
                <div className="courseInfo">
                    <dl>
                        <dt>기간</dt>
                        <dd><input
                            name='cosSdt'
                            className='cosDateInput'
                            type='date'
                            onChange={onChangeHandler}
                        /> ~ <input
                            name='cosEdt'
                            className='cosDateInput'
                            type='date'
                            onChange={onChangeHandler}
                        /></dd>
                    </dl>
                    <dl>
                        <dt>요일</dt>
                        <dd><label><input type='radio' name='dayStatus' value='WEEKDAY' onChange={onChangeHandler}/>주중</label>
                            <label><input type='radio' name='dayStatus' value='WEEKEND' onChange={onChangeHandler}/>주말</label></dd>
                    </dl>
                    <dl>
                        <dt>시간</dt>
                        <dd><label><input type='radio' name='timeStatus' value='MORNING' onChange={onChangeHandler}/>오전(09~13)</label>
                            <label><input type='radio' name='timeStatus' value='AFTERNOON' onChange={onChangeHandler}/>오후(14~18)</label>
                            <label><input type='radio' name='timeStatus' value='ALLDAY' onChange={onChangeHandler}/>종일(09~18)</label></dd>
                    </dl>
                    <dl>
                        <dt>강의</dt>
                        <dd><select name='lecCode' onChange={onChangeHandler}>
                            <option>선택</option>
                            <option value={1}>강의1</option>

                        </select></dd>
                    </dl>
                    <dl>
                        <dt>강의실</dt>
                        <dd><select name='roomCode' value={1} onChange={onChangeHandler}>
                            <option>선택</option>
                            <option value={1}>1강의장</option>
                            <option value={2}>2강의장</option>
                            <option value={3}>3강의장</option>
                            <option value={4}>4강의장</option>
                            <option value={5}>5강의장</option>
                        </select></dd>
                    </dl>
                    <dl>
                        <dt>모집정원</dt>
                        <dd><input
                            name='capacity'
                            className='capacityInput'
                            type='number'
                            onChange={onChangeHandler}
                        /> 명</dd>
                    </dl>
                    <dl>
                        <dt>강사</dt>
                        <dd><select name='teacher' onChange={onChangeHandler}>
                            <option>선택</option>
                            <option value={1}>박미림</option>
                        </select></dd>
                    </dl>
                    <dl>
                        <dt>담당자</dt>
                        <dd><select name='staff' onChange={onChangeHandler}>
                            <option>선택</option>
                            <option value={1}>박미림</option>
                        </select></dd>
                    </dl>
                </div>
                <div className="notice">
                    <p className="courseTitle">안내사항</p>
                    <textarea className='courseNotice' name='cosNotice' onChange={onChangeHandler}></textarea>
                </div>
            </div>
            <div className='registBtnArea'>
                <button className='buttonD' onClick={onClickCourseRegistrationHandler}>등록</button>
            </div>
        </>
    );
}

export default CourseModify;