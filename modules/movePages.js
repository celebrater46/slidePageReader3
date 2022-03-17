"use strict";

// const swipeSensor = document.getElementById("swipSensor");
let startX = null;
let endX = null;

// スクロール無効化
const disableScroll = (e) => {
    e.preventDefault();
}

const activeButtons = () => {
    console.log("isPhone: " + isPhone);
    if(isPhone){
        swipeSensor.style.display = "block";
        document.removeEventListener('touchmove', disableScroll, { passive: false });
        document.removeEventListener('mousewheel', disableScroll, { passive: false });
        console.log("passive: true");
    } else {
        leftButton.style.display = "block";
        rightButton.style.display = "block";
    }
}
const deactiveButtons = () => {
    console.log("isPhone: " + isPhone);
    if(isPhone){
        swipeSensor.style.display = "none";
        document.addEventListener('touchmove', disableScroll, { passive: false });
        document.addEventListener('mousewheel', disableScroll, { passive: false });
        console.log("passive: false");
    } else {
        leftButton.style.display = "none";
        rightButton.style.display = "none";
    }
}

const getPageNum = () => {
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

const recreatePages = (article, childNum, bookTitle, isScroll) => {
    return new Promise(async (resolve, reject)=> {
        const chapter = article.chapter;
        const subTitle = article.title;
        // leftButton.style.display = "none";
        // rightButton.style.display = "none";
        deactiveButtons();
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
        const childContainer = document.getElementById("childContainer_" + childNum);
        const max = childContainer.childElementCount;
        const prevMax = parseInt(storage.sprMaxPage);
        storage.sprMaxPage = max;
        let sliderNum = slider.value;
        if(isScroll){
            if(childNum === 0){
                const prevAddition = parseInt(storage.sprSlidersAddtionalPageNum);
                const newAddition = prevAddition - max;
                storage.sprSlidersAddtionalPageNum = newAddition;
                storage.currentPage = max;
                sliderNum = max + newAddition;
                window.scrollTo({
                    left: (prevMax - 1) * window.innerWidth
                });
                window.scrollTo({
                    left: prevMax * window.innerWidth,
                    behavior: "smooth"
                });
            } else {
                const prevAddition = parseInt(storage.sprSlidersAddtionalPageNum);
                const newAddition = prevAddition + prevMax;
                storage.sprSlidersAddtionalPageNum = newAddition;
                storage.currentPage = 1;
                sliderNum = newAddition + 1;
                scroll(0, false);
                scroll(1, true);
            }
        }
        document.getElementById("currentPageNum").innerText = sliderNum.toString();
        setTimeout(() =>{
            const child1 = document.getElementById("childContainer_1");
            if(child1 !== null){
                child1.remove();
            }
            if(childNum === 0 && isScroll){
                scroll(max, false);
                nowLoading.style.display = "none";
            }
            childContainer.id = "childContainer_1";
            // leftButton.style.display = "block";
            // rightButton.style.display = "block";
            activeButtons();
            resolve();
        }, 1000);
    });
}

const moveToOtherArticle = (articleNum, page) => {
    const maxArticle = parseInt(storage.sprMaxArticle);
    if(articleNum < maxArticle && articleNum >= 0){
        storage.sprCurrentArticle = articleNum;
        const title = storage.currentTitle;
        // const book = JSON.parse(storage.sprBookObj);
        const book = JSON.parse(storage["sprBookObj_" + title]);
        const childNum = page > 1 ? 0 : 2;
        // const bookTitle = articleNum === 0 ? book[title].title : null;
        // recreatePages(book[title].articles[articleNum], childNum, bookTitle, true);
        const bookTitle = articleNum === 0 ? book.title : null;
        recreatePages(book.articles[articleNum], childNum, bookTitle, true);
        return true;
    } else {
        console.log("Could not move");
        return false;
    }
}

const checkIsMoveArticle = (pageNum, isLeft) => {
    if(isLeft && pageNum >= parseInt(storage.sprMaxPage)){
        const nextArticle = parseInt(storage.sprCurrentArticle) + 1;
        changeArticleSelector(nextArticle);
        return moveToOtherArticle(nextArticle, 1);
    } else if(isLeft === false && pageNum < 2){
        const nextArticle = parseInt(storage.sprCurrentArticle) - 1;
        changeArticleSelector(nextArticle);
        return moveToOtherArticle(nextArticle, getFinalPage(nextArticle));
    } else {
        return false;
    }
}

const clickedButton = (isLeft) => {
    const pageNum = parseInt(getPageNum());
    // let additionalPage = 1;
    // const currentArticle = parseInt(storage.sprCurrentArticle);
    // if(currentArticle > 0){
    //     // const startPageArray = storage.sprArticleStartPageArray.split(",");
    //     // additionalPage = parseInt(startPageArray[currentArticle]);
    // }
    // const startPageArray = storage.sprArticleStartPageArray.split(",");
    // const startPage = parseInt(startPageArray[currentArticle]);
    const isMove = checkIsMoveArticle(pageNum, isLeft);
    if(isMove === false){
        const newNum = getNewNum(pageNum, isLeft);
        const sliderNewNum = newNum + parseInt(storage.sprSlidersAddtionalPageNum);
        scroll(newNum, true);
        slider.value = sliderNewNum;
        document.getElementById("currentPageNum").innerText = sliderNewNum.toString();
    }
}

const scroll = (pageNum, isSmooth) => {
    const moveTo = (parseInt(storage.sprMaxPage) - pageNum) * window.innerWidth;
    window.scrollTo({
        left: moveTo,
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
    console.log("swiped");
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
