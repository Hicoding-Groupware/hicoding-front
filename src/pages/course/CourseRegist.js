import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {callCourseRegistAPI} from "../../apis/CourseAPICalls";
import {postSuccess} from "../../modules/CourseModule";
import {useNavigate} from "react-router-dom";
import {callLectureListAPI} from "../../apis/LectureAPICalls";
import {callClassroomsAPI} from "../../apis/ClassroomAPICalls";
import {callMemberListAPI} from "../../apis/MemberAPICalls";

function CourseRegist(){

    const [form, setForm] = useState({});
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const { postSuccess } = useSelector(state => state.courseReducer);
    const {lectures} = useSelector(state => state.lectureReducer);
    const [currentPage, setCurrentPage] = useState(1);
    const {classrooms} = useSelector(state => state.classroomReducer);
    const {memberlist} = useSelector(state => state.memberReducer);


    const onChangeHandler = e => {
        setForm({
            ...form,
            [e.target.name] : e.target.value
        })
    }

    useEffect(() => {
        dispatch(callLectureListAPI({currentPage}));
        dispatch(callClassroomsAPI());
        dispatch(callMemberListAPI());
        if(postSuccess === true) {
            navigate('/courses/proceeding', { replace : true });
        }
    }, [postSuccess]);

    const onClickCourseRegistrationHandler = () => {

        dispatch(callCourseRegistAPI({registRequest : form }));

    }
    console.log(form)

    return(
        <>
            <div className="menuTitleWrap">
                <h3>신규 과정 등록</h3>
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
                            {lectures && lectures.data.map(lecture=>(
                            <option value={lecture.lecCode}>{lecture.lecName}</option>
                            ))}

                        </select></dd>
                    </dl>
                    <dl>
                        <dt>강의실</dt>
                        <dd><select name='roomCode' onChange={onChangeHandler}>
                            <option>선택</option>
                            {classrooms && classrooms.map(classroom=>(
                            <option value={classroom.roomCode}>{classroom.roomName}</option>
                            ))}
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
                            {memberlist && memberlist.map(member=>(
                                member.memberRole == 'TEACHER' &&
                                <option value={member.memberNo}>{member.memberName}T</option>
                            ))}
                        </select></dd>
                    </dl>
                    <dl>
                        <dt>담당자</dt>
                        <dd><select name='staff' onChange={onChangeHandler}>
                            <option>선택</option>
                            {memberlist && memberlist.map(member=>(
                                member.memberRole != 'TEACHER' &&
                                <option value={member.memberNo}>{member.memberName}</option>
                            ))}
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

export default CourseRegist