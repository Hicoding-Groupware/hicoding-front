import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {
    callAttendanceRegistAPI,
    callAttendanceUpdateAPI,
    callMyCourseStudentListAPI
} from "../../../apis/AttendanceAPICalls";
import DatePicker from 'react-datepicker';
import 'react-toastify/dist/ReactToastify.css';
import {useNavigate} from "react-router-dom";
import styled from "styled-components";

const CustomDatePicker = styled(DatePicker)`
  border: none;
  outline: none; /* 선택 시 외곽선 제거 (선택 사항) */
  font-weight: bolder;
  font-size: 22px;
  cursor: pointer;
  caret-color: transparent;
  width: 133px;
  padding-left: 9%;
`;


function MyCourseStudentListItem({course, cosCode, students, cosSdt, cosEdt, dayStatus}) {

    const [status, setStatus] = useState({});
    const dispatch = useDispatch();

    const {postSuccess, putSuccess} = useSelector(state => state.attendanceReducer);
    const [selectedDate, setSelectedDate] = useState(new Date()); // 선택된 날짜 상태 추가
    const navigate = useNavigate();


    /* ============== 월별 출석부로 이동 ============= */
    const handleMonthAttendanceSelect = (cosCode) => {
        const cosName = course.cosName;
        navigate(`/attendance/month/${cosCode}`, {state: {cosCode, cosName, students, dayStatus, cosSdt, cosEdt}});
    }


    /* ============== 등록 & 수정 api ============== */

    /* 등록 성공시 == 완 */
    useEffect(() => {
        if (postSuccess === true) {
            alert("출석 상태 정보를 저장하였습니다.");
            window.location.replace(`/attendance/day/${cosCode}`);
        }
    }, [postSuccess]);


    /* 업데이트 성공시 == 완 */
    useEffect(() => {
        if (putSuccess === true) {
            alert("출석 상태 정보를 수정하였습니다.");
            window.location.replace(`/attendance/day/${cosCode}`);
        }
    }, [putSuccess]);


    /* 등록 api registRequest */
    const onClickAttendanceRegistrationHandler = () => {

        const attendanceList = students.map((student) => ({
            cosCode: student.cosCode,
            stdCode: student.stdCode,
            status: status[student.stdCode] || "attendance",
        }));
        dispatch(callAttendanceRegistAPI({registRequest: attendanceList}));
    };


    /* 수정 api updateRequest */
    const onClickAttendanceUpdateHandler = () => {
        const formattedDate = formatDate(selectedDate);
        const attendanceUpdateList = students.map((student) => ({
            atdCode: student.atdCode,
            atdDate: formattedDate,
            cosCode: student.cosCode,
            stdCode: student.stdCode,
            status: status[student.stdCode],
        }));
        dispatch(callAttendanceUpdateAPI({updateRequest: attendanceUpdateList, atdDate: formattedDate}));
    };


    /* ============== 셀렉트 박스 ============= */

    /* 셀렉트 박스 - 셀렉트 박스 클릭했을 때 stdCode, selectedValue 잘 나옴 */
    const handleSelectChange = (stdCode, selectedValue) => {
        setStatus(prev => {
            const updatedStatus = {...prev, [stdCode]: selectedValue};

            // 콘솔 로그로 상태 업데이트 확인
            console.log("Updated Status: ", updatedStatus);

            return updatedStatus;
        });
    };

    const SelectBox = (props) => {

        const handleChange = (e) => {
            const selectedValue = e.target.value;
            props.onChange(selectedValue);
        };

        return (
            <select onChange={handleChange} value={props.value || ''}>
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
                initialStatus[student.stdCode] = getDefaultStatus(student.result);
            });
            setStatus(initialStatus);
        }
    }, [students]);


    /* ============== 평일 & 주말 관리 =============  */

    // /* 주말 - 평일 여부 판별 함수 */
    const isWeekend = (date) => {
        const day = date.getDay();
        return day === 0 || day === 6;
    }

    /* 이전 날짜로 이동 */
    const handlePrevDayClick = (e) => {

        /* cosSdt 개강일까지만 이동 가능 */
        e.preventDefault();

        let prevDay = new Date(selectedDate);
        do {
            prevDay.setDate(prevDay.getDate() - 1);
            if (prevDay < new Date(cosSdt)) {
                return;
            }
        } while ((dayStatus === "WEEKDAY" && isWeekend(prevDay)) || (dayStatus === "WEEKEND" && !isWeekend(prevDay)));

        setSelectedDate(prevDay);
        const formattedDate = formatDate(prevDay);
        dispatch(callMyCourseStudentListAPI({cosCode, atdDate: formattedDate}));
    };


    /* 다음 날짜로 이동 */
    const handleNextDayClick = () => {
        let nextDay = new Date(selectedDate);
        const endDate = new Date(cosEdt);
        const today = new Date();

        nextDay.setHours(0, 0, 0, 0);
        endDate.setHours(0, 0, 0, 0);
        today.setHours(0, 0, 0, 0);

        nextDay.setDate(nextDay.getDate() + 1);

        // cosEdt 이후로 가지 않도록 검사
        if (nextDay > endDate) {
            return;
        }
        // 오늘 이후로 가지 않도록 검사

        if (nextDay > today) {
            return;
        }

        while ((dayStatus === "WEEKDAY" && isWeekend(nextDay)) || (dayStatus === "WEEKEND" && !isWeekend(nextDay))) {
            nextDay.setDate(nextDay.getDate() + 1); // 다음 날짜로 계속 이동

            if (nextDay > endDate || nextDay > today) {
                return;
            }
        }

        setSelectedDate(nextDay);

        const formattedDate = formatDate(nextDay);
        dispatch(callMyCourseStudentListAPI({cosCode, atdDate: formattedDate}));
    };


    /* ============== 데이트 피커 ============== */

    /* 데이트 피커로 날짜 지정시 해당 날짜 조회 */
    const handleDateChange = (date) => {
        setSelectedDate(date);
        const formattedDate = formatDate(date);
        dispatch(callMyCourseStudentListAPI({cosCode, atdDate: formattedDate}));
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


    /* ============== 저장하기 & 다시 저장하기 버튼 ============== */

    // status가 모두 null인지 체크하는 함수
    const isAllStatusNull = () => {
        return students && students.every(student => student.attendanceStatus === null);
    };

    const allStatusNull = isAllStatusNull();
    const buttonLabel = allStatusNull ? '저장하기' : '다시 저장하기';
    const buttonOnClick = allStatusNull ? onClickAttendanceRegistrationHandler : onClickAttendanceUpdateHandler;

    useEffect(() => {
        if (students) {
            const initialStatus = {};
            students.forEach(student => {
                initialStatus[student.stdCode] = student.attendanceStatus;
            });
            setStatus(initialStatus);
        }
    }, [students]);


    return (
        <>
            {
                students
                &&
                (
                    <>
                        <div className="daily-attendance-main-container">
                            <div className="daily-attendance-header">
                                <div className="daily-attendance-title">
                                    <h2>{students[0]?.cosName}</h2>
                                </div>
                                <div className="date-picker-container">
                                    <span className="left-button" onClick={handlePrevDayClick}>◀</span>
                                    <CustomDatePicker
                                        dateFormat='yyyy-MM-dd'
                                        name="selectedDate"
                                        selected={selectedDate}
                                        onChange={(date) => handleDateChange(date)}
                                        filterDate={isSelectableDate}
                                        minDate={new Date(cosSdt)}
                                        maxDate={new Date()}
                                    />
                                    <span className="right-button" onClick={handleNextDayClick}>▶</span>
                                </div>
                                <div className="buttons-container">
                                    <button className="month-attend-select-button"
                                            onClick={() => handleMonthAttendanceSelect(cosCode, students, dayStatus, cosSdt, cosEdt)}>월별
                                        출석부 조회
                                    </button>
                                    <button className="attend-regist-button"
                                            onClick={buttonOnClick}>{buttonLabel}</button>
                                </div>
                            </div>

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
                                                        {value: "attendance", name: "출석"},
                                                        {value: "absence", name: "결석"},
                                                        {value: "tardiness", name: "지각"},
                                                        ...(student.attendanceStatus !== null ? [{
                                                            value: "leave_early",
                                                            name: "조퇴"
                                                        }] : []),
                                                    ]}
                                                    value={status[student.stdCode]}
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