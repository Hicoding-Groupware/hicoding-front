import {useEffect, useState} from "react";
import {useLocation} from "react-router-dom";

function MyCourseStudentListMonthItem({title, monthStudents}) {

    const location = useLocation();
    const [calendarHeaders, setCalendarHeaders] = useState([]);
    const [currentMonth, setCurrentMonth] = useState(new Date().getMonth() + 1);
    const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
    const {students} = location.state || {students: []};

    console.log("monthStudents2222 : ", monthStudents);

    useEffect(() => {
        setCalendarHeaders(generateCalendarHeader(currentYear, currentMonth));
    }, [currentYear, currentMonth]);


    function generateCalendarHeader(year, month) {
        const lastDayOfMonth = new Date(year, month, 0).getDate();
        const headers = [<th key="stdCode">No</th>, <th key="stdName">원생명</th>];
        for (let day = 1; day <= lastDayOfMonth; day++) {
            headers.push(<th key={day}>{day}</th>);
        }
        return headers;
    }

    const handlePrevMonth = () => {
        setCurrentMonth(prev => prev - 1 === 0 ? 12 : prev - 1);
        setCurrentYear(prev => (currentMonth - 1 === 0 ? prev - 1 : prev));
    }

    const handleNextMonth = () => {
        setCurrentMonth(prev => prev + 1 === 13 ? 1 : prev + 1);
        setCurrentYear(prev => (currentMonth + 1 === 13 ? prev + 1 : prev));
    };


    return (
        <>
            <h2>{title}</h2>
            <button onClick={handlePrevMonth}>◀</button>
            <h2>date picker</h2>
            <button onClick={handleNextMonth}>▶</button>
            <table className="month-table">
                <thead className="calendarHeader">
                <tr>{calendarHeaders}</tr>
                </thead>
                <tbody>
                {students.map((student, index) => (
                    <tr key={student.stdCode}>
                        <td className="month-td">{index + 1}</td>
                        <td className="month-td">{student.stdName}</td>
                        {calendarHeaders.slice(2).map((_, headerIndex) => {
                            const dateKey = `${currentYear}-${String(currentMonth).padStart(2, '0')}-${String(headerIndex + 1).padStart(2, '0')}`;

                            // 특정 날짜에 해당 학생의 출석 상태를 찾습니다.
                            const attendanceRecord = monthStudents.find(record =>
                                record.atdDate === dateKey && record.stdCode === student.stdCode
                            );
                            const status = attendanceRecord ? attendanceRecord.attendanceStatus : null;

                            let displayChar = '·';
                            if (status) {
                                switch (status) {
                                    case 'attendance': displayChar = 'O'; break;
                                    case 'absence': displayChar = 'X'; break;
                                    case 'tardiness': displayChar = '△'; break;
                                    case 'leave_early': displayChar = '▼'; break;
                                    default: displayChar = ''; // 상태가 없거나 미등록인 경우
                                }
                            }

                            return <td key={dateKey} className={`month-td status-${status}`}>{displayChar}</td>;
                        })}
                    </tr>
                ))}
                </tbody>
            </table>
        </>
    );
}

export default MyCourseStudentListMonthItem;