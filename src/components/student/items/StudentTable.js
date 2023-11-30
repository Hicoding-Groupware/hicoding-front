function StudentTable({data}) {

    const formatDate = (dateString) => {
        const options = {year: 'numeric', month: '2-digit', day: '2-digit'};
        return new Date(dateString).toLocaleDateString('ko-KR', options).replace(/\.\s?/g, '-').replace(/-$/, '');
    };

    return (

            <div>
                {
                    data.map(student => (

                            <div
                            className="student-item"
                            key={student.stdCode}>
                                <div>No
                                    <div>{student.stdCode}</div>
                                </div>
                                <div>이름
                                    <div>{student.stdName}</div>
                                </div>
                                <div>과정명
                                    {student.courseList.map((course, index) => {
                                        if (index === 0)
                                            return (
                                                <div key={student.stdCode}>
                                                    <div>{course.cosName}</div>
                                                </div>
                                            );

                                    })}
                                </div>
                                <div>기간
                                    {student.courseList.map((course, index) => {
                                        if (index === 0)
                                            return (
                                                <div key={student.stdCode}>
                                                    <div>{course.cosSdt} ~ {course.cosEdt}</div>
                                                </div>
                                            );

                                    })}
                                </div>
                                <div>전화 번호
                                    <div>{student.stdPhone}</div>
                                </div>
                                <div>등록일
                                    <div>{formatDate(student.createdAt)}</div>
                                </div>


                        </div>
                    ))
                }
            </div>


    );
}

export default StudentTable;