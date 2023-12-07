function CourseItem({course}){

    return(
        <>
            <div className="titleBox">
                <p className="courseTitle">{course.cosName}
                    <span className="statusTag" style={course.curCnt == course.capacity ? {background: '#666666'} : {background: '#6260F4'}}>
                        {course.curCnt == course.capacity ? '모집마감' : '모집중'}
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
                    <dd>{course.roomCode}</dd>
                </dl>
                <dl>
                    <dt>수강생</dt>
                    <dd>{course.curCnt}/{course.capacity}</dd>
                </dl>
                <dl>
                    <dt>강사</dt>
                    <dd>{course.teacher}</dd>
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
                    <dd>{course.staff}</dd>
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
            </div>
        </>
    );
}

export default CourseItem;