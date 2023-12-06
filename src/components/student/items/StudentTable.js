import {useNavigate} from "react-router-dom";

function StudentTable({data}) {

    const navigate = useNavigate();

    const formatDate = (dateString) => {
        const options = {year: 'numeric', month: '2-digit', day: '2-digit'};
        return new Date(dateString).toLocaleDateString('ko-KR', options).replace(/\.\s?/g, '-').replace(/-$/, '');
    };

    const onClickStudentRecord = () => {
        navigate('/student-record');
    }
    const onClickStudentModify = (stdCode) => {
        navigate(`/student-modify/${stdCode}`);
    }

    return (

            <div>
                <div className="student-table-tr">
                <div className="student-th-no">NO.</div>
                <div className="student-th-name">원생 이름</div>
                <div className="student-th-birth">생년월일</div>
                <div className="student-th-cosName">코스명</div>
                <div className="student-th-teacher">강사</div>
                <div className="student-th-cosPeriod">코스 기간</div>
                <div className="student-th-phone">전화번호</div>
                <div className="student-th-registedDate">등록일</div>
                <div className="student-th-manage">관리</div>
                </div>
                {
                    data.map((student, index) => (

                            <div
                                className="student-item" key={student.stdCode || index}>
                                    <div className="student-th-no">{student.stdCode}</div>
                                    <div className="student-th-name">{student.stdName}</div>
                                    <div className="student-th-birth">{student.stdBirth}</div>
                                    {student.courseList.length > 0 ? (
                                    <div>
                                        <div className="student-th-cosName">{student.courseList[0].cosName}</div>
                                    </div>
                                    ) : (
                                    <div>
                                        <div className="student-th-cosName"></div>
                                    </div>
                                    )}
                                    {student.courseList.length > 0 ? (
                                    <div>
                                        <div className="student-th-teacher">{student.courseList[0].teacher}</div>
                                    </div>
                                    ) : (
                                    <div>
                                        <div className="student-th-teacher"></div>
                                    </div>
                                    )}
                                    {student.courseList.length > 0 ? (
                                    <div>
                                        <div className="student-th-cosPeriod">{student.courseList[0].cosSdt} ~ {student.courseList[0].cosEdt}</div>
                                    </div>
                                    ) : (
                                    <div>
                                        <div className="student-th-cosPeriod"></div>
                                    </div>
                                    )}

                                    <div className="student-th-phone">{student.stdPhone}</div>
                                    <div className="student-th-registedDate">{formatDate(student.createdAt)}</div>
                                    <div className="student-th-manage">
                                    <button className="record" onClick={ onClickStudentRecord }>수강 이력</button>
                                    <button className="student-modify" onClick={ () => onClickStudentModify(student.stdCode) }>수정</button>
                                    </div>
                        </div>
                    ))
                }
            </div>


    );
}

export default StudentTable;