import React from 'react';
import {MEMBER_FORM_TYPE} from "../member/DetailsView";

function Notice() {
    return (
        <div className="board-container">
            <div className="board-sidebar">

                <div className="board-memberInfo">회원 정보란</div>

                <div className="board-sideWriting">글쓰기</div>
                <div className="board-sideSearch">검색</div>

                <div className="board-category">

                    <p>전체글보기</p>

                    <p>인기글</p>

                    <p>전사게시판</p>
                    <ul>
                        <li>전체</li>
                        <ul>전사 공지</ul>
                        <ul>전사 알림</ul>
                    </ul>

                    <p>부서게시판</p>
                    <ul>
                        <li>행정팀</li>
                        <ul>행정 공지</ul>
                        <ul>행정 알림</ul>
                    </ul>

                    <ul>
                        <li>강사팀</li>
                        <ul>강사 공지</ul>
                        <ul>강사 알림</ul>
                    </ul>

                </div>

            </div>

            <div className="board-main">

                <div className="board-title">게시판 제목</div>
                <div className="board-tool">
                    도구영역
                    공지 등록
                    [] 공지 숨기기
                    페이지 표시 수
                </div>

                <table className="board-posts">
                    <thead>
                    <tr>
                        <th>[ ]</th>
                        <th>

                        </th>
                        <th>번호</th>
                        <th>

                        </th>
                        <th>제목</th>
                        <th>

                        </th>
                        <th>작성자</th>
                        <th>

                        </th>
                        <th>작성일</th>
                        <th>조회수</th>
                        <th>

                        </th>
                        <th>좋아요</th>

                    </tr>
                    </thead>

                    <tbody>

                    </tbody>
                </table>

                <div className="board-bottomWriting">
                    글쓰기
                </div>

                <div className="board-paging">
                    1 2 3 4 5 6 7
                </div>

                <div className="board-bottomSearch">
                    전체기간
                    제목+내용
                    검색
                </div>

            </div>
        </div>
    );
}

export default Notice;