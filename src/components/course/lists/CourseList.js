import {useNavigate} from "react-router-dom";
import {isAdmin} from "../../../utils/TokenUtils";
import {useState} from "react";

function CourseList({data}){

    const navigate = useNavigate();
    const onClickCourseHandler = (cosCode) => {
        navigate(`/courses/${cosCode}`)
    }

    const todayParsing = new Date();
    const year = todayParsing.getFullYear();
    const month = ('0' + (todayParsing.getMonth() + 1)).slice(-2);
    const day = ('0' + todayParsing.getDate()).slice(-2);
    const today = year + '-' + month  + '-' + day;

    console.log({data})


    return(
        <>
            <div className="courseListWrap">
                <ul className="courseList">
                    {data.map(course => (
                        <li key={course.cosCode}>
                            <div className="content">
                                <p
                                    onClick={()=>onClickCourseHandler(course.cosCode)}>
                                    <span className="courseTitle">{course.cosName}</span>
                                    <span className="statusTag"
                                          style={course.curCnt < course.capacity || course.cosEdt >= today && course.cosSdt <= today ?
                                              {background: '#6260F4'} : {background: '#666666'} }>
                               {course.cosEdt >= today && course.cosSdt <= today ? '진행중' : course.curCnt == course.capacity ? '모집마감 ': '모집중'}
                           </span>
                                </p>
                                <div className="courseInfo">
                                    <dl>
                                        <dt>기간</dt>
                                        <dd>{course.cosSdt}~{course.cosEdt}</dd>
                                    </dl>
                                    <dl>
                                        <dt>담당강사</dt>
                                        <dd>{course.teacher}</dd>
                                    </dl>
                                    <dl>
                                        <dt>강의실</dt>
                                        <dd>{course.roomCode}</dd>
                                    </dl>
                                    <dl>
                                        <dt>담당자</dt>
                                        <dd>{course.staff}</dd>
                                    </dl>
                                    <dl>
                                        <dt>강의</dt>
                                        <dd>{course.lecCode}</dd>
                                    </dl>
                                    <dl>
                                        <dt>수강생</dt>
                                        <dd>{course.curCnt}/{course.capacity}</dd>
                                    </dl>
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </>
    );
}

export default CourseList;