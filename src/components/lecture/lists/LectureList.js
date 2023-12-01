import LectureListItem from "../items/LectureListItem";

function LectureList({data}){
    return(
        <table className="lecture-table">
            <thead>
                <tr>
                    <th>강의명</th>
                    <th>교재</th>
                    <th>기술스택</th>
                </tr>
            </thead>
            <tbody>
            {data.map(lecture => (
                <tr key={lecture.lecCode}>
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