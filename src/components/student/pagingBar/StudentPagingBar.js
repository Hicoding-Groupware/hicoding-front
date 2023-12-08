function StudentPagingBar({pageInfo, setCurrentPage}) {

    // const pageNumber = [...Array(pageInfo.endPage - pageInfo.startPage + 1).keys()]
    //                     ...Array => 빈배열 만듬 / keys() => 배열 길이만큼 인덱스번호를 매긴다 예)[0,1,2]
    //                                     .map(key => key + pageInfo.startPage);

    const pageNumber = [];

    for (let i = pageInfo.startPage; i <= pageInfo.endPage; i++) {
        pageNumber.push(i);
    }

    console.log(pageNumber);

    return (
        <div className="student-paging">
            <ul className="paging-ul">
                <li>
                    <button
                        className="paging-btn"
                        onClick={() => setCurrentPage(pageInfo.currentPage - 1)}
                        disabled={pageInfo.currentPage <= 1}
                    >
                        &lt;
                    </button>
                </li>
                {
                    pageNumber.map(num => (
                        <li key={num}>
                            <button
                                className="paging-btn"
                                style={pageInfo.currentPage === num ? { borderBottom : '3px solid #6260F4' ,color : '#6260F4'} : null}
                                onClick={() => setCurrentPage(num)}
                                disabled={pageInfo.currentPage === num}
                            >
                                {num}
                            </button>
                        </li>
                    ))
                }
                <li>
                    <button
                        className="paging-btn"
                        onClick={() => setCurrentPage(pageInfo.currentPage + 1)}
                        disabled={pageInfo.currentPage >= pageInfo.maxPage}
                    >
                        &gt;
                    </button>
                </li>
            </ul>
        </div>
    );
}

export default StudentPagingBar;