"use strict";

const swipeSensor = document.getElementById("swipSensor");
let startX = null;
let endX = null;

const getPageNum = () => {
    // console.log("storage.currentPage: ");
    // console.log(storage.currentPage);
    const pageNum = parseInt(storage.currentPage);
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

const recreatePages = async (article, childNum, bookTitle) => {
    const containerWidthPrev = container.clientWidth;
    const containerChildrenPrev = container.childElementCount;
    // container.innerHTML = "";
    // document.getElementById("nowLoading").style.display = "block";
    // storage.currentPage = 1;
    const chapter = article.chapter;
    const subTitle = article.title;
    // await asyncCreatePages(article.plane, childNum);
    const leftButton = document.getElementById("leftButton");
    const rightButton = document.getElementById("rightButton");
    leftButton.style.display = "none";
    rightButton.style.display = "none";
    await startCreatePages(article.plane, childNum);
    if(subTitle !== null){
        await addTitlePage(subTitle, 2, childNum);
    }
    if(chapter !== null){
        await addTitlePage(chapter, 2, childNum);
    }
    if(bookTitle !== null){
        await addTitlePage(bookTitle, 1, childNum);
    }
    console.log("article.id: " + article.id);
    const childContainer = document.getElementById("childContainer_" + childNum);
    // const max = container.childElementCount - containerChildrenPrev;
    const max = childContainer.childElementCount;
    // container.style.width = max * window.innerWidth + containerWidthPrev;
    const prevMax = parseInt(storage.sprMaxPage);
    storage.sprMaxPage = max;
    // storage.sprScrollPermission = "false";
    console.log("max: " + max);
    if(childNum === 0){
        // nowLoading.style.display = "block";
        storage.currentPage = max;
        window.scrollTo({
            // left: (parseInt(storage.sprMaxPage) - 1) * window.innerWidth
            // left: parseInt(storage.sprMaxPage) * window.innerWidth
            // left: max * window.innerWidth
            left: (prevMax - 1) * window.innerWidth
            // left: moveTo,
            // behavior: "instant"
        });
        window.scrollTo({
            // left: parseInt(storage.sprMaxPage) * window.innerWidth
            // left: (parseInt(storage.sprMaxPage) + 1) * window.innerWidth,
            // left: (prevMax + 1) * window.innerWidth,
            left: prevMax * window.innerWidth,
            behavior: "smooth"
        });
        // scroll(max, true);
    } else {
        storage.currentPage = 1;
        scroll(0, false);
        scroll(1, true);
    }
    // scroll(childNum === 0 ? max + 1 : 0, false);
    // scroll(childNum === 0 ? max : 1, true);
    setTimeout(() =>{
        document.getElementById("childContainer_1").remove();
        if(childNum === 0){
            scroll(max, false);
            nowLoading.style.display = "none";
        }
        childContainer.id = "childContainer_1";
        leftButton.style.display = "block";
        rightButton.style.display = "block";
        // storage.sprScrollPermission = "true";
        // for(let i = 0; i < containerChildrenPrev; i++){
        //     container.children[0].remove();
        // }
    }, 1000);
}

const moveToOtherArticle = (epNum, page) => {
    const maxArticle = parseInt(storage.sprMaxArticle);
    // const currentArticle = getArticleNum();
    // console.log("epNum: " + epNum);
    // console.log("maxArticle: " + maxArticle);
    if(epNum < maxArticle && epNum >= 0){
        const book = JSON.parse(storage.sprBookObj);
        const title = storage.currentTitle;
        // console.log("storage.sprColor:");
        // console.log(storage.sprColor);
        // console.log("book: ");
        // console.log(book);
        // console.log("storage.currentTitle: ");
        // console.log(storage.currentTitle);
        // console.log("book[storage.currentTitle].articles[epNum].plane: ");
        // console.log(book[title].articles[epNum].plane);
        // console.log("book: ");
        // console.log(book);
        const childNum = page > 1 ? 0 : 2;
        const bookTitle = epNum === 0 ? book[title].title : null;
        recreatePages(book[title].articles[epNum], childNum, bookTitle);
        // const href = location.href;
        // const index = href.indexOf("index.html");
        // const path = href.substr(0, index + 10);
        // const fullPath = path + "?book=" + getId() + "&article=" + epNum;
        // console.log("fullPath: " + fullPath);
        // window.location.href(path + "?book=" + getId() + "&article=" + epNum);
        // window.location.href(path);
    } else {
        console.log("Could not move");
    }
}

const checkIsMoveArticle = (pageNum, isLeft) => {
    // const nextArticle = isLeft ? parseInt(storage.sprCurrentArticle) + 1 : parseInt(storage.sprCurrentArticle) - 1;
    if(isLeft && pageNum >= parseInt(storage.sprMaxPage)){
        const nextArticle = parseInt(storage.sprCurrentArticle) + 1;
        // console.log("isLeft: " + isLeft);
        // console.log("pageNum: " + pageNum);
        // console.log("nextArticle: " + nextArticle);
        storage.sprCurrentArticle = nextArticle;
        moveToOtherArticle(nextArticle, 1);
        return true;
    } else if(isLeft === false && pageNum < 2){
        const nextArticle = parseInt(storage.sprCurrentArticle) - 1;
        // console.log("isLeft: " + isLeft);
        // console.log("pageNum: " + pageNum);
        // console.log("nextArticle: " + nextArticle);
        storage.sprCurrentArticle = nextArticle;
        moveToOtherArticle(nextArticle, getFinalPage(nextArticle));
        return true;
    } else {
        return false;
    }
    // if(isLeft){
    //     if(pageNum >= parseInt(storage.sprMaxPage)){
    //         // const maxArticle = parseInt(storage.sprMaxArticle);
    //         // const currentArticle = getArticleNum();
    //         // const nextArticle = parseInt(storage.sprCurrentArticle) + 1;
    //         storage.sprCurrentArticle = nextArticle;
    //         moveToOtherArticle(nextArticle);
    //         // if(currentArticle < maxArticle){
    //         // }
    //         return true;
    //     }
    // } else {
    //     if(pageNum < 2){
    //         const nextArticle = parseInt(storage.sprCurrentArticle) - 1;
    //         storage.sprCurrentArticle = nextArticle;
    //         moveToOtherArticle(nextArticle);
    //         return true;
    //     }
    // }
    // return false;
    // const articleNum = getArticleNum();

}

const clickedButton = (isLeft) => {
    // if(storage.sprScrollPermission === "true"){
    // }
    const pageNum = parseInt(getPageNum());
    // console.log("pageNum: " + pageNum);
    const isMove = checkIsMoveArticle(pageNum, isLeft);
    if(isMove === false){
        const newNum = getNewNum(pageNum, isLeft);
        // console.log("newNum: " + newNum);
        // console.log("currentPage: " + storage.currentPage);
        scroll(newNum, true);
        document.getElementById("pageSlider").value = newNum;
        document.getElementById("currentPageNum").innerText = newNum;
        // nowLoading.style.display = "block";
    }
}

const scroll = (pageNum, isSmooth) => {
    const moveTo = (parseInt(storage.sprMaxPage) - pageNum) * window.innerWidth;
    window.scrollTo({
        // left: (parseInt(storage.sprMaxPage) - pageNum) * window.innerWidth,
        left: moveTo,
        behavior: isSmooth ? 'smooth' : "instant"
    });
    // console.log("maxpage: " + storage.sprMaxPage);
    // document.getElementById("nowLoading").style.right = "auto";
    // document.getElementById("nowLoading").style.left = moveTo.toString();
    // document.getElementById("nowLoading").style.display = "block";
    // nowLoading.style.right = "auto";
    // nowLoading.style.left = moveTo.toString();
    // nowLoading.style.display = "block";
    // console.log("moveTo: " + moveTo);
    storage.currentPage = pageNum;
    // if(storage.sprScrollPermission === "true"){
    // }
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
