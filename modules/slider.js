const sliderDiv = document.getElementById("sliderDiv");
const slider = document.querySelector('input[name="pageSlider"]');
const pageNumP = document.getElementById("currentPageNum");

const changeSlider = () => {
    pageNumP.innerText = slider.value;
    const articleNum = parseInt(storage.sprCurrentArticle);
    const startPages = storage.sprArticleStartPageArray.split(",");
    const startPage = parseInt(startPages[articleNum]);
    const maxPage = parseInt(storage.sprMaxPage);
    const endPage = startPage + maxPage;
    if(slider.value >= startPage && slider.value < endPage){
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