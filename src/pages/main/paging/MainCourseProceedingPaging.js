import {useState} from "react";

function MainCourseProceedingPaging({ pageInfo, setCurrentPage }) {

    const [isClicked, setIsClicked] = useState({});

    const pageNumber = [];

    for(let i = pageInfo.startPage; i <= pageInfo.endPage; i++) {
        pageNumber.push(i);
    }


    return (
        <div className="pagenationM">
            <ul className="ManagerPagingM-ul">
                <li>
                    <button
                        className="main-paging-btn"
                        onClick={ () => {setCurrentPage(pageInfo.currentPage - 1); setIsClicked(true);} }
                        disabled={ pageInfo.currentPage <= 1 }
                        style={{backgroundColor : isClicked ? "rgba(0, 0, 0, 0.26)" : "transparent"}}
                    >
                    </button>
                </li>
                {
                    pageNumber.map(num => (
                        <li style={{display: 'none'}} key={num}>
                            <button
                                className="pagingM-btn"
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
                        className="main-paging-btn"
                        onClick={ () => {setCurrentPage(pageInfo.currentPage + 1); setIsClicked(false);} }
                        disabled={ pageInfo.currentPage >= pageInfo.maxPage }
                        style={{backgroundColor : isClicked ? "transparent" : "rgba(0, 0, 0, 0.26)"}}
                    >
                    </button>
                </li>
            </ul>
        </div>
    );
}

export default MainCourseProceedingPaging;