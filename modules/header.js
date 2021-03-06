const headerDiv = document.getElementById("headerDiv");
const selectColor = document.querySelector('select[name="colorSelector"]');
const selectArticle = document.querySelector('select[name="articleSelector"]');

const toggleHeader = () => {
    headerDiv.classList.toggle("headerIn");
}

const getColors = (bgColor) => {
    switch (bgColor){
        case "black": return ["#333", "silver"];
        case "white": return ["white", "black"];
        case "beige": return ["#fedcbb", "#443322"];
        default: return ["#333", "silver"];
    }
}

const changeSelector = (color) => {
    const options = selectColor.options;
    for(let i = 0; i < options.length; i++){
        options[i].selected = options[i].value === color;
    }
}

const changeColor = (color) => {
    if(color !== ""){
        changeSelector(color);
    }
    const value = color === "" ? selectColor.value : color;
    const colors = getColors(value)
    const body = document.querySelector("body");
    body.style.backgroundColor = colors[0];
    body.style.color = colors[1];
    // headerDiv.style.backgroundColor = colors[0];
    // sliderDiv.style.backgroundColor = colors[0];
    pageNumP.style.backgroundColor = value === "beige" ? "white" : colors[0];
    pageNumP.style.color = colors[1];
}

const changeArticleSelector = (articleNum) => {
    selectArticle.selectedIndex = -1; // 選択の全解除
    selectArticle.options[articleNum].selected = true;
}

const changeArticle = async () => {
    nowLoading.style.display = "block";
    deactiveButtons();
    const array = storage.getItem("sprArticleStartPageArray").split(",");
    const articleNum = parseInt(selectArticle.selectedIndex);
    const startPage = parseInt(array[articleNum]);
    scroll(startPage, true);
    document.getElementById("pageSlider").value = startPage + 1;
    document.getElementById("currentPageNum").innerText = "1";
    const title = storage.currentTitle;
    const book = JSON.parse(storage["sprBookObj_" + title]);
    const bookTitle = articleNum === 0 ? book.title : null;
    const child2 = document.getElementById("childContainer_2");
    if(child2 !== null){
        child2.remove();
    }
    await recreatePages(book.articles[articleNum], 2, bookTitle, false);
    storage.currentPage = 1;
    storage.sprCurrentArticle = articleNum;
    storage.sprSlidersAddtionalPageNum = startPage;
    changeArticleSelector(articleNum);
    setTimeout(() => {
        scroll(1, false);
        nowLoading.style.display = "none";
        activeButtons();
    }, 1000);
}

const toggleTb = () => {
    if(headerDiv.className.indexOf("headerIn") > -1
    && sliderDiv.className.indexOf("sliderIn") > -1)
    {
        headerDiv.classList.remove("headerIn");
        sliderDiv.classList.remove("sliderIn");
    } else {
        headerDiv.classList.add("headerIn");
        sliderDiv.classList.add("sliderIn");
    }
    // console.log(headerDiv.classList);
    // console.log(headerDiv.className);
    // const headerClass = headerDiv.classList;
    // console.log(headerClass);
    // console.log(headerClass.indexOf("headerIn"));
}