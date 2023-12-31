import {useEffect, useState} from "react";
import {useLocation, useNavigate} from "react-router-dom";
import DatePicker from "react-datepicker";
import styled from "styled-components";
import {useDispatch} from "react-redux";
import {callMyCourseStudentMonthListAPI} from "../../../apis/AttendanceAPICalls";

const CustomDatePicker = styled(DatePicker)`
  border: none;
  outline: none; 
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
    const navigate = useNavigate();

    console.log("cosEdt value: ", cosEdt);


    // const dailyAttendanceSelect = (cosCode) => {
    //     navigate(`/attendance/day/${cosCode}`)
    // }


    useEffect(() => {
        setCalendarHeaders(generateCalendarHeader(currentYear, currentMonth))
    }, [currentYear, currentMonth]);

    /* 월별 출석부 헤더 */
    function generateCalendarHeader(year, month) {
        const daysOfWeek = ['일', '월', '화', '수', '목', '금', '토'];
        const lastDayOfMonth = new Date(year, month, 0).getDate();
        const headers = [<th>No</th>, <th>원생명</th>]

        for (let day = 1; day <= lastDayOfMonth; day++) {
            const date = new Date(year, month - 1, day);
            const dayOfWeek = daysOfWeek[date.getDay()];
            const isWeekend = date.getDay() === 0 || date.getDay() === 6; // 주말 여부 확인
            const weekendClass = isWeekend ? "weekend" : ""; // 주말일 경우 적용할 클래스

            headers.push(
                <th key={day} className={weekendClass}>
                    <span className="day-number">{day}</span>
                    <span className="day-of-week">{dayOfWeek}</span>
                </th>
            );
        }
        headers.push(<th key="attendance">출석</th>);
        headers.push(<th key="absence">결석</th>);
        headers.push(<th key="tardiness">지각</th>);
        headers.push(<th key="leave_early">조퇴</th>);

        headers.push(<th key="attendanceRate">출석률</th>);

        return headers;
    }

    /* 합계 계산 */
    const totals = students.reduce((acc, student) => {
        const attendanceCounts = calculateAttendance(student.stdCode, monthStudents);
        acc.attendance += attendanceCounts.attendance;
        acc.absence += attendanceCounts.absence;
        acc.tardiness += attendanceCounts.tardiness;
        acc.leave_early += attendanceCounts.leave_early;
        return acc;
    }, { attendance: 0, absence: 0, tardiness: 0, leave_early: 0 });


    /* 데이트 피커 */
    useEffect(() => {
        // 현재 날짜와 cosEdt 비교
        const startDate = new Date(cosSdt);
        const currentDate = new Date();
        const initialDate = startDate > currentDate ? currentDate : startDate;

        // 초기 날짜 설정
        setSelectedDate(initialDate);
        setCurrentMonth(initialDate.getMonth() + 1);
        setCurrentYear(initialDate.getFullYear());
        fetchMonthData(initialDate);
    }, [cosSdt, cosEdt]);

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
        const startDate = new Date(cosSdt);

        if ( newDate.getFullYear() > startDate.getFullYear() ||
            (newDate.getFullYear() === startDate.getFullYear() && newDate.getMonth() >= startDate.getMonth())) {
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
        const endDate = new Date(cosEdt);

        if(newDate <= endDate) {
            handleMonthChange(newDate);
            setCurrentMonth(newMonth);
            setCurrentYear(newYear);
        }
    };

    const fetchMonthData = (date) => {
        try {
            const formattedDate = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-01`; // 날짜를 매달 1일로 설정
            dispatch(callMyCourseStudentMonthListAPI({cosCode, atdDate: formattedDate}));
        } catch (error) {
        }
    };

    useEffect(() => {
        fetchMonthData(selectedDate);
    }, [selectedDate, cosCode]);



    /* 출석률 계산 */
    function calculateAttendance(stdCode, monthStudents) {
        const statusCounts = {
            attendance: 0,
            absence: 0,
            tardiness: 0,
            leave_early: 0
        };

        monthStudents.forEach(record => {
            if (record.stdCode === stdCode) {
                // 각 출석 상태별로 카운트
                switch(record.attendanceStatus) {
                    case 'attendance':
                        statusCounts.attendance++;
                        break;
                    case 'absence':
                        statusCounts.absence++;
                        break;
                    case 'tardiness':
                        statusCounts.tardiness++;
                        break;
                    case 'leave_early':
                        statusCounts.leave_early++;
                        break;
                }
            }
        });
        return statusCounts;
    }

    function calculateAttendanceRate(cosSdt, cosEdt, attendanceRecords, classType) {
        let totalDays = 0;
        let attendedDays = 0;

        // 개강일부터 종강일까지 모든 날짜를 순회
        for (let date = new Date(cosSdt); date <= new Date(cosEdt); date.setDate(date.getDate() + 1)) {
            if ((classType === 'WEEKDAY' && isWeekday(date)) || (classType === 'WEEKEND' && isWeekend(date))) {
                totalDays++;
                if (attendanceRecords.includes(formatDate(date))) {
                    attendedDays++;
                }
            }
        }

        // 출석률 계산: (출석일수 / 총 수업일수) * 100
        return (attendedDays / totalDays) * 100;
    }

    function isWeekday(date) {
        const day = date.getDay();
        return day >= 1 && day <= 5;
    }

    function isWeekend(date) {
        const day = date.getDay();
        return day === 0 || day === 6;
    }

    function formatDate(date) {
        return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
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
            <div className="month-description">출석 O 결석 X 지각 △ 조퇴 ▼</div>
            {/*<button onClick={dailyAttendanceSelect}>돌아가기</button>*/}
            <table className="month-table">
                <thead className="calendarHeader">
                <tr>{calendarHeaders}</tr>
                </thead>

                <tbody>
                {students.map((student, index) => {
                    const attendanceCounts = calculateAttendance(student.stdCode, monthStudents);
                    const attendanceRecords = monthStudents
                        .filter(record => record.stdCode === student.stdCode && record.attendanceStatus === 'attendance')
                        .map(record => record.atdDate);

                    const attendanceRate = calculateAttendanceRate(cosSdt, cosEdt, attendanceRecords, dayStatus);

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
                                                displayChar = '';
                                        }
                                    }

                                    return <td key={`${student.stdCode}-${dateKey}`}
                                               className={`month-td status-${status} ${dayClass}`}>{displayChar}</td>;
                                })}
                                <td className="month-td stats">{attendanceCounts.attendance}</td>
                                <td className="month-td stats">{attendanceCounts.absence}</td>
                                <td className="month-td stats">{attendanceCounts.tardiness}</td>
                                <td className="month-td stats">{attendanceCounts.leave_early}</td>
                                <td className="month-td stats">{attendanceRate.toFixed(2)}%</td>
                            </tr>
                        </>
                    )
                })}
                </tbody>
                <tfoot>
                <tr>
                    <td colSpan="2">합계</td>
                    <td colSpan={calendarHeaders.length - 7}>{''}</td>
                    <td>{totals.attendance}</td>
                    <td>{totals.absence}</td>
                    <td>{totals.tardiness}</td>
                    <td>{totals.leave_early}</td>
                    <td>{''}</td>
                </tr>
                </tfoot>
            </table>
        </>
    );
}

export default MyCourseStudentListMonthItem;



