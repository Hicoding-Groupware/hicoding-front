import {isAdmin} from "../../../utils/TokenUtils";

function MainBoard(){



    return(
        <>
        {
        isAdmin() ? (
            <div style={{backgroundColor : "white", height : 280, borderRadius : 15, display : "flex", justifyContent : "space-around", alignItems : "center"}}>
                <div style={{border : "1px solid white", width : 300, textAlign : "center", position : "relative",borderRadius : 15, backgroundColor : "#9c7ff3"}}>
                    <p style={{backgroundColor : "white",display : "flex", border : "1px solid white", borderRadius : 5, margin : "10px 10px 0px 10px", height : 50, justifyContent : "center", alignItems : "center"}}>2024년이 다가오고 있습니다.</p>
                    <p style={{backgroundColor : "white",display : "flex", border : "1px solid white", borderRadius : 5, margin : "5px 10px 0px 10px", height : 50, justifyContent : "center", alignItems : "center"}}>아침부터 대단히 죄송합니다. 공지..</p>
                    <p style={{backgroundColor : "white",display : "flex", border : "1px solid white", borderRadius : 5, margin : "5px 10px 0px 10px", height : 50, justifyContent : "center", alignItems : "center"}}>교사분들 관리 잘 부탁 드립니다</p>
                    <p style={{backgroundColor : "white",display : "flex", border : "1px solid white", borderRadius : 5, margin : "5px 10px 10px 10px", height : 50, justifyContent : "center", alignItems : "center"}}>12강의실 리모델링 한다고 합니다..</p>
                </div>
                <div style={{border : "1px solid white", width : 939, textAlign : "left", position : "relative",borderRadius : 15, height : 250, paddingLeft : 36, backgroundColor : "#e7e7ff"}}>
                    <h2 style={{}}>2024년이 다가오고 있습니다.</h2>
                    <p>여러분 모두 건강 챙기시고 2024년도에도 화이팅해서 일해봅시다!</p>
                </div>
            </div>

        ) : (
            <div style={{backgroundColor : "white", height : 280, borderRadius : 15, display : "flex", justifyContent : "space-around", alignItems : "center"}}>
                <div style={{border : "1px solid white", width : 300, textAlign : "center", position : "relative",borderRadius : 15, backgroundColor : "#9c7ff3"}}>
                    <p style={{backgroundColor : "white",display : "flex", border : "1px solid white", borderRadius : 5, margin : "10px 10px 0px 10px", height : 50, justifyContent : "center", alignItems : "center"}}>2024년부터 새 교재로 교체 됩니다.</p>
                    <p style={{backgroundColor : "white",display : "flex", border : "1px solid white", borderRadius : 5, margin : "5px 10px 0px 10px", height : 50, justifyContent : "center", alignItems : "center"}}>12월21일부터 강의 시작이신....</p>
                    <p style={{backgroundColor : "white",display : "flex", border : "1px solid white", borderRadius : 5, margin : "5px 10px 0px 10px", height : 50, justifyContent : "center", alignItems : "center"}}>학생들 출결관리에 관한 공지사항..</p>
                    <p style={{backgroundColor : "white",display : "flex", border : "1px solid white", borderRadius : 5, margin : "5px 10px 10px 10px", height : 50, justifyContent : "center", alignItems : "center"}}>교사분들께서는 지금 바로 강의실..</p>
                </div>
                <div style={{border : "1px solid white", width : 1017, textAlign : "left", position : "relative",borderRadius : 15, height : 250, paddingLeft : 36, backgroundColor : "#e7e7ff"}}>
                    <h2 style={{}}>2024년부터 새 교재로 교체 됩니다.</h2>
                    <p>요번 연도때 사용했던 교재의 출판사가 파산했다고 합니다. 그런 이유로 2024년 부터는 다른 교재를 사용하겠습니다. <br/>
                        선생님들께서는 잘 숙지하고 있으시길 바랍니다. 이상입니다.</p>
                </div>
            </div>
        )
        }
        </>
    );
}

export default MainBoard;