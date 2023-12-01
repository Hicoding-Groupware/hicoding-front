import {useNavigate} from "react-router-dom";

function CourseList({data}){
    console.log(data);
    return(

        <div className="courseListWrap">
            <ul className="courseList">
                {data.map(course => (
               <li key={course.cosCode}>
                   <div className="content">
                       <p className="courseTitle">
                           {course.cosName}
                           <span className="statusTag"
                                 style={course.curCnt == course.capacity ? {background: '#666666'} : {background: '#6260F4'}}>
                               {course.curCnt == course.capacity ? '모집마감' : '모집중'}
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

                       </div>
                   </div>
               </li>
                ))}
            </ul>
        </div>
    );
}

export default CourseList;