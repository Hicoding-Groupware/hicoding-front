import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import {tr} from "date-fns/locale";
import {useEffect, useState} from "react";
import {callMyCourseListAPI, callToMainMyCourseListAPI} from "../../apis/MyCourseAPICalls";
import MainMyCourseListItem from "./mainCourse/MainMyCourseListItem";
import MainCalender from "./mainCalender/MainCalender";
import MainMessage from "./mainMessage/MainMessage";
import {callMainMessageAPI} from "../../apis/MessageAPICalls";

function Main(){

    const {profileInfo} = useSelector(state => state.memberReducer);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    /* 프로필 사진 */
    const mypageHandler = () => {
        navigate("/profile",{replace : true});
    }

    /* 진행중인 강의 */

    const {courses} = useSelector(state => state.myCourseReducer);
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        /* 진행 중인 강의(과정)에 대한 정보 요청 */
        dispatch(callToMainMyCourseListAPI({currentPage}));

    }, [currentPage]);


    /* 메세지 */
    const [messageCurrentPage, setMessageCurrentPage] = useState(1);
    const {message} = useSelector(state => state.messageReducer);
    useEffect(() => {
        dispatch(callMainMessageAPI({messageCurrentPage}));
    }, [messageCurrentPage]);


    return (
        <>

            <div className="main-back">
                <div>
                <MainMyCourseListItem listType="InProfressList"
                courses={courses} setCurrentPage={setCurrentPage}/>
                </div>
                <div>
                    <MainCalender courses={courses}/>
                </div>

            </div>

            <div style={{width : 100}}>


            {
                profileInfo &&
                <>
                    <div className="main-mypage">
                        <h2 style={{paddingLeft: 60, paddingTop: 20, paddingBottom: 0, marginBottom : 0}}>Infomation</h2>

                        <table className="main-mypage-img">
                            <thead>
                            <tr>
                                <td>

                                    <div style={{
                                        height: 200, width: 200, borderRadius: 200, position: "relative"
                                        , display: "inline-flex", border: "1px solid rgba(7, 7, 7, 0.16)",
                                        left: 10
                                    }}>
                                        {profileInfo.memberProfile === null ? (
                                            <img
                                                style={{
                                                    position: "absolute",
                                                    top: 0,
                                                    left: -7,
                                                    width: "100%",
                                                    height: "100%",
                                                    borderRadius: 200
                                                }}
                                                src="https://github.com/Hicoding-Groupware/hicoding-front/assets/138549261/98298a80-33e9-4918-9e77-09ebd8bfc335"/>

                                        ) : (
                                            <img style={{
                                                position: "absolute",
                                                top: 0,
                                                left: -10,
                                                width: "100%",
                                                height: "100%",
                                                borderRadius: 200
                                            }} src={profileInfo.memberProfile}/>

                                        )}


                                    </div>
                                </td>
                            </tr>
                            </thead>

                            <tbody>
                            <tr style={{height: 10}}>
                                <td style={{height: 10}}>
                                    <p style={{
                                        fontWeight: "bolder",
                                        fontSize: 30,
                                        marginBottom: 3,
                                        marginTop :3,
                                        color : "white"
                                    }}>{profileInfo.memberName}</p>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <button onClick={mypageHandler} className="main-mypage-button">마이페이지
                                    </button>
                                </td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                </>
            }

            {
                message &&
                <div>
                    <h2 style={{position : "relative", paddingBottom: 0, marginBottom : 0, width : 100, left : 1530, top : 470}}>message</h2>
                    <MainMessage message={message} setMessageCurrentPage={setMessageCurrentPage}/>
                </div>
            }

            </div>
        </>


);
}

export default Main;
