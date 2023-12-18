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




function MyCourseStudentListItem({course, cosCode, students, cosSdt, dayStatus}) {

    const [status, setStatus] = useState({});
    const dispatch = useDispatch();

    const {postSuccess, putSuccess} = useSelector(state => state.attendanceReducer);
    const [selectedDate, setSelectedDate] = useState(new Date()); // 선택된 날짜 상태 추가
    const navigate = useNavigate();



    /* ============== 월별 출석부로 이동 ============= */
    const handleMonthAttendanceSelect = (cosCode) => {
        const cosName = course.cosName;
        navigate(`/attendance/month/${cosCode}`, { state : {cosCode, cosName, students, dayStatus, cosSdt}});
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

    console.log("cosSdt!!!!!!!!!!232 : ", cosSdt);

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
            const updatedStatus = { ...prev, [stdCode]: selectedValue };

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

    /* 평일 여부 판별 함수 */
    const isWeekday = (date) => {
        const day = date.getDay();
        return day === 0 || day === 6;
    }

    /* 주말 여부 판별 함수 */
    const isWeekend = (date) => {
        const day = date.getDay();
        return day >= 1 && day <= 5;
    }

    /* 다음 주말 찾기 */
    const findNextWeekend = (date) => {
        while (!isWeekend(date)) {
            date.setDate(date.getDate() + 1);
        }
        return date;
    }

    /* 다음 평일 찾기 */
    const findNextWeekday = (date) => {
        while (!isWeekday(date)) {
            date.setDate(date.getDate() + 1);
        }
        return date;
    }

    /* 이전 날짜로 이동 */
    const handlePrevDayClick = (e) => {

        /* cosSdt 개강일까지만 이동 가능 */
        e.preventDefault();

        const prevDay = new Date(selectedDate);
        prevDay.setDate(prevDay.getDate() - 1);

        // 이전 날짜가 cosSdt보다 크거나 같은 경우에만 이동 가능
        if (prevDay >= new Date(cosSdt) || prevDay.getDate() === new Date(cosSdt).getDate()) {
            if (dayStatus === "WEEKDAY" && isWeekday(prevDay)) {
                prevDay.setDate(prevDay.getDate() - 1);
            } else if (dayStatus === "WEEKEND" && isWeekend(prevDay)) {
                prevDay.setDate(prevDay.getDate() - 1);
            }

            setSelectedDate(prevDay);
            const formattedDate = formatDate(prevDay); // 날짜 포맷팅 함수 사용
            dispatch(callMyCourseStudentListAPI({cosCode, atdDate: formattedDate}));
        }
    };

    /* 다음 날짜로 이동 */
    const handleNextDayClick = () => {
        const nextDay = new Date(selectedDate);
        nextDay.setDate(nextDay.getDate() + 1);

        let adjustedNextDay = nextDay;

        if (nextDay <= new Date()) {
            if (dayStatus === "WEEKDAY" && isWeekday(nextDay)) {
                adjustedNextDay = findNextWeekend(nextDay);

            } else if (dayStatus === "WEEKEND" && isWeekend(nextDay)) {
                adjustedNextDay = findNextWeekday(nextDay);
            }
            setSelectedDate(adjustedNextDay);
            const formattedDate = formatDate(adjustedNextDay);
            dispatch(callMyCourseStudentListAPI({cosCode, atdDate: formattedDate}));
        }
    };


    // 이전 평일을 찾는 함수
    const findPrevWeekday = (date) => {
        let day = date.getDay();
        if (day === 0) { // 일요일이면 금요일로 이동
            date.setDate(date.getDate() - 2);
        } else if (day === 6) { // 토요일이면 금요일로 이동
            date.setDate(date.getDate() - 1);
        }
        return date;
    }

    // 이전 주말을 찾는 함수
    const findPrevWeekend = (date) => {
        let day = date.getDay();
        if (day >= 1 && day <= 5) { // 평일이면 이전 주 토요일로 이동
            date.setDate(date.getDate() - (day + 1));
        }
        return date;
    }

    const adjustDate = (date) => {
        const dayOfWeek = date.getDay();

        if (dayStatus === "WEEKDAY" && (dayOfWeek === 0 || dayOfWeek === 6)) {
            alert("평일 과정은 평일만 관리 할 수 있습니다. 이전 평일로 이동합니다.");
            return findPrevWeekday(new Date(date));
        } else if (dayStatus === "WEEKEND" && (dayOfWeek >= 1 && dayOfWeek <= 5)) {
            alert("주말 과정은 주말만 관리 할 수 있습니다. 이전 주말로 이동합니다.");
            return findPrevWeekend(new Date(date));
        } else {
            return date;
        }
    };

    // useEffect로 컴포넌트 마운트 및 selectedDate 변경 감지 ?????????????
    // useEffect(() => {
    //     const adjustedDate = adjustDate(selectedDate);
    //     if (adjustedDate !== selectedDate) {
    //         setSelectedDate(adjustedDate);
    //     }
    // }, [selectedDate]);
    // ===================================================
    // ===================================================
    // 주말 이전 평일로 돌아가서 수정했을 경우 오늘 날짜로 등록되는 현상 있음 수정해야함
    // ===================================================
    // ===================================================


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


    const CustomDatePicker = styled(DatePicker)`
      border: none;
      outline: none; /* 선택 시 외곽선 제거 (선택 사항) */
      font-weight: bolder;
      font-size: 22px;
      cursor: pointer;
      caret-color: transparent;
      width: 133px;
    `;


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
                                    onClick={() => handleMonthAttendanceSelect(cosCode, students, dayStatus, cosSdt)}>월별 출석부 조회</button>
                                    <button className="attend-regist-button" onClick={buttonOnClick}>{buttonLabel}</button>
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
                                                        ...(student.attendanceStatus !== null ? [{ value: "leave_early", name: "조퇴" }] : []),
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