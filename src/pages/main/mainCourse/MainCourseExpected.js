import MainCourseProceedingPaging from "../paging/MainCourseProceedingPaging";
import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {callToMainCourseExpectedListAPI} from "../../../apis/CourseAPICalls";
import MainManagerExpectedCalender from "../mainCalender/MainManagerExpectedCalender";

function MainCourseExpected ({setStatus}) {

    const {mainCourse} = useSelector(state => state.myCourseReducer);
    const [anotherCurrentPage, setAnotherCurrentPage] = useState(1);
    const dispatch = useDispatch();
    console.log("왜 mainCourse",mainCourse);


    useEffect(() => {
        dispatch(callToMainCourseExpectedListAPI({anotherCurrentPage}));
    }, [anotherCurrentPage]);

    const statusOnClickHandler = () => {
        setStatus(true);
    }

    return (
        <>

            <div className="main-manager-back">
                <div>
                    <MainManagerExpectedCalender mainCourse={mainCourse}/>
                </div>

            {
                mainCourse &&
                <>


                    <div className="main-manager-table-back">
                        <div className="main-manager-table">
                            <div className="main-manager-title">
                                <div className="main-title2">예정강의</div>
                                <div onClick={statusOnClickHandler} style={{marginLeft : 5, fontWeight : "bolder", cursor : "pointer"}}>&gt;</div>
                            </div>
                            <div style={{backgroundColor: "white", width : 500, borderRadius : 15, zIndex : 10, display : "flex", height : 300
                            }}>
                                <div style={{margin : "30px 30px 0px 30px"}}>
                                    <div className="manager-table-name">
                                        <div style={{paddingLeft: 50}}>강의명</div>
                                        <div></div>
                                        <div style={{paddingLeft: 130}}>강사</div>
                                        <div>수강생</div>
                                    </div>
                                    {
                                        mainCourse.data && mainCourse.data.length > 0 ? (
                                            mainCourse.data.map((mainCourses, index) => (
                                                <div key={mainCourses.cosCode || index} className="manager-table-name-sub">

                                                    <div style={{
                                                        whiteSpace: "nowrap",
                                                        textOverflow: "ellipsis",
                                                        overflow: "hidden",
                                                        width: 180
                                                    }}>{mainCourses.cosName}</div>
                                                    <div className="ing2">예정강의</div>
                                                    <div>{mainCourses.teacher}</div>
                                                    <div style={{width : 42}}>{mainCourses.curCnt}/{mainCourses.capacity}</div>
                                                </div>


                                            ))
                                        ) : (
                                            <>
                                                <div>
                                                    현재 진행중인 강의가 없습니다.
                                                </div>
                                            </>
                                        )
                                    }
                                    <MainCourseProceedingPaging pageInfo={mainCourse.pageInfo}
                                                                setCurrentPage={setAnotherCurrentPage}/>

                                </div>
                            </div>
                        </div>
                    </div>
                </>
            }
            </div>
        </>
    );
}

export default MainCourseExpected;