"use strict";

// バージョン番号を比べ、更新されていれば true
const allowReload = (latest, fileName) => {
    const ls = getVer(fileName);
    return latest > ls;
}

const setArticleSelector = (titles) => {
    if(titles){
        titles.map((title) => {
            let option = document.createElement("option");
            option.text = title;
            selectArticle.appendChild(option);
        });
    } else {
        selectArticle.style.display = "none";
    }
}

const updateVerInLocalStorage = (path, ver) => {
    let vers = JSON.parse(storage.sprVersions);
    vers[path] = ver;
    storage.sprVersions = JSON.stringify(vers);
}

const init = async() => {
    const id = getId();
    const articleNum = getArticleNum();
    const listObj = await getList();
    storage.currentTitle = getFileName(listObj[id].path);
    const fileName = getFileName(listObj[id].path);
    const reload = allowReload(listObj[id].ver, fileName);
    let book = {};
    if(reload){
        book = await createBook(listObj[id].path);
        let json = JSON.parse(storage.sprBookObj);
        json[fileName] = book;
        storage.sprBookObj = JSON.stringify(json);
    } else {
        const obj = JSON.parse(storage.sprBookObj);
        book = obj[fileName];
    }
    storage.sprMaxArticle = book.articles.length;
    const chapter = book.articles[articleNum].chapter;
    const subTitle = book.articles[articleNum].title;
    await startCreatePages(book.articles[articleNum].plane, 1);
    if(subTitle !== null){
        await addTitlePage(subTitle, 2, 1);
    }
    if(chapter !== null){
        await addTitlePage(chapter, 2, 1);
    }
    if(articleNum === 0){
        await addTitlePage(book.title, 1, 1);
    }
    setArticleSelector(book.subTitles);
    storage.sprCurrentArticle = articleNum;
    const childContainer = document.getElementById("childContainer_1");
    const max = childContainer.childElementCount;
    container.style.width = max * window.innerWidth;
    storage.sprMaxPage = max;
    updateVerInLocalStorage(fileName, listObj[id].ver);
    const obj = getArticleStartPageArray(book);
    setSlidersMax(obj.sum);
    scroll(1, false);
    if(isDaytime()){
        changeColor("white");
    }
    document.getElementById("nowLoading").style.display = "none";
}

init();
