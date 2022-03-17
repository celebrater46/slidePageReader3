const sliderDiv = document.getElementById("sliderDiv");
const slider = document.querySelector('input[name="pageSlider"]');
const pageNumP = document.getElementById("currentPageNum");

const getStartAndEndPage = () => {
    const articleNum = parseInt(storage.sprCurrentArticle);
    const startPages = storage.sprArticleStartPageArray.split(",");
    const startPage = parseInt(startPages[articleNum]);
    const maxPage = parseInt(storage.sprMaxPage);
    const endPage = startPage + maxPage;
    return {
        start: startPage,
        end: endPage
    };
}

const onChangeSlider = async () => {
    nowLoading.style.display = "block";
    // leftButton.style.display = "none";
    // rightButton.style.display = "none";
    deactiveButtons();
    const book = JSON.parse(storage.sprBookObj);
    const title = storage.currentTitle;
    const newArticle = getArticleNumFromSliderValue(slider.value);
    const bookTitle = newArticle.id === 0 ? book[title].title : null;
    const child2 = document.getElementById("childContainer_2");
    if(child2 !== null){
        child2.remove();
    }
    await recreatePages(book[title].articles[newArticle.id], 2, bookTitle, false);
    changeArticleSelector(newArticle.id);
    storage.currentPage = newArticle.page;
    storage.sprCurrentArticle = newArticle.id;
    const pageNums = getStartAndEndPage();
    storage.sprSlidersAddtionalPageNum = pageNums.start;
    setTimeout(() => {
        scroll(newArticle.page, false);
        nowLoading.style.display = "none";
        // leftButton.style.display = "block";
        // rightButton.style.display = "block";
        activeButtons();
    }, 1000);
}

const changeSlider = () => {
    pageNumP.innerText = slider.value;
    const pageNums = getStartAndEndPage();
    if(slider.value >= pageNums.start && slider.value < pageNums.end){
        scroll(slider.value, true);
    }
}

const toggleSlider = () => {
    sliderDiv.classList.toggle("sliderIn");
}

const setSlidersMax = (num) => {
    slider.max = num;
}

slider.addEventListener("input", changeSlider);