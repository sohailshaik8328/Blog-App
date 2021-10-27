import React from 'react'

function Pagination(props) {
    let {articlesPerPage, articlesCount, activePageIndex, updateCurrentPageIndex} = props;
    let numberOfPages = Math.ceil(articlesCount / articlesPerPage);
    let PagesArray = [];

    for(let i = 1 ; i <= numberOfPages; i++) {
        PagesArray.push(i)
    }
    return (
        <div>
            <button onClick={() => updateCurrentPageIndex(activePageIndex - 1 < 1 ? 1 : activePageIndex - 1 )} className="pagination_btns "> {"<"} </button>
            {
                PagesArray.map((page) => <button key={page} onClick={() => updateCurrentPageIndex(page)} className={`pagination_btns  ${activePageIndex === page ? "active_pagination" : ""}`}>{page}</button>)

            }
            <button onClick={() => updateCurrentPageIndex(activePageIndex + 1 > numberOfPages ? numberOfPages : activePageIndex + 1)} className="pagination_btns">{">"}</button>
        </div>
    )
}

export default Pagination
