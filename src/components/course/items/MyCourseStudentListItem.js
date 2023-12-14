import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {callAttendanceRegistAPI, callMyCourseStudentListAPI} from "../../../apis/AttendanceAPICalls";
import {ToastContainer} from "react-toastify";
import {useNavigate} from "react-router-dom";
import DatePicker from 'react-datepicker';


function MyCourseStudentListItem({cosCode, students, cosSdt, dayStatus, attendanceStatus}) {

    const [status, setStatus] = useState({});
    const dispatch = useDispatch();

    const {postSuccess} = useSelector(state => state.attendanceReducer);
    const navigate = useNavigate();
    const [selectedDate, setSelectedDate] = useState(new Date()); // 선택된 날짜 상태 추가



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


    /* 셀렉트 박스 - 셀렉트 박스 클릭했을 때 stdCode, selectedValue 잘 나옴 */
    const handleSelectChange = (stdCode, selectedValue) => {
        setStatus((prev) => ({
            ...prev,
            [stdCode]: selectedValue,
        }));
    };

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
    }


    const getDefaultStatus = (result) => {
        switch (result) {
            case "결석" :
                return "absence";
            case "지각" :
                return "tardiness";
            case "조퇴" :
                return "leave_early";
            default :
                return "attendance";
        }
    };


    // MyCourseStudentListItem 컴포넌트가 마운트되거나 students 배열이 변경될 때 status 초기값 설정
    useEffect(() => {
        if (students) {
            const initialStatus = {};
            students.forEach(student => {
                initialStatus[student.stdCode] = student.attendanceStatus || getDefaultStatus(student.result);
            });
            setStatus(initialStatus);
        }
    }, [students]);



    /* 이전 날짜로 이동 */
    const handlePrevDayClick = (e) => {

        e.preventDefault();

        const prevDay = new Date(selectedDate);
        prevDay.setDate(prevDay.getDate() - 1);

        // 이전 날짜가 cosSdt보다 크거나 같은 경우에만 이동 가능
        if (prevDay >= new Date(cosSdt) || prevDay.getDate() === new Date(cosSdt).getDate()) {
            setSelectedDate(prevDay);
            const formattedDate = formatDate(prevDay); // 날짜 포맷팅 함수 사용
            dispatch(callMyCourseStudentListAPI({cosCode, atdDate : formattedDate}));
        }
    };

    /* 다음 날짜로 이동 */
    const handleNextDayClick = () => {
        const nextDay = new Date(selectedDate);
        nextDay.setDate(nextDay.getDate() + 1);

        if (nextDay <= new Date()) {
            setSelectedDate(nextDay);
            const formattedDate = formatDate(nextDay);
            dispatch(callMyCourseStudentListAPI({cosCode, atdDate : formattedDate}));
        }
    };

    /* 데이트 피커로 날짜 지정시 해당 날짜 조회 */
    const handleDateChange = (date) => {
        setSelectedDate(date);
        const formattedDate = formatDate(date);
        dispatch(callMyCourseStudentListAPI({ cosCode, atdDate : formattedDate}));
    }

    /* 데이트 피커로 WEEKDAY, WEEKEND 구분해서 선택 막기 */
    const isSelectableDate = (date) => {
        const day = date.getDay(); // 0 일요일 ... 6 토요일

        // course의 dayStatus가 WEEKDAY면 주말은 선택하지 못하게, WEEKEND면 평일 선택하지 못하게 하기
        if (dayStatus === "WEEKDAY") {
            return day !== 0 && day !== 6;
        } else if (dayStatus === "WEEKEND") {
            return day !== 1 && day !== 2 && day !== 3 && day !== 4 && day !== 5;
        }

      return true;
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
            {/* toast 쓸건가욤? */}
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
                                onChange={(date) => handleDateChange(date)}
                                filterDate={isSelectableDate}
                                minDate={new Date(cosSdt)}
                                maxDate={new Date()}
                             // maxDate는 오늘날짜까지만 보이도록 하기
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
                                {status === null ? '저장하기' : '다시 저장하기'}
                                {/*다시 고민해보기 */}
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
                                                    options={[
                                                        { value : "attendance", name : "출석"},
                                                        { value : "absence", name : "결석"},
                                                        { value : "tardiness", name : "지각"}
                                                    ]}
                                                    // options={statusOptions.map(status => ({ value: status, name: status }))}
                                                    // value={status[student.stdCode] || (student.attendanceStatus || getDefaultStatus(student.result))}
                                                    value = {status[student.stdCode] || "attendance"}
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