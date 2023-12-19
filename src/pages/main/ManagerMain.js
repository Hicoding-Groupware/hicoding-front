import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import MainMessage from "./mainMessage/MainMessage";
import {callMainMessageAPI} from "../../apis/MessageAPICalls";
import MainCourseProceeding from "./mainCourse/MainCourseProceeding";
import MainCourseExpected from "./mainCourse/MainCourseExpected";


function ManagerMain() {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    /* 프로필 */
    const {profileInfo} = useSelector(state => state.memberReducer);
    const loginReducer = useSelector(state => state.loginReducer);
    const {logins} = useSelector(state => state.loginReducer);
    const mypageHandler = () => {
        navigate("/profile", {replace: true});
    }

    /* 메세지 */
    const [messageCurrentPage, setMessageCurrentPage] = useState(1);
    const {message} = useSelector(state => state.messageReducer);
    useEffect(() => {
        dispatch(callMainMessageAPI({messageCurrentPage}));
    }, [messageCurrentPage]);

    /* 강의 화살표 */
    const [intervalId, setIntervalId] = useState(null);
    const [status, setStatus] = useState(true);

    const onCLickMessageHandler = () => {
        navigate("/", {replace: true});
    }

    const startInterval = () => {
        const id = setInterval(() => {
            setStatus((prevStatus) => !prevStatus);
        }, 5000);
        setIntervalId(id);
    };

    const stopInterval = () => {
        if (intervalId) {
            clearInterval(intervalId);
            setIntervalId(null);
        }
    };

    const toggleInterval = () => {
        if (intervalId) {
            stopInterval();
        } else {
            startInterval();
        }
    };

    useEffect(() => {
        // 컴포넌트가 언마운트되면 clearInterval을 통해 interval 제거
        return () => stopInterval();
    }, []);

    return (
        <>

            <div className="stop-button">
                {intervalId === null ? <button onClick={toggleInterval}>▷</button>: <button onClick={toggleInterval}>||</button>}

            </div>


            <div>
                {

                    status ? (
                        <MainCourseProceeding setStatus={setStatus}/>

                    ) : (
                        <MainCourseExpected setStatus={setStatus}/>
                    )

                }
            </div>


            <div className="main-mypage">

                {
                    profileInfo &&
                    <>
                        <div>
                            <h2 style={{
                                paddingLeft: 60,
                                paddingTop: 5,
                                paddingBottom: 0,
                                marginBottom: 0
                            }}>Infomation</h2>

                            <table className="main-mypage-img">
                                <thead>
                                <tr>
                                    <td>

                                        <div style={{
                                            height: 200, width: 200, borderRadius: 200, position: "relative"
                                            , display: "inline-flex", border: "1px solid rgba(7, 7, 7, 0.16)",
                                            left: 5
                                        }}>
                                            {profileInfo.memberProfile === null ? (
                                                <img
                                                    style={{
                                                        position: "absolute",
                                                        top: 0,
                                                        left: 0,
                                                        width: "100%",
                                                        height: "100%",
                                                        borderRadius: 200
                                                    }}
                                                    src="https://github.com/Hicoding-Groupware/hicoding-front/assets/138549261/98298a80-33e9-4918-9e77-09ebd8bfc335"/>

                                            ) : (
                                                <img style={{
                                                    position: "absolute",
                                                    top: 0,
                                                    left: 0,
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
                                            marginTop: 3,
                                            color: "white"
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
                    <div className="main-message-manager-table">
                        <h2 style={{marginBottom: 0, marginTop: 20, cursor: "pointer"}}
                            onClick={onCLickMessageHandler}>message</h2>
                        <div style={{
                            height: 280,
                            backgroundColor: "rgb(239, 239, 239)",
                            borderRadius: 15,
                            paddingTop: 10
                        }}><MainMessage message={message} setMessageCurrentPage={setMessageCurrentPage}/></div>
                    </div>
                }

            </div>
        </>
    );

}

export default ManagerMain;