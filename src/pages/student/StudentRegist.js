function StudentRegist() {

    return (
        <>

            <div className="student-title">원생 등록</div>
            <div className="student-regist-table">
                <div>
                    <div className="student-regist-title">원생 이름(필수)</div>
                    <input type="text" placeholder="원생 이름을 입력해 주세요."/>
                    <div className="student-regist-title">성별(필수)</div>
                    <input type="radio"/>남성 <input type="radio"/>여성
                    <div className="student-regist-title">생년월일(필수)</div>
                    <input type="date" placeholder="YYYY/MM/DD"/>
                    <div className="student-regist-title">전화 번호(필수)</div>
                    <input type="tel" placeholder="전화번호를 입력해 주세요."/>
                    <div className="student-regist-title">이메일</div>
                    <input type="text" placeholder="email@gmail.com"/>
                </div>
                <div>
                    <div className="student-regist-title">주소</div>
                    <div>
                        <input type="text" placeholder="우편번호"/>
                        <button>주소지 검색</button>
                    </div>
                    <div>
                        <input type="text" placeholder="주소를 입력해 주세요"/>
                    </div>
                    <div>
                        <input type="text" placeholder="상세 주소"/>
                    </div>
                    <div className="student-regist-title">메모</div>
                    <div>
                        <input type="text" placeholder="메모를 입력해 주세요."/>
                    </div>
                </div>
            </div>
        </>
    );
}

export default StudentRegist;