import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {callStudentListAPI} from "../../apis/StudentAPICalls";
import StudentTable from "../../components/student/items/StudentTable";
import StudentPagingBar from "../../components/student/pagingBar/StudentPagingBar";



function Student() {

    const dispatch = useDispatch();
    const [currentPage, setCurrentPage] = useState(1);
    const [sort, setSort] = useState('desc');
    const [stdName, setStdName] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const {students} = useSelector(state => state.studentReducer);

    const onSortChangeHandler = e => {
        setSort(e.target.value);
    }

    const onSearchChangeHandler = e => {
        console.log(e.target.value);
        setStdName(e.target.value);
    }

    const onStartDateChangeHandler = e => {
        console.log(e.target.value);
        setStartDate(e.target.value);
    }

    const onEndDateChangeHandler = e => {
        console.log(e.target.value);
        setEndDate(e.target.value);
    }


    useEffect(() => {
        dispatch(callStudentListAPI({sort, stdName, startDate, endDate}));
    }, [sort, stdName, startDate, endDate]);


    return (
        <>

            <div className="student-title">원생 조회</div>
            <div className="student-th-condition">
            <div>
            <select className="student-select" onChange={ onSortChangeHandler }>등록순
                <option className="student-select-item" value="desc">최근 등록순</option>
                <option className="student-select-item" value="asc">오래된 등록순</option>
            </select>
            </div>
            <div className="student-createdAt">
                <input type="date" onChange={ onStartDateChangeHandler }/> ~ <input type="date" onChange={ onEndDateChangeHandler } />
            </div>
            <div className="student-stdName">
            <input
                type="text"
                placeholder="검색어를 입력하세요"
                onChange={onSearchChangeHandler}

            />
            </div>
            </div>
            {
                students &&
                <div className="student-table">
                    <StudentTable data={students.data}/>
                    <StudentPagingBar pageInfo={students.pageInfo} setCurrentPage={setCurrentPage}/>
                </div>
            }
        </>
    );
}

export default Student;