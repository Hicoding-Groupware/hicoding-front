// import student from "../../../pages/student/Student";
// import {useEffect, useState} from "react";
//
// function MyCourseStudentListItem({students, title}) {
//
//     const [buttonText, setButtonText] = useState("저장하기");
//
//     // useEffect(() => {
//     //     // const isEditMode =
//     //     setButtonText(isEditMode ? "다시 저장하기" : "저장하기");
//     // }, []);
//
//     const handleButtonClick = () => {
//         alert(`수강생들의 출석 정보가 저장되었습니다.`);
//     }
//
//     const OPTIONS = [
//         { value : "attendance", name: "출석" },
//         { value : "absence", name: "결석"},
//         { value : "tardiness", name: "지각"},
//         { value : "leave_early", name: "조퇴"},
//     ];
//
//     const SelectBox = (props)=> {
//         return (
//             <select>
//                 {props.options.map((option) => (
//                     <option
//                             key={option.value}
//                             value={option.value}
//                     >
//                         {option.name}
//                     </option>
//                 ))}
//             </select>
//         );
//     };
//
//     return (
//         <>
//             {
//                 students &&
//                 <>
//                     <div className="daily-attendance-main-container">
//                         <h2>{students[0]?.cosName}</h2>
//                         <button className="month-attend-select-button">월별 출석부 조회</button>
//                         <button className="attend-regist-button" onClick={handleButtonClick}>{buttonText}</button>
//                         <div className="daily-attendance-container">
//                             <div className="daily-attendance-header">
//                                 <div className="table-attend-cell hstdCode">NO</div>
//                                 <div className="table-attend-cell hstdName">원생 이름</div>
//                                 <div className="table-attend-cell hstdBirth">생년월일</div>
//                                 <div className="table-attend-cell hstdPhone">연락처</div>
//                                 <div className="table-attend-cell hatdStatus">출석상태</div>
//                             </div>
//                             <div className="attend-info-cell">
//                                 {
//                                     students.map((student, index) => (
//                                         <div className="table-attend-row" key={student.stdCode || index}>
//                                             <div className="table-attend-row-cell stdCode">
//                                                 {student.stdCode}
//                                             </div>
//                                             <div className="table-attend-row-cell stdName">
//                                                 {student.stdName}
//                                             </div>
//                                             <div className="table-attend-row-cell stdBirth">
//                                                 {student.stdBirth}
//                                             </div>
//                                             <div className="table-attend-row-cell stdPhone">
//                                                 {student.stdPhone}
//                                             </div>
//                                             <div className="table-attend-row-cell atdStatus">
//                                                 <SelectBox options={OPTIONS} className="attend-button"
//                                                 >{student.attendanceStatus === null ? "출석" :
//                                                     student.attendanceStatus === 'attendance' ? '출석' :
//                                                 student.attendanceStatus === 'absence' ? '결석' :
//                                                 student.attendanceStatus === 'tardiness' ? '지각' :
//                                                 student.attendanceStatus === 'leave_early' ? '조퇴' : null}
//                                                 </SelectBox>
//                                             </div>
//                                         </div>
//                                     ))
//                                 }
//                             </div>
//
//                         </div>
//                     </div>
//                 </>
//             }
//         </>
//     );
// }
//
// export default MyCourseStudentListItem;


import { useState } from "react";

function MyCourseStudentListItem({ students, title }) {
    const [buttonText, setButtonText] = useState("저장하기");
    const [selectedAttendanceStatus, setSelectedAttendanceStatus] = useState({});


    const handleButtonClick = () => {
        alert(`수강생들의 출석 정보가 저장되었습니다.`);
    };

    const OPTIONS = [
        { value : "attendance", name: "출석" },
        { value : "absence", name: "결석"},
        { value : "tardiness", name: "지각"},
        { value : "leave_early", name: "조퇴"},
    ];

    const SelectBox = ({ options, value, onChange }) => {
        return (
            <select value={value} onChange={onChange}>
                {options.map((option) => (
                    <option key={option.value} value={option.value}>
                        {option.name}
                    </option>
                ))}
            </select>
        );
    };

    return (
        <>
            {students && (
                <>
                    <div className="daily-attendance-main-container">
                        <h2>{students[0]?.cosName}</h2>
                        <button className="month-attend-select-button">
                            월별 출석부 조회
                        </button>
                        <button
                            className="attend-regist-button"
                            onClick={handleButtonClick}
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
                                                value={student.attendanceStatus || "attendance"}
                                                onChange={(e) => {
                                                    const selectedValue = e.target.value;
                                                    setSelectedAttendanceStatus((prev) => ({
                                                        ...prev,
                                                        [student.stdCode]: selectedValue,
                                                    }));
                                                }}
                                                className="attend-button"
                                            >
                                                {student.attendanceStatus === null
                                                    ? "출석"
                                                    : student.attendanceStatus === "attendance"
                                                        ? "출석"
                                                        : student.attendanceStatus === "absence"
                                                            ? "결석"
                                                            : student.attendanceStatus === "tardiness"
                                                                ? "지각"
                                                                : student.attendanceStatus === "leave_early"
                                                                    ? "조퇴"
                                                                    : null}
                                            </SelectBox>
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
