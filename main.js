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

const getUrlParameterToArray = () => {
    const parameter = location.search;
    // book=1
    if(parameter.indexOf("book") > -1){
        const book = parameter.match(/book=\d+/);
        const id = book[0].substr(5);
        console.log(id);
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

const init = async() => {
    // initLocalStorage();
    const book = await createBook(); // getBook.js
    // console.log("book:");
    // console.log(book); // succeeded
    let pages = [];
    await addTitlePage(book.title, 1);
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
    }
    storage.sprMaxPage = container.childElementCount;
    // const novelId = getAndInitStorage("sprNovelId");
    // const epId = getAndInitStorage("sprNovel1_EpisodeId");
}

init();
// getUrlParameterToArray();

// localStorage.currentPage = 1;
