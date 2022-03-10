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
        // return pageNum + 1;
    } else {
        return pageNum > 1 ? pageNum - 1 : pageNum;
        // return pageNum - 1;
    }
}

const clickedButton = (isLeft) => {
    const pageNum = parseInt(getPageNum());
    const newNum = getNewNum(pageNum, isLeft);
    storage.currentPage = newNum;
    console.log("clicked " + (isLeft ? "Left" : "Right"));
    console.log("newNum: " + newNum);
    scroll(newNum, true);
    document.getElementById("pageSlider").value = newNum;
    document.getElementById("currentPageNum").innerText = newNum;
    // slider.value = newNum;
}

const scroll = (pageNum, isSmooth) => {
    window.scrollTo({
        left: (parseInt(storage.sprMaxPage) - pageNum) * window.innerWidth,
        behavior: isSmooth ? 'smooth' : "instant"
    });
    console.log("scrolled");
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
    console.log("startX: " + startX);
    console.log("endX: " + endX);
    if(endX - startX > 0) {
        console.log("Swiped to right.");
        clickedButton(true);
    } else {
        console.log("Swiped to left");
        clickedButton(false);
    }
}

window.addEventListener('load', () => {
    swipeSensor.addEventListener('touchmove', logSwipeMove);
    swipeSensor.addEventListener('touchstart', logSwipeStart);
    swipeSensor.addEventListener('touchend', logSwipeEnd);
    storage.currentPage = 1;
});

// window.addEventListener('unload', () => {
//     console.log('unload');
//     scroll(1, false);
// });

// scroll(1, false);