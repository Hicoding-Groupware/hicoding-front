import {useEffect, useState} from "react";
import {useLocation} from "react-router-dom";
import DatePicker from "react-datepicker";
import styled from "styled-components";
import {useDispatch} from "react-redux";
import {callMyCourseStudentMonthListAPI} from "../../../apis/AttendanceAPICalls";

const CustomDatePicker = styled(DatePicker)`
  border: none;
  outline: none; /* 선택 시 외곽선 제거 (선택 사항) */
  font-weight: bolder;
  font-size: 30px;
  cursor: pointer;
  caret-color: transparent;
  width: 133px;
  margin-left: 8%;
`;

function MyCourseStudentListMonthItem({title, monthStudents, dayStatus, cosCode, cosSdt, cosEdt}) {

    const location = useLocation();
    const [calendarHeaders, setCalendarHeaders] = useState([]);
    const [currentMonth, setCurrentMonth] = useState(new Date().getMonth() + 1);
    const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
    const {students} = location.state || {students: []};
    const [selectedDate, setSelectedDate] = useState(new Date());
    const dispatch = useDispatch();



    useEffect(() => {
        setCalendarHeaders(generateCalendarHeader(currentYear, currentMonth))
    }, [currentYear, currentMonth]);


    function generateCalendarHeader(year, month) {
        const lastDayOfMonth = new Date(year, month, 0).getDate();
        const headers = [<th>No</th>, <th>원생명</th>]

        for (let day = 1; day <= lastDayOfMonth; day++) {
            headers.push(<th key={day}>{day}</th>);
        }
        headers.push(<th key="attendance">출석</th>);
        headers.push(<th key="absence">결석</th>);
        headers.push(<th key="tardiness">지각</th>);
        headers.push(<th key="leave_early">조퇴</th>);

        headers.push(<th key="attendanceRate">출석률</th>);

        return headers;
    }


    /* 데이트 피커 */
    const handleMonthChange = (newDate) => {
        setSelectedDate(newDate);
        fetchMonthData(newDate);
    };

    const handlePrevMonth = () => {
        let newYear = currentYear;
        let newMonth = currentMonth - 1;

        if (newMonth < 1) {
            newYear--;
            newMonth = 12;
        }

        const newDate = new Date(newYear, newMonth - 1, 1);
        if (newDate >= new Date(cosSdt)) {
            handleMonthChange(newDate);
            setCurrentMonth(newMonth);
            setCurrentYear(newYear);
        }
    };

    const handleNextMonth = () => {
        let newYear = currentYear;
        let newMonth = currentMonth + 1;

        if (newMonth > 12) {
            newYear++;
            newMonth = 1;
        }

        const newDate = new Date(newYear, newMonth - 1, 1);
        handleMonthChange(newDate);
        setCurrentMonth(newMonth);
        setCurrentYear(newYear);
    };

    const fetchMonthData = (date) => {
        try {
            const formattedDate = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-01`; // 날짜를 매달 1일로 설정
            console.log('Dispatching action:', callMyCourseStudentMonthListAPI({cosCode, atdDate: formattedDate}));
            dispatch(callMyCourseStudentMonthListAPI({cosCode, atdDate: formattedDate}));
            console.log('Action dispatched');
        } catch (error) {
            console.log('Error in fetchMonthData : ', error);
        }
    };

    console.log('Selected Date:', selectedDate);
    console.log('Current Month:', currentMonth);
    console.log('Current Year:', currentYear);

    useEffect(() => {
        console.log('Fetching data for:', selectedDate);
        fetchMonthData(selectedDate);
    }, [selectedDate, cosCode]);


    /* 출석률 계산 */
    function calculateAttendance(stdCode, monthStudents) {
        const attendanceCounts = {
            attendance: 0,
            absence: 0,
            tardiness: 0,
            leave_early: 0,
        };

        monthStudents.forEach(record => {
            if (record.stdCode === stdCode) {
                switch (record.attendanceStatus) {
                    case 'attendance' :
                        attendanceCounts.attendance++;
                        break;
                    case 'absence' :
                        attendanceCounts.absence++;
                        break;
                    case 'tardiness' :
                        attendanceCounts.tardiness++;
                        break;
                    case 'leave_early' :
                        attendanceCounts.leave_early++;
                        break;
                    default:
                        break;
                }
            }
        });

        // 지각 조퇴 = 3번 = 결석
        const combinedLateEarly = attendanceCounts.tardiness + attendanceCounts.leave_early;
        attendanceCounts.absence += Math.floor(combinedLateEarly / 3);
        attendanceCounts.tardiness %= 3;
        attendanceCounts.leave_early %= 3;

        return attendanceCounts;
    }

    function calculateWorkingDays(cosSdt, cosEdt, dayStatus) {
        let count = 0;
        let date = new Date(cosSdt);
        let endDate = new Date(cosEdt);

        while (date <= endDate) {
            if((dayStatus === 'WEEKDAY' && isWeekday(date)) || (dayStatus === 'WEEKEND' && isWeekend(date))) {
                count++;
            }
            date.setDate(date.getDate() + 1);
        }

        return count;
    }

    function calculateAttendanceRate(attendanceCounts, cosSdt, cosEdt, dayStatus) {
        const totalDays = calculateWorkingDays(cosSdt, cosEdt, dayStatus);

        if (totalDays === 0) {
            return '0.00';
        }

        const presentDays = attendanceCounts.attendance;
        const attendanceRate = (presentDays / totalDays) * 100;
        return attendanceRate.toFixed(2);
    }


    /* 평일 여부 판별 함수 */
    const isWeekday = (date) => {
        const day = date.getDay();
        return day >= 1 && day <= 5;
    }

    /* 주말 여부 판별 함수 */
    const isWeekend = (date) => {
        const day = date.getDay();
        return day === 0 || day === 6;
    }


    return (
        <>
            <div className="month-header-container">
                <div className="month-title-container">
                    <h2 className="month-h2-title">{title}</h2>
                </div>
                <div className="month-datepicker-container">
                    <button onClick={handlePrevMonth}
                            className="month-button">◀
                    </button>
                    <CustomDatePicker
                        dateFormat="yyyy-MM"
                        showMonthYearPicker
                        selected={selectedDate}
                        onChange={(date) => handleMonthChange(date)}
                        minDate={new Date(cosSdt)}
                    />
                    <button onClick={handleNextMonth}
                            className="month-button">▶
                    </button>
                </div>
            </div>
            <table className="month-table">
                <thead className="calendarHeader">
                <tr>{calendarHeaders}</tr>
                </thead>

                <tbody>
                {students.map((student, index) => {
                    const attendanceCounts = calculateAttendance(student.stdCode, monthStudents);
                    const totalDaysInMonth = new Date(currentYear, currentMonth, 0).getDate();

                    const attendanceRate = calculateAttendanceRate(attendanceCounts, totalDaysInMonth);

                    return (
                        <>
                            <tr key={student.stdCode}>
                                <td className="month-td">{student.stdCode}</td>
                                <td className="month-td">{student.stdName}</td>
                                {calendarHeaders.slice(2, -5).map((_, headerIndex) => {
                                    const date = new Date(currentYear, currentMonth - 1, headerIndex + 1);
                                    const dateKey = `${currentYear}-${String(currentMonth).padStart(2, '0')}-${String(headerIndex + 1).padStart(2, '0')}`;

                                    const attendanceRecord = monthStudents.find(record =>
                                        record.atdDate === dateKey && record.stdCode === student.stdCode
                                    );

                                    console.log("attendanceRecord : ", attendanceRecord);

                                    let dayClass = '';
                                    if ((dayStatus === 'WEEKDAY' && isWeekend(date)) ||
                                        (dayStatus === 'WEEKEND' && isWeekday(date))) {
                                        dayClass = 'grey-out';
                                    }


                                    const status = attendanceRecord ? attendanceRecord.attendanceStatus : null;

                                    let displayChar = '·';

                                    if (status) {
                                        switch (status) {
                                            case 'attendance':
                                                displayChar = 'O';
                                                break;
                                            case 'absence':
                                                displayChar = 'X';
                                                break;
                                            case 'tardiness':
                                                displayChar = '△';
                                                break;
                                            case 'leave_early':
                                                displayChar = '▼';
                                                break;
                                            default:
                                                displayChar = ''; // 상태가 없거나 미등록인 경우
                                        }
                                    }

                                    return <td key={`${student.stdCode}-${dateKey}`}
                                               className={`month-td status-${status} ${dayClass}`}>{displayChar}</td>;
                                })}
                                <td className="month-td stats">{attendanceCounts.attendance}</td>
                                <td className="month-td stats">{attendanceCounts.absence}</td>
                                <td className="month-td stats">{attendanceCounts.tardiness}</td>
                                <td className="month-td stats">{attendanceCounts.leave_early}</td>
                                <td className="month-td stats">{attendanceRate}%</td>
                            </tr>
                        </>
                    )
                })}
                </tbody>
            </table>
        </>
    );
}

export default MyCourseStudentListMonthItem;