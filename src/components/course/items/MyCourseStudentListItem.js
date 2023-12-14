import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {callAttendanceRegistAPI, callMyCourseStudentListAPI} from "../../../apis/AttendanceAPICalls";
import {ToastContainer} from "react-toastify";
import {useNavigate} from "react-router-dom";
import DatePicker from 'react-datepicker';

function MyCourseStudentListItem({cosCode, students}) {

    const [buttonText, setButtonText] = useState("저장하기");
    const [status, setStatus] = useState([]);
    const dispatch = useDispatch();

    const {postSuccess} = useSelector(state => state.attendanceReducer);
    const navigate = useNavigate();


    /* 등록 성공시 */
    useEffect(() => {
        if (postSuccess === true) {
            navigate(`/day/${cosCode}`);
        }
    }, [postSuccess]);


    /* 배열에 데이터 담기 */
    const onClickAttendanceRegistrationHandler = () => {

        const attendanceList = students.map((student) => ({
            cosCode: student.cosCode,
            stdCode: student.stdCode,
            status: status[student.stdCode] || "attendance",
        }));

        dispatch(callAttendanceRegistAPI({registRequest: attendanceList}));
    };

    /* 셀렉트 박스 옵션 */
    const OPTIONS = [
        {value: "attendance", name: "출석"},
        {value: "absence", name: "결석"},
        {value: "tardiness", name: "지각"},
        {value: "leave_early", name: "조퇴"},
    ];

    /* 셀렉트 박스 */
    const handleSelectChange = (stdCode, selectedValue) => {
        setStatus((prev) => ({
            ...prev,
            [stdCode]: selectedValue,
        }));
    };

    /* 셀렉트 박스 */
    const SelectBox = (props) => {
        const handleChange = (e) => {
            const selectedValue = e.target.value;
            props.onChange(selectedValue);
        };

        return (
            <select onChange={handleChange} value={props.value}>
                {props.options.map((option) => (
                    <option
                        key={option.value}
                        value={option.value}
                    >
                        {option.name}
                    </option>
                ))}
            </select>
        );
    };


    const [selectedDate, setSelectedDate] = useState(new Date()); // 선택된 날짜 상태 추가


    /* 이전 날짜로 이동 */
    const handlePrevDayClick = () => {
        const prevDay = new Date(selectedDate);
        prevDay.setDate(prevDay.getDate() - 1);
        setSelectedDate(prevDay);
        console.log("prevDay : ", prevDay);

        const formattedDate = formatDate(prevDay); // 날짜 포맷팅 함수 사용
        dispatch(callMyCourseStudentListAPI({cosCode, atdDate : formattedDate}));
    };

    /* 다음 날짜로 이동 */
    const handleNextDayClick = () => {
        const nextDay = new Date(selectedDate);
        nextDay.setDate(nextDay.getDate() + 1);
        setSelectedDate(nextDay);
        console.log("nextDay : ", nextDay);

        const formattedDate = formatDate(nextDay);
        dispatch(callMyCourseStudentListAPI({cosCode, atdDate : formattedDate}));
    };

    /* 날짜 포맷팅 함수 */
    const formatDate = (date) => {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    };

    return (
        <>
            <ToastContainer hideProgressBar={true} position="top-center"/>
            {
                students
                &&
                (
                    <>
                        <div className="daily-attendance-main-container">
                            <h2>{students[0]?.cosName}</h2>
                            <span
                                className="left-button"
                                onClick={handlePrevDayClick}
                            > ◀
                            </span>
                            <DatePicker
                                calssName="attendDatePicker"
                                dateFormat='yyyy-MM-dd'
                                name="selectedDate"
                                selected={selectedDate}
                                onChange={(date) => setSelectedDate(date)}
                            />
                            <span className="right-button"
                                  onClick={handleNextDayClick}
                            > ▶
                            </span>
                            <button className="month-attend-select-button">
                                월별 출석부 조회
                            </button>
                            <button
                                className="attend-regist-button"
                                onClick={onClickAttendanceRegistrationHandler}
                            >
                                {buttonText}
                            </button>
                            <div className="daily-attendance-container">
                                <table className="daily-attendance-table">
                                    <thead>
                                    <tr>
                                        <th>NO</th>
                                        <th>원생 이름</th>
                                        <th>생년월일</th>
                                        <th>연락처</th>
                                        <th>출석상태</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {students.map((student, index) => (
                                        <tr key={student.stdCode || index}>
                                            <td>{student.stdCode}</td>
                                            <td>{student.stdName}</td>
                                            <td>{student.stdBirth}</td>
                                            <td>{student.stdPhone}</td>
                                            <td>
                                                <SelectBox
                                                    options={OPTIONS}
                                                    value={status[student.stdCode] || "attendance"}
                                                    onChange={(status) => handleSelectChange(student.stdCode, status)}
                                                    className="attend-button"
                                                />
                                            </td>
                                        </tr>
                                    ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </>
                )}
        </>
    );
}

export default MyCourseStudentListItem;
