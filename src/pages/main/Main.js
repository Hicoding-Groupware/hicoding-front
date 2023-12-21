import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import {tr} from "date-fns/locale";
import {useEffect, useState} from "react";
import {callMyCourseListAPI, callToMainMyCourseListAPI} from "../../apis/MyCourseAPICalls";
import MainMyCourseListItem from "./mainMyCourse/MainMyCourseListItem";
import MainCalender from "./mainCalender/MainCalender";
import MainMessage from "./mainMessage/MainMessage";
import {callMainMessageAPI} from "../../apis/MessageAPICalls";
import MainBoard from "./mainBoard/MainBoard";

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

    const onCLickMessageHandler = () => {
        navigate("/message");
    }


    return (
        <>

            <div className="main-back">
                <div style={{position : "relative", width : 800, top : 50}}>
                <MainMyCourseListItem listType="InProfressList"
                courses={courses} setCurrentPage={setCurrentPage}/>
                </div>
                <div className="calendarContainerM">
                    <MainCalender courses={courses}/>
                </div>
                <div style={{position : "relative", top : 100, width : 1400}}>
                    <MainBoard/>
                </div>

            </div>

            <div className="main-mypage">


            {
                profileInfo &&
                <>
                    <div >
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
                <div className="main-message-table">
                    <h2 style={{marginBottom : 0, marginTop : 20, cursor : "pointer"} } onClick={onCLickMessageHandler}>message</h2>
                    <div style={{height : 280, backgroundColor : "rgb(239, 239, 239)", borderRadius : 15}}><MainMessage message={message} setMessageCurrentPage={setMessageCurrentPage}/></div>
                </div>
            }

            </div>
        </>


);
}

export default Main;
