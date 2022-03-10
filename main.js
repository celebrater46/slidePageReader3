"use strict";

const getId = () => {
    const parameter = location.search;
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
        selectArticle.appendChild(option);
    });
}

const init = async() => {
    const id = getId();
    const articleNum = getArticleNum();
    const listObj = await getList();
    const book = await createBook(listObj[id]["path"]); // getBook.js
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
    const max = container.childElementCount;
    container.style.width = max * window.innerWidth;
    storage.sprMaxPage = max;
    setSlidersMax(max);
    scroll(articlePagesArray[articleNum], false);
    document.getElementById("nowLoading").style.display = "none";
}

init();
