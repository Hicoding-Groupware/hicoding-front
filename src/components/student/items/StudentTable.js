import {useNavigate} from "react-router-dom";
import React, {useEffect, useState} from "react";
import Modal from "react-modal";
import {useDispatch, useSelector} from "react-redux";
import {callRecordModifyAPI, callStudentCourseAPI} from "../../../apis/StudentAPICalls";
import CourseTable from "./CourseTable";
import ModalPagingBar from "../pagingBar/ModalPagingBar";
import courseList from "../../course/lists/CourseList";
import {toast} from "react-toastify";


function StudentTable({data}) {

    const navigate = useNavigate();
    const [isOpen, setIsOpen] = useState(false);
    const [stdCode, setStdCode] = useState(0);
    const [cosName, setCosName] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const dispatch = useDispatch();
    const {studentCourse} = useSelector(state => state.studentReducer);
    const [currentCourseList, setCurrentCourseList] = useState([]);
    const [pastCourseList, setPastCourseList] = useState([]);
    const [cosList, setCosList] = useState([]);


    useEffect(() => {
        dispatch(callStudentCourseAPI({currentPage, cosName}));
    }, [currentPage, cosName]);

    const formatDate = (dateString) => {
        const options = {year: 'numeric', month: '2-digit', day: '2-digit'};
        return new Date(dateString).toLocaleDateString('ko-KR', options).replace(/\.\s?/g, '-').replace(/-$/, '');
    };

    const onClickStudentRecord = (courseList, stdCode) => {
        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
        setIsOpen(!isOpen);
        setStdCode(stdCode);
        setCosList(courseList);
        setCurrentCourseList(courseList.filter(course => new Date(course.cosEdt) > yesterday && course.status === 'normal'));
        setPastCourseList(courseList.filter(course => new Date(course.cosEdt) < yesterday || course.status === 'withdraw'));
    }
    const onClickStudentModify = (stdCode) => {
        navigate(`/student-modify/${stdCode}`);
    }

    const customStyles = {
        overlay: {
            backgroundColor: "rgba(0,0,0,0.5)",
        },
        content: {
            left: "0",
            margin: "auto",
            width: "887px",
            height: "713px",
            padding: "0",
            overflow: "hidden",
        },
    };

    const onRequestCloseHandler = () => {
        setIsOpen(false);
        setCosName(null);
    };

    const onEnterKeyHandler = e => {
        if (e.key === 'Enter') {

            const search = e.target.value.trim();

            if (search !== '') {
                setCosName(search);
            }
        }
    }

    const onClickWithDraw = (recCode) => {
        if(window.confirm("한번 철회하면 번복불가합니다. 정말 수강철회 하시겠습니까?")){
            dispatch(callRecordModifyAPI({recCode}));
            setIsOpen(true);
        } else {
            alert("취소하셨습니다.")
        }

    }
    /* const completeHandler = data => {

         setIsOpen(false);
     }*/

    return (

        <div>
            <Modal
                isOpen={isOpen}
                ariaHideApp={false}
                style={customStyles}
                onRequestClose={onRequestCloseHandler}
            >
                <div className="currentCourseList">
                    <div className="currentCourseList-item">수강중인 강의</div>
                    <div>수강 상태</div>
                </div>
                <div className="record-status">
                    {currentCourseList.map((course, index) => (

                        <div key={index} className="record-status-normal">
                            <div className="record-cosName">{course.cosName}</div>
                            <div className="record-teacher">{course.teacher}</div>
                            <div className="record-cosPeriod"> {course.cosSdt} ~ {course.cosEdt}</div>
                            <div className="record-manage">{course.status.replace("normal", "정상")}
                                <button className="record" onClick={() => onClickWithDraw(course.recCode)}>수강철회</button>
                            </div>
                        </div>
                    ))}
                </div>

                <div>수강 내역</div>
                <div className="record-status">
                    {pastCourseList.map((course, index) => (
                        <div key={index} className="record-status-normal">
                            <div className="record-cosName">{course.cosName}</div>
                            <div className="record-teacher">{course.teacher}</div>
                            <div className="record-cosPeriod">{course.cosSdt} ~ {course.cosEdt}</div>
                            <div className="record-manage">{course.status.replace("normal", "수료").replace("withdraw", "수강철회")}</div>
                        </div>
                    ))}
                </div>

                <div className="cosName">
                    <input
                        type="text"
                        placeholder="검색어를 입력하세요"
                        onKeyUp={onEnterKeyHandler}
                    />
                </div>
                {studentCourse &&
                    <div>
                        <CourseTable data={studentCourse.data} stdCode={stdCode} cosList={cosList}/>
                        <ModalPagingBar pageInfo={studentCourse.pageInfo} setCurrentPage={setCurrentPage}/>
                    </div>
                }

            </Modal>
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
                                <div
                                    className="student-th-cosPeriod">{student.courseList[0].cosSdt} ~ {student.courseList[0].cosEdt}</div>
                            </div>
                        ) : (
                            <div>
                                <div className="student-th-cosPeriod"></div>
                            </div>
                        )}

                        <div className="student-th-phone">{student.stdPhone}</div>
                        <div className="student-th-registedDate">{formatDate(student.createdAt)}</div>
                        <div className="student-th-manage">
                            <button className="record"
                                    onClick={() => onClickStudentRecord(student.courseList, student.stdCode)}>수강 이력
                            </button>
                            <button className="student-modify"
                                    onClick={() => onClickStudentModify(student.stdCode)}>수정
                            </button>
                        </div>
                    </div>
                ))
            }
        </div>


    );
}

export default StudentTable;