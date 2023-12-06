import {useState} from "react";

function CourseRegist(){

    const [form, setForm] = useState({});
    const onChangeHandler = e => {
        setForm({
            ...form,
            [e.target.name] : e.target.value
        })
    }

    return(
        <>
            <div className="courseDetailWrap">
                <div className="titleBox">
                    <p className="courseTitle">
                        <input/>
                        <span className="statusTag"></span>
                    </p>
                </div>
                <div className="courseInfo">
                    <dl>
                        <dt>기간</dt>
                        <dd><input/></dd>
                    </dl>
                    <dl>
                        <dt>요일</dt>
                        <dd><input/></dd>
                    </dl>
                    <dl>
                        <dt>시간</dt>
                        <dd><input/></dd>
                    </dl>
                    <dl>
                        <dt>강의실</dt>
                        <dd><input/></dd>
                    </dl>
                    <dl>
                        <dt>수강생</dt>
                        <dd><input/></dd>
                    </dl>
                    <dl>
                        <dt>강사</dt>
                        <dd><input/></dd>
                    </dl>
                    <dl>
                        <dt>기술스택</dt>
                        <dd><input/></dd>
                    </dl>
                    <dl>
                        <dt>교재</dt>
                        <dd><input/></dd>
                    </dl>
                    <dl>
                        <dt>담당자</dt>
                        <dd><input/></dd>
                    </dl>

                </div>
                <div className="notice">
                    <p className="courseTitle">안내사항</p>
                </div>
                <button>등록</button>
            </div>
        </>
    );
}

export default CourseRegist