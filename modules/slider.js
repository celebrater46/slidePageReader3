const sliderDiv = document.getElementById("sliderDiv");
const slider = document.querySelector('input[name="pageSlider"]');
const pageNumP = document.getElementById("currentPageNum");

const changeSlider = async () => {
    pageNumP.innerText = slider.value;
    const articleNum = parseInt(storage.sprCurrentArticle);
    const startPages = storage.sprArticleStartPageArray.split(",");
    const startPage = parseInt(startPages[articleNum]);
    const maxPage = parseInt(storage.sprMaxPage);
    const endPage = startPage + maxPage;
    if(slider.value >= startPage && slider.value < endPage){
        scroll(slider.value, true);
    } else {
        nowLoading.style.display = "block";
        const book = JSON.parse(storage.sprBookObj);
        const title = storage.currentTitle;
        const newArticleNum = getArticleNumFromSliderValue(slider.value);
        const bookTitle = newArticleNum === 0 ? book[title].title : null;
        container.innerHTML = "";
        await recreatePages(book[title].articles[newArticleNum], 1, bookTitle);
        nowLoading.style.display = "none";
    }
}

const toggleSlider = () => {
    sliderDiv.classList.toggle("sliderIn");
}

const setSlidersMax = (num) => {
    slider.max = num;
}

slider.addEventListener("input", changeSlider);