import React, {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {callMemberProfileAPI} from "../../apis/MemberAPICalls";
import BoardPostList from "../../components/notice/list/BoardPostList";
import PagingBar from "../../components/notice/pagingBar/PagingBar";
import {callCreationToPostAPI, callPostListAPI} from "../../apis/NoticeAPICalls";
import {setBoardAccessStatus} from "../../modules/NoticeModule";

function NoticeBoard() {

    const dispatch = useDispatch()
    const navigate = useNavigate();
    const {title, role} = useParams()
    const [currPage, setCurrPage] = useState(1)
    const {profileInfo} = useSelector(state => state.memberReducer);
    const {
        boardPosts,
        isBoardAccessGranted,
        isPostAccessGranted,
        isPostCreationSuccessfully
    } = useSelector(state => state.boardReducer)

    const [durationPeriod, setDurationPeriod] = useState('all');
    const [searchType, setSearchType] = useState('titleAndContent');
    const [searchKeyword, setSearchKeyword] = useState('');
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());

    useEffect(() => {
        setCurrPage(1)
        dispatch(callMemberProfileAPI());
        dispatch(callPostListAPI({role, currPage}))
    }, [title, role]);

    useEffect(() => {
        if (currPage || isPostAccessGranted === true || isPostCreationSuccessfully === true) {
            dispatch(callPostListAPI({role, currPage}))
        }
    }, [currPage, isPostAccessGranted, isPostCreationSuccessfully]);

    const handleClick = (action) => (e) => {
        switch (action) {
            case "postWriting":
                navigate(`${profileInfo.memberNo}/${null}`);
                break;
        }
    }

    const handleSearch = () => {
        // 검색 로직을 추가하세요.
        console.log('검색 기간:', durationPeriod);
        console.log('검색 유형:', searchType);
        console.log('검색어:', searchKeyword);
        console.log('시작 날짜:', startDate);
        console.log('종료 날짜:', endDate);
    };

    const renderCustomDurationInput = () => {
        if (durationPeriod === 'period') {
            return (
                <>
                    <input
                        type="date"
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                        placeholder="시작 날짜"
                        className="custom-date-input"
                    />
                    <input
                        type="date"
                        value={endDate}
                        onChange={(e) => setEndDate(e.target.value)}
                        placeholder="종료 날짜"
                        className="custom-date-input"
                    />
                </>
            );
        }
        return null;
    };

    return (
        profileInfo &&
        boardPosts && (
            <>
                <div className="notice-border-title">
                    <div className="notice-title">{title}</div>
                </div>

                <div className="notice-border-tool">
                    <div className="notice-tool">
                        <button onClick={handleClick("postWriting")}>글쓰기</button>
                    </div>
                    <div className="notice-tool">
                        <button onClick={handleClick("postWriting")}>공지 등록</button>
                    </div>
                    <div className="notice-tool">
                        <button onClick={handleClick("postWriting")}>삭제</button>
                    </div>
                    <div className="notice-tool">
                        총 21건
                    </div>
                </div>

                <BoardPostList postList={boardPosts.data} role={role} memberNo={profileInfo.memberNo}/>
                <PagingBar pageInfo={boardPosts.pageInfo} setCurrentPage={setCurrPage}/>

                <div className="notice-bottomSearch">
                    <select
                        id="notice-board-durationPeriod"
                        value={durationPeriod}
                        onChange={(e) => setDurationPeriod(e.target.value)}
                    >
                        <option value="all">전체기간</option>
                        <option value="-1">1개월</option>
                        <option value="-6">6개월</option>
                        <option value="-12">1년</option>
                        <option value="period">기간입력</option>
                    </select>

                    {renderCustomDurationInput()} {/* 기간입력 옵션일 때만 나타남 */}

                    <select
                        id="notice-board-searchTypes"
                        value={searchType}
                        onChange={(e) => setSearchType(e.target.value)}
                    >
                        <option value="titleAndContent">제목+내용</option>
                        <option value="titleOnly">제목</option>
                        <option value="userName">작성자</option>
                    </select>

                    <input
                        id="searchKeyword"
                        className="search2"
                        type="text"
                        placeholder="검색"
                        value={searchKeyword}
                        onChange={(e) => setSearchKeyword(e.target.value)}
                    />
                    <button id="searchBtn" className="btn_search2" title="검색" onClick={handleSearch}>
                        검색
                    </button>

                </div>
            </>
        )
    )
}

export default NoticeBoard