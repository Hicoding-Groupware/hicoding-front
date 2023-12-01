import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {callStudentListAPI} from "../../apis/StudentAPICalls";
import StudentTable from "../../components/student/items/StudentTable";
import StudentPagingBar from "../../components/student/pagingBar/StudentPagingBar";


function Student() {

    const dispatch = useDispatch();
    const [currentPage, setCurrentPage] = useState(1);
    const [sort, setSort] = useState('desc');
    const [search, setSearch] = useState('');
    const {students} = useSelector(state => state.studentReducer);

    const onSortChangeHandler = e => {
        setSort(e.target.value);
    }

    const onSearchChangeHandler = e => {
        setSearch(e.target.value);
    }
    const onEnterKeyHandler = e => {
        if (e.key === 'Enter') {

        }
    }

    useEffect(() => {
        dispatch(callStudentListAPI({currentPage, sort}));
    }, [currentPage, sort]);

    return (
        <>

            <div className="student-title">원생 조회</div>
            <div className="student-th-condition">
            <div>
            <select className="student-select" onChange={onSortChangeHandler}>등록순
                <option className="student-select-item" value="desc">최근 등록순</option>
                <option className="student-select-item" value="asc">오래된 등록순</option>
            </select>
            </div>
            <div>
                <input className="student-createdAt" type="date"/> ~ <input className="student-createdAt" type="date"/>
            </div>
            <div>
            <select className="student-select">검색 종류
                <option className="student-select-item">이름</option>
                <option className="student-select-item">강의명</option>
            </select>
            </div>
            <div>
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
        </>
    );
}

export default Student;