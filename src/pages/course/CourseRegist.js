import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {callMemberListAPI} from "../../apis/CourseAPICalls";

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
                        <input
                            placeholder="과정명"
                        />
                        <span className="statusTag"></span>
                    </p>
                </div>
                <div className="courseInfo">
                    <dl>
                        <dt>기간</dt>
                        <dd><input type='date'/>~<input type='date'/></dd>
                    </dl>
                    <dl>
                        <dt>요일</dt>
                        <dd><label><input type='radio' name='classday' value='WEEKDAY'/>주중</label>
                            <label><input type='radio' name='classday' value='WEEKEND'/>주말</label></dd>
                    </dl>
                    <dl>
                        <dt>시간</dt>
                        <dd><label><input type='radio' name='classtime' value='MORNING'/>오전</label>
                            <label><input type='radio' name='classtime' value='AFTERNOON'/>오후</label>
                            <label><input type='radio' name='classtime' value='ALLDAY'/>종일</label></dd>
                    </dl>
                    <dl>
                        <dt>강의실</dt>
                        <dd><select>
                            <option value={1}>qwer</option>
                            <option value={1}>qwer</option>
                        </select></dd>
                    </dl>
                    <dl>
                        <dt>모집정원</dt>
                        <dd><input
                            type='number'
                        /></dd>
                    </dl>
                    <dl>
                        <dt>강사</dt>
                        <dd><select></select></dd>
                    </dl>
                    <dl>
                        <dt>담당자</dt>
                        <dd><select></select></dd>
                    </dl>
                </div>
                <div className="notice">
                    <p className="courseTitle">안내사항</p>
                </div>
            </div>
            <div className='btnArea'>
                <button className='regist'>등록</button>
            </div>
        </>
    );
}

export default CourseRegist