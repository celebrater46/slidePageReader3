const sliderDiv = document.getElementById("sliderDiv");
const slider = document.querySelector('input[name="pageSlider"]');
const pageNumP = document.getElementById("currentPageNum");

const changeSlider = async () => {
    pageNumP.innerText = slider.value;
    // pageNumP.innerText = (slider.value * maxLines);
    const articleNum = parseInt(storage.sprCurrentArticle);
    const startPages = storage.sprArticleStartPageArray.split(",");
    const startPage = parseInt(startPages[articleNum]);
    const maxPage = parseInt(storage.sprMaxPage);
    const endPage = startPage + maxPage;
    if(slider.value >= startPage && slider.value < endPage){
        scroll(slider.value, true);
    } else {
        nowLoading.style.display = "block";
        leftButton.style.display = "none";
        rightButton.style.display = "none";
        const book = JSON.parse(storage.sprBookObj);
        const title = storage.currentTitle;
        const newArticle = getArticleNumFromSliderValue(slider.value);
        const bookTitle = newArticle === 0 ? book[title].title : null;
        // container.innerHTML = "";
        // console.log("book[title]: ");
        // console.log(book[title]);
        // console.log("book[title].articles[newArticle.id]: ");
        // console.log(book[title].articles[newArticle.id]);
        console.log("newArticle: ");
        console.log(newArticle);
        const child2 = document.getElementById("childContainer_2");
        if(child2 !== null){
            child2.remove();
        }
        await recreatePages(book[title].articles[newArticle.id], 2, bookTitle);
        storage.currentPage = newArticle.page;
        storage.sprCurrentArticle = newArticle.id;
        // scroll(newArticle.page, false);
        setTimeout(() => {
            scroll(newArticle.page + 2, false);
            nowLoading.style.display = "none";
            leftButton.style.display = "block";
            rightButton.style.display = "block";
        }, 1000);
    }
}

const toggleSlider = () => {
    sliderDiv.classList.toggle("sliderIn");
}

const setSlidersMax = (num) => {
    slider.max = num;
}

slider.addEventListener("input", changeSlider);