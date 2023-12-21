import React, {useEffect, useState} from "react";
import MainCourseProceedingPaging from "../paging/MainCourseProceedingPaging";
import {callToMainCourseProceedingListAPI} from "../../../apis/CourseAPICalls";
import {useDispatch, useSelector} from "react-redux";
import MainManagerProceedingCalender from "../mainCalender/MainManagerProceedingCalender";



function MainCourseProceeding({setStatus}) {

    const {mainCourses} = useSelector(state => state.myCourseReducer);
    const [currentPage, setCurrentPage] = useState(1);
    const dispatch = useDispatch();

    console.log("왜 mainCourses",mainCourses);



    useEffect(() => {
        /* 진행 중인 강의(과정)에 대한 정보 요청 */
        dispatch(callToMainCourseProceedingListAPI({currentPage}));
    }, [currentPage]);



    const statusOnClickHandler = () => {
        setStatus(false);
    }

    return (
        <>

            <div className="main-manager-back">
                <div>
                    <MainManagerProceedingCalender mainCourses={mainCourses}/>
                </div>


            {
                mainCourses &&
                <>


                    <div className="main-manager-table-back">
                        <div className="main-manager-table">
                            <div className="main-manager-title">
                                <div className="main-title">진행중</div>
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
                                        mainCourses.data && mainCourses.data.length > 0 ? (
                                            mainCourses.data.map((mainCourse, index) => (
                                                <div key={mainCourse.cosCode || index} className="manager-table-name-sub">

                                                    <div style={{
                                                        whiteSpace: "nowrap",
                                                        textOverflow: "ellipsis",
                                                        overflow: "hidden",
                                                        width: 180
                                                    }}>{mainCourse.cosName}</div>
                                                    <div className="ing">진행중</div>
                                                    <div>{mainCourse.teacher}</div>
                                                    <div style={{width : 42}}>{mainCourse.curCnt}/{mainCourse.capacity}</div>
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
                                    <MainCourseProceedingPaging pageInfo={mainCourses.pageInfo}
                                                                setCurrentPage={setCurrentPage}/>

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

export default MainCourseProceeding;