
function LectureList({data,course}){



    return(
        <table className="lecture-table">
            <thead>
                <tr>
                    <td>강의명</td>
                    <td>교재</td>
                    <td>기술스택</td>
                </tr>
            </thead>
            <tbody>
            {data.map(lecture => (
                <tr key={lecture.lecCode}
                    style={lecture.lecCode === course ? {background : '#3a74d614'} : null}
                >
                    <td>{lecture.lecName}</td>
                    <td>{lecture.textbook}</td>
                    <td>{lecture.techStack}</td>
                </tr>
            ))}
            </tbody>
        </table>
    );
}

export default LectureList;