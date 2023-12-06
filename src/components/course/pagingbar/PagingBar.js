function PagingBar({ pageInfo, setCurrentPage }) {

    // const pageNumber = [...Array(pageInfo.endPage - pageInfo.startPage + 1).keys()]
    //                                 .map(key => key + pageInfo.startPage);

    const pageNumber = [];

    for(let i = pageInfo.startPage; i <= pageInfo.endPage; i++) {
        pageNumber.push(i);
    }


    return (
        <div className="pagenationD">
        <ul className="pagingD-ul">
            <li>
                <button
                    className="pagingD-btn"
                    onClick={ () => setCurrentPage(pageInfo.currentPage - 1) }
                    disabled={ pageInfo.currentPage <= 1 }
                >
                    &lt;
                </button>
            </li>
            {
                pageNumber.map(num => (
                    <li key={num}>
                        <button
                            className="pagingD-btn"
                            style={ pageInfo.currentPage === num ? { borderBottom : '3px solid #6260F4' ,color : '#6260F4'} : null }
                            onClick={ () => setCurrentPage(num) }
                            disabled={ pageInfo.currentPage === num }
                        >
                            {num}
                        </button>
                    </li>
                ))
            }
            <li>
                <button
                    className="pagingD-btn"
                    onClick={ () => setCurrentPage(pageInfo.currentPage + 1) }
                    disabled={ pageInfo.currentPage >= pageInfo.maxPage }
                >
                    &gt;
                </button>
            </li>
        </ul>
        </div>
    );
}

export default PagingBar;