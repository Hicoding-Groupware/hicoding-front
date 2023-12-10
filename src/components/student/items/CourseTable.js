import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {callRecordRegistAPI, callStudentCourseAPI} from "../../../apis/StudentAPICalls";
import {toast} from "react-toastify";


function CourseTable({ data, stdCode, cosList, currentPage, cosName }) {

    const [form, setForm] = useState({});
    const dispatch = useDispatch();

    const onClickRecordRegist = (cosCode) => {

        const duplicateCourse = cosList.some((cos) => cos.cosCode === cosCode);

       if(duplicateCourse){
           toast.error("이미 수강중인 과정 및 수강 했던 과정입니다");
       } else {
           form.stdCode = stdCode;
           form.cosCode = cosCode;
           dispatch(callRecordRegistAPI({registRequest : form}));

       }
    }

    return (

            <div className="course-table">
                <div className="student-table-tr">
                    <div className="record-modal-cosName">코스명</div>
                    <div className="record-modal-teacher">강사</div>
                    <div className="record-modal-cosPeriod">코스 기간</div>
                    <div className="record-modal-capacity">인원</div>
                    <div className="record-modal-manage">수강신청</div>
                </div>
                {
                    data.map(course => (
                        <div key={course.cosCode} className="student-courseList">
                            <div className="record-cosName">
                                {course.cosName}
                            </div>
                            <div className="record-teacher">
                                {course.teacher}
                            </div>
                            <div className="record-cosPeriod">
                                {course.cosSdt} ~ {course.cosEdt}
                            </div>
                            <div className="record-capacity">
                                {course.curCnt}/{course.capacity}
                            </div>
                            <div className="record-manage">
                                { course.curCnt === course.capacity ? <div className="record-end">모집 마감</div> : <button className="record" onClick={ () => onClickRecordRegist(course.cosCode)}>수강등록</button>}
                            </div>
                        </div>
                    ))
                }
            </div>
    );
}

export default CourseTable;