"use strict";

const getAndInitStorage = (key) => {
    const value = storage.getItem(key);
    if(value === "NaN" || value < 1 || value === null || value === undefined){
        storage[key] = 1;
        return 1;
    } else {
        return parseInt(value);
    }
}

const getId = () => {
    const parameter = location.search;
    // book=1
    if(parameter.indexOf("book") > -1){
        const book = parameter.match(/book=\d+/);
        const id = book[0].substr(5);
        return parseInt(id);
    } else {
        return 0;
    }
}

const getArticleNum = () => {
    const parameter = location.search;
    if(parameter.indexOf("article") > -1){
        const book = parameter.match(/article=\d+/);
        const num = book[0].substr(8);
        return parseInt(num);
    } else {
        return 0;
    }
}

// const initLocalStorage = () => {
//     const storage = localStorage;
//     // storage.sprColor = storage.sprColor === undefined ? "black";
//     if(storage.sprColor === undefined){
//         storage.sprColor = "black";
//     }
//     if(storage.sprFontFamily === undefined){
//         storage.sprFontFamily = "mincho";
//     }
//     if(storage.sprFontSize === undefined){
//         storage.sprFontSize = 2; // 1-4
//     }
//     if(storage.currentPage === undefined){
//         storage.currentPage = 1;
//     }
// }

const getList = async() => {
    const response = await fetch('./books/bookList.txt');
    const str = await response.text();
    const br = checkBrCode(str);
    const array = str.split(br);
    return array.map((line) => {
        const titleAndPath = line.split("|");
        return {
            title: titleAndPath[0],
            path: titleAndPath[1]
        };
    });
}

const setArticleSelector = (titles) => {
    titles.map((title) => {
        let option = document.createElement("option");
        option.text = title;
        select.appendChild(option);
    });
}

const init = async() => {
    // initLocalStorage();
    const id = getId();
    const articleNum = getArticleNum();
    const listObj = await getList();
    const book = await createBook(listObj[id]["path"]); // getBook.js
    console.log("book:");
    console.log(book); // succeeded
    // let pages = [];
    await addTitlePage(book.title, 1);
    let articlePagesArray = [1];
    for(let i = 0; i < book.articles.length; i++){
        const chapter = book.articles[i].chapter;
        if(chapter !== null){
            await addTitlePage(chapter, 2);
        }
        const subTitle = book.articles[i].title;
        if(subTitle !== null){
            await addTitlePage(subTitle, 2);
        }
        await asyncCreatePages(book.articles[i].plane);
        articlePagesArray.push(container.childElementCount + 1);
    }
    articlePagesArray.pop();
    storage.sprArticleStartPageArray = articlePagesArray;
    setArticleSelector(book.subTitles);
    // console.log("articlePagesArray: ");
    // console.log(articlePagesArray);
    const max = container.childElementCount;
    container.style.width = max * window.innerWidth;
    storage.sprMaxPage = max;
    setSlidersMax(max);
    // scroll(1, false);
    scroll(articlePagesArray[articleNum], false);
    document.getElementById("nowLoading").style.display = "none";
    // const novelId = getAndInitStorage("sprNovelId");
    // const epId = getAndInitStorage("sprNovel1_EpisodeId");
}

init();
// getUrlParameterToArray();

// localStorage.currentPage = 1;
