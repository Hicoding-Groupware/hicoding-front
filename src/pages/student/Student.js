import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {callStudentDateListAPI, callStudentListAPI} from "../../apis/StudentAPICalls";
import StudentTable from "../../components/student/items/StudentTable";
import StudentPagingBar from "../../components/student/pagingBar/StudentPagingBar";
import StudentDateTable from "../../components/student/items/StudentDateTable";


function Student() {

    const dispatch = useDispatch();
    const [currentPage, setCurrentPage] = useState(1);
    const [sort, setSort] = useState('desc');
    const [search, setSearch] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const {students, studentsDate} = useSelector(state => state.studentReducer);

    const onSortChangeHandler = e => {
        setSort(e.target.value);
    }

    const onSearchChangeHandler = e => {
        setSearch(e.target.value);
    }

    const onStartDateChangeHandler = e => {
        console.log(e.target.value);
        setStartDate(e.target.value);
    }

    const onEndDateChangeHandler = e => {
        console.log(e.target.value);
        setEndDate(e.target.value);
    }

    const onEnterKeyHandler = e => {
        if (e.key === 'Enter') {

        }
    }

    useEffect(() => {
        dispatch(callStudentListAPI({currentPage, sort}));
    }, [currentPage, sort]);

    useEffect(() => {
        dispatch(callStudentDateListAPI({startDate, endDate}));
    }, [startDate, endDate]);

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
                onKeyUp={onEnterKeyHandler}
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
            {
                studentsDate &&
                <div className="student-table">
                    <StudentDateTable data={studentsDate.data}/>
                    <StudentPagingBar pageInfo={studentsDate.pageInfo} setCurrentPage={setCurrentPage}/>
                </div>
            }
        </>
    );
}

export default Student;