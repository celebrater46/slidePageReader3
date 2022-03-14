"use strict";

const swipeSensor = document.getElementById("swipSensor");
let startX = null;
let endX = null;

const getPageNum = () => {
    const pageNum = parseInt(storage.getItem("currentPage"));
    if(pageNum === "NaN" || pageNum < 1 || pageNum === null || pageNum === undefined){
        return 1;
    } else if(pageNum > storage.sprMaxPage){
        storage.currentPage = 1;
        return 1;
    } else {
        return pageNum;
    }
}

const getNewNum = (pageNum, isLeft) => {
    if(isLeft){
        return pageNum < parseInt(storage.sprMaxPage) ? pageNum + 1 : pageNum;
    } else {
        return pageNum > 1 ? pageNum - 1 : pageNum;
    }
}

const clickedButton = (isLeft) => {
    const pageNum = parseInt(getPageNum());
    const newNum = getNewNum(pageNum, isLeft);
    scroll(newNum, true);
    document.getElementById("pageSlider").value = newNum;
    document.getElementById("currentPageNum").innerText = newNum;
}

const scroll = (pageNum, isSmooth) => {
    window.scrollTo({
        left: (parseInt(storage.sprMaxPage) - pageNum) * window.innerWidth,
        behavior: isSmooth ? 'smooth' : "instant"
    });
    storage.currentPage = pageNum;
}

const logSwipeStart = (e) => {
    e.preventDefault();
    startX = e.touches[0].pageX;
}

const logSwipeMove = (e) => {
    e.preventDefault();
    endX = e.touches[0].pageX;
}

const logSwipeEnd = (e) => {
    e.preventDefault();
    if(endX - startX > 0) {
        clickedButton(true);
    } else {
        clickedButton(false);
    }
}

window.addEventListener('load', () => {
    swipeSensor.addEventListener('touchmove', logSwipeMove);
    swipeSensor.addEventListener('touchstart', logSwipeStart);
    swipeSensor.addEventListener('touchend', logSwipeEnd);
    storage.currentPage = 1;
});
