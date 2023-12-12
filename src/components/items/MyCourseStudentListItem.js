import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {callAttendanceRegistAPI} from "../../apis/AttendanceAPICalls";
import {ToastContainer} from "react-toastify";
import {useNavigate} from "react-router-dom";

function MyCourseStudentListItem({students, cosCode}) {

    const [buttonText, setButtonText] = useState("저장하기");
    const [selectedStatus, setSelectedStatus] = useState({});
    const dispatch = useDispatch();
    const [form, setForm] = useState({cosCode});
    const {postSuccess} = useSelector(state => state.attendanceReducer);
    const navigate = useNavigate();

    const handleSelectChange = (studentCode, selectedValue) => {
        setSelectedStatus((prev) => ({
            ...prev,
            [studentCode]: selectedValue,
        }));
    };

    useEffect(() => {
        if (postSuccess === true) {
            navigate(`/day/${cosCode}`); // 나중에 체크하고 바꾸기
        }
    }, [postSuccess]);


    const onClickAttendanceRegistrationHandler = () => {
        dispatch(callAttendanceRegistAPI({registRequest: form}));
    };

    // const handleButtonClick = () => {
    //     alert(`수강생들의 출석 정보가 저장되었습니다.`);
    // };

    const OPTIONS = [
        {value: "attendance", name: "출석"},
        {value: "absence", name: "결석"},
        {value: "tardiness", name: "지각"},
        {value: "leave_early", name: "조퇴"},
    ];

    const SelectBox = (props) => {
        const handleChange = (e) => {
            console.log(e.target.value);
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
                                                    value={selectedStatus[student.stdCode] || "attendance"}
                                                    onChange={(selectedStatus) => handleSelectChange(student.stdCode, selectedStatus)}
                                                    className = "attend-button"
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
