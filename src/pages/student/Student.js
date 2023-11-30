import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {callStudentListAPI} from "../../apis/StudentAPICalls";
import StudentTable from "../../components/student/items/StudentTable";

function Student () {

    const dispatch = useDispatch();
    const [currentPage, setCurrentPage] = useState(1);
    const { students } = useSelector(state => state.studentReducer);

    useEffect(() => {
        dispatch(callStudentListAPI({currentPage}));
    }, [currentPage]);

    return (
        <>
            {
                students &&
                <div className="student-table">
                    <StudentTable data={students.data}/>
                </div>
            }
        </>
    );
}

export default Student;