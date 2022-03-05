"use strict";

const storage = localStorage;

// const pageNum = storage.currentPage.length > -1 ? storage.getItem("currentPage") : 1;


// var ABC = localStorage.getItem( "DATA" ); // なかったらnullが返る
// if ( ABC ){
//     ABC = JSON.parse( ABC );
//     if ( ABC.value ){
//         alert('中身がある');
//     } else {
//         alert('中身がない');
//     }
// } else {
//     alert('中身がない(使ってない)');
// }

const getPageNum = (isLeft) => {
    // const storage = localStorage;
    const pageNum = storage.getItem("currentPage");
    // const parsed = JSON.parse(pageNum);
    return pageNum === "NaN" ? 1 : pageNum;
}

let maxPage = 0;

const clickedButton = (isLeft) => {
    // console.log("storage.currentPage: ");
    // console.log(storage.currentPage);
    const pageNum = parseInt(getPageNum(isLeft));
    const newNum = isLeft ? pageNum + 1 : pageNum - 1;
    storage.currentPage = newNum;
    console.log("clicked left");
    console.log("pageNum: " + pageNum);
    // scroll(newNum);
}
//
// const clickRight = () => {
//     const pageNum = getPageNum(false);
//     console.log("clicked right");
//     console.log("pageNum: " + pageNum);
//     // scroll(pageNum);
// }

const getLocation = () => {
    if(xy === "horizontal-tb"){
        return (currentPage - 1) * window.innerWidth;
    } else {
        return (maxPage - currentPage + 1) * window.innerWidth;
        // 1-5 2-4 3-3 4-2 5-1
    }
}

const scroll = (pageNum) => {
    window.scrollTo({
        left: (maxPage - pageNum) * window.innerWidth,
        behavior: 'smooth'
    });
}