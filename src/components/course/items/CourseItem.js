import {useNavigate, useParams} from "react-router-dom";
import {useDispatch} from "react-redux";
import {callCourseRemoveAPI} from "../../../apis/CourseAPICalls";
import {isAdmin} from "../../../utils/TokenUtils";

function CourseItem({course}){

    const {cosCode} = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const todayParsing = new Date();
    const year = todayParsing.getFullYear();
    const month = ('0' + (todayParsing.getMonth() + 1)).slice(-2);
    const day = ('0' + todayParsing.getDate()).slice(-2);
    const today = year + '-' + month  + '-' + day;
    const onClickCourseHandler = (cosCode) => {
        navigate(`/course-modify/${cosCode}`)
    }
    const onClickCourseDeleteHandler = () => {
        if(!window.confirm('해당 과정을 삭제하시겠습니까?')){
            alert('취소되었습니다.')
            return false;
        }else {
            dispatch(callCourseRemoveAPI({cosCode}))
        }
    }

    console.log({cosCode})


    return(
        <>

            {isAdmin()&&
                <div className="btnArea">
                    <div>
                        <button className='buttonD' onClick={()=> navigate(-1)}>목록</button>
                        <button className='buttonD' onClick={()=>onClickCourseHandler(course.cosCode)}>수정</button>
                        <button className='buttonD' onClick={onClickCourseDeleteHandler}>삭제</button>
                        <p>최근수정일: {course.modifiedAt.replace('T',' ')}</p>
                    </div>
                </div>
            }
            <div className="courseDetailWrap">
                <div className="titleBox">
                    <p className="courseTitle">{course.cosName}
                        <span className="statusTag"
                              style={course.curCnt < course.capacity || course.cosEdt >= today && course.cosSdt <= today ?
                                  {background: '#6260F4'} : {background: '#666666'} }>
                               {course.cosEdt >= today && course.cosSdt <= today ? '진행중' : course.curCnt == course.capacity ? '모집마감 ': '모집중'}
                           </span>
                    </p>
                </div>
                <div className="courseInfo">
                    <dl>
                        <dt>기간</dt>
                        <dd>{course.cosSdt}~{course.cosEdt}</dd>
                    </dl>
                    <dl>
                        <dt>요일</dt>
                        <dd>{course.dayStatus == 'WEEKDAY' ? '월,화,수,목,금' : '토,일' }</dd>
                    </dl>
                    <dl>
                        <dt>시간</dt>
                        <dd>{course.timeStatus == 'MORNING' ? '09~13시' : course.timeStatus == 'AFTERNOON' ? '14~18시' : '09~18시' }</dd>
                    </dl>
                    <dl>
                        <dt>강의실</dt>
                        <dd>{course.roomName}</dd>
                    </dl>
                    <dl>
                        <dt>수강생</dt>
                        <dd>{course.curCnt}/{course.capacity}</dd>
                    </dl>
                    <dl>
                        <dt>강사</dt>
                        <dd>{course.teacherName}</dd>
                    </dl>
                    <dl>
                        <dt>기술스택</dt>
                        <dd>{course.techStack}</dd>
                    </dl>
                    <dl>
                        <dt>교재</dt>
                        <dd>{course.textbook}</dd>
                    </dl>
                    <dl>
                        <dt>담당자</dt>
                        <dd>{course.staffName}</dd>
                    </dl>
                    <dl>
                        <dt>담당자 전화번호</dt>
                        <dd>{course.staffPhone}</dd>
                    </dl>
                    <dl>
                        <dt>담당자 이메일</dt>
                        <dd>{course.staffEmail}</dd>
                    </dl>
                </div>
                <div className="notice">
                    <p className="courseTitle">안내사항</p>
                    <p>{course.cosNotice}</p>
                </div>
            </div>
        </>
    );
}

export default CourseItem;