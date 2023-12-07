import React, {useState} from "react";
import {useDispatch} from "react-redux";
import {callRecordRegistAPI} from "../../../apis/StudentAPICalls";


function CourseTable({ data, stdCode }) {

    const [form, setForm] = useState({});
    const dispatch = useDispatch();

    const onClickRecordRegist = (cosCode) => {
       form.stdCode = stdCode;
       form.cosCode = cosCode;
       dispatch(callRecordRegistAPI({registRequest : form}));

    }

    return (

            <div className="course-table">
                <div className="student-table-tr">
                    <div className="record-th-cosName">코스명</div>
                    <div className="record-th-teacher">강사</div>
                    <div className="record-th-cosPeriod">코스 기간</div>
                    <div className="student-th-manage">수강</div>
                </div>
                {
                    data.map(course => (
                        <div key={course.cosCode} className="courseList">
                            <div className="record-cosName">
                                {course.cosName}
                            </div>
                            <div className="record-teacher">
                                {course.teacher}
                            </div>
                            <div className="record-cosPeriod">
                                {course.cosSdt} ~ {course.cosEdt}
                            </div>
                            <div className="record-manage">
                                <button className="record" onClick={ () => onClickRecordRegist(course.cosCode)}>수강등록</button>
                            </div>
                        </div>
                    ))
                }
            </div>
    );
}

export default CourseTable;