import {callCourseDetailAPI, callCourseModifyAPI, callCourseRegistAPI} from "../../apis/CourseAPICalls";
import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate, useParams} from "react-router-dom";
import {callLectureListAPI} from "../../apis/LectureAPICalls";
import {callClassroomsAPI} from "../../apis/ClassroomAPICalls";
import {callMemberListAPI} from "../../apis/MemberAPICalls";
import {putSuccess} from "../../modules/CourseModule";

function CourseModify(){

    const {cosCode} = useParams()
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const { course, putSuccess } = useSelector(state => state.courseReducer);
    const {lectures} = useSelector(state => state.lectureReducer);
    const [currentPage, setCurrentPage] = useState(1);
    const {classrooms} = useSelector(state => state.classroomReducer);
    const {memberlist} = useSelector(state => state.memberReducer);
    const [form, setForm] = useState({});

    const onChangeHandler = e => {
        setForm({
            ...form,
            [e.target.name] : e.target.value
        })
    }


    useEffect(() => {
        dispatch(callCourseDetailAPI({cosCode}));
        dispatch(callLectureListAPI({currentPage}));
        dispatch(callClassroomsAPI());
        dispatch(callMemberListAPI());
        course &&
        setForm({
            'cosName' : `${course.cosName}`,
            'cosSdt' : `${course.cosSdt}`,
            'cosEdt' : `${course.cosEdt}`,
            'dayStatus' : `${course.dayStatus}`,
            'timeStatus' : `${course.timeStatus}`,
            'lecCode' : `${course.lecCode}`,
            'roomCode' : `${course.roomCode}`,
            'capacity' : `${course.capacity}`,
            'teacher' : `${course.teacherCode}`,
            'staff' : `${course.staffCode}`,
        })
        if(putSuccess === true) {
            navigate(`/courses/${cosCode}`, { replace : true });
        }
    }, [putSuccess]);


    const onClickCourseUpdateHandler = () => {

        dispatch(callCourseModifyAPI({cosCode, modifyRequest : form }));

    }

    console.log(form)

    return(
        course &&
        <>
            <div className="menuTitleWrap">
                <h3>과정 수정</h3>
            </div>
            <div className="btnArea">
                <div>

                    <button className='buttonD' onClick={()=> navigate(-1)}>목록</button>
                    <p>최근수정일: {course.modifiedAt.replace('T',' ')}</p>
                </div>
            </div>
            <div className="courseRegistWrap">
                <div className="titleBox">
                    <p className="courseTitle">
                        <input
                            name='cosName'
                            className='courseTitleInput'
                            type='text'
                            defaultValue={course.cosName}
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
                            defaultValue={course.cosSdt}
                            onChange={onChangeHandler}
                        /> ~ <input
                            name='cosEdt'
                            className='cosDateInput'
                            type='date'
                            defaultValue={course.cosEdt}
                            onChange={onChangeHandler}
                        /></dd>
                    </dl>
                    <dl>
                        <dt>요일</dt>
                        <dd><label><input type='radio' name='dayStatus' value='WEEKDAY' defaultChecked={course.dayStatus === 'WEEKDAY' && "checked"} onChange={onChangeHandler}/>주중</label>
                            <label><input type='radio' name='dayStatus' value='WEEKEND' defaultChecked={course.dayStatus === 'WEEKEND' && "checked"} onChange={onChangeHandler}/>주말</label></dd>
                    </dl>
                    <dl>
                        <dt>시간</dt>
                        <dd><label><input type='radio' name='timeStatus' value='MORNING' defaultChecked={course.timeStatus === 'MORNING' && "checked"} onChange={onChangeHandler}/>오전(09~13)</label>
                            <label><input type='radio' name='timeStatus' value='AFTERNOON' defaultChecked={course.timeStatus === 'AFTERNOON' && "checked"} onChange={onChangeHandler}/>오후(14~18)</label>
                            <label><input type='radio' name='timeStatus' value='ALLDAY' defaultChecked={course.timeStatus === 'ALLDAY' && "checked"} onChange={onChangeHandler}/>종일(09~18)</label></dd>
                    </dl>
                    <dl>
                        <dt>강의</dt>
                        <dd><select name='lecCode' key={course.lecCode} defaultValue={course.lecCode} onChange={onChangeHandler}>
                            {lectures && lectures.data.map(lecture=>(
                                <option value={lecture.lecCode} >{lecture.lecName}</option>
                            ))}

                        </select></dd>
                    </dl>
                    <dl>
                        <dt>강의실</dt>
                        <dd><select name='roomCode' defaultValue={course.roomCode} onChange={onChangeHandler}>
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
                            defaultValue={course.capacity}
                            onChange={onChangeHandler}
                        /> 명</dd>
                    </dl>
                    <dl>
                        <dt>강사</dt>
                        <dd><select name='teacher' defaultValue={course.teacherCode} onChange={onChangeHandler}>
                            {memberlist && memberlist.map(member=>(
                                member.memberRole == 'TEACHER' &&
                                <option value={member.memberNo}>{member.memberName}T ({member.memberId})</option>
                            ))}
                        </select></dd>
                    </dl>
                    <dl>
                        <dt>담당자</dt>
                        <dd><select name='staff' defaultValue={course.staffCode} onChange={onChangeHandler}>
                            {memberlist && memberlist.map(member=>(
                                member.memberRole != 'TEACHER' &&
                                <option value={member.memberNo}>{member.memberName} ({member.memberId})</option>
                            ))}
                        </select></dd>
                    </dl>
                </div>
                <div className="notice">
                    <p className="courseTitle">안내사항</p>
                    <textarea className='courseNotice' name='cosNotice' defaultValue={course.cosNotice} onChange={onChangeHandler}></textarea>
                </div>
            </div>
            <div className='registBtnArea'>
                <button className='buttonD' onClick={onClickCourseUpdateHandler}>등록</button>
            </div>
        </>
    );
}

export default CourseModify;