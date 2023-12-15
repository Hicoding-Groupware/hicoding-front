import React from "react";
import MMpagingBar from "../paging/MMpagingBar";

function MainMessage({message, setMessageCurrentPage}) {
    return (
        <>
            {
                message &&
                <>

                    <div className="main-teacher-table-back">
                        <MMpagingBar pageInfo={message.pageInfo} setMessageCurrentPage={setMessageCurrentPage}/>
                        <div className="main-message-table">


                            {
                                message.data && message.data.length > 0 ? (
                                    message.data.map((msg, index) => (
                                        <div className="message-table-row" key={msg.msgNo || index}>
                                            <table style={{width: '200px', display: "inline-flex"}}>
                                                <thead>
                                                <div style={{
                                                    height: 50, width: 50, borderRadius: 100, position: "relative"
                                                    , display: "inline-flex", border: "1px solid rgba(7, 7, 7, 0.16)",
                                                    bottom: 2
                                                }}>
                                                    {
                                                        msg.memberProfile === null ? (
                                                            <tr>
                                                                <td>

                                                                    <img
                                                                        style={{
                                                                            position: "absolute",
                                                                            top: 0,
                                                                            left: 0,
                                                                            width: "100%",
                                                                            height: "100%",
                                                                            borderRadius: 100
                                                                        }}
                                                                        src="https://github.com/Hicoding-Groupware/hicoding-front/assets/138549261/98298a80-33e9-4918-9e77-09ebd8bfc335"/>
                                                                </td>
                                                            </tr>
                                                        ) : (
                                                            <tr>
                                                                <td><img
                                                                    style={{
                                                                        position: "absolute",
                                                                        top: 0,
                                                                        left: 0,
                                                                        width: "100%",
                                                                        height: "100%",
                                                                        borderRadius: 100
                                                                    }}
                                                                    src={msg.memberProfile}/></td>
                                                            </tr>
                                                        )
                                                    }
                                                </div>
                                                </thead>
                                                <tbody style={{paddingLeft: 5, height: 21, paddingTop: 12}}>
                                                <tr>
                                                    <td>{msg.sender}</td>
                                                </tr>
                                                </tbody>
                                            </table>
                                            <p style={{
                                                whiteSpace: "nowrap",
                                                textOverflow: "ellipsis",
                                                overflow: "hidden",
                                                width: 250,
                                                position: "relative",
                                                left: 60,
                                                bottom: 24,
                                                margin: 0
                                            }}>{msg.msgContent}</p>

                                        </div>


                                    ))
                                ) : (
                                    <div className="nothing">

                                            <h4 className="nothing-sub">다른 사람과 대화를 시작 해보세요</h4>
                                        <img className="nothing-img" src="img/nothing-img.png"/>
                                    </div>
                                )
                            }
                        </div>

                    </div>


                </>
            }
        </>
    );
}

export default MainMessage;