"use strict";

const getFinalPage = (articleNum) => {
    const startPages = storage.sprArticleStartPageArray.split(",");
    const startPage = parseInt(startPages[articleNum]);
    const maxPage = parseInt(storage.sprMaxPage);
    return startPage + maxPage;
}

// 1 article のページ数を「推計」する
const calcPages = (lines) => {
    let lineSizeSum = 0;
    lines.map((line) => {
        lineSizeSum += Math.ceil(line.length / maxChars);
    });
    return Math.ceil(lineSizeSum / maxLines);
}

const getArticleStartPageArray = (obj) => {
    let articleStartPageArray = [1];
    let pagesSum = 0;
    for(let i = 0; i < obj.articles.length; i++){
        const str = deleteRuby(obj.articles[i].plane);
        const br = checkBrCode(str);
        const lines = str.split(br);
        const pages = calcPages(lines);
        pagesSum += pages;
        if(i === 0){
            pagesSum++;
        }
        if(obj.articles[i].chapter !== null){
            pagesSum++;
        }
        if(obj.articles[i].title !== null){
            pagesSum++;
        }
        articleStartPageArray.push(pagesSum + 1);
    }
    storage.sprArticleStartPageArray = articleStartPageArray;
    return {
        array: articleStartPageArray,
        sum: pagesSum
    };
}

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

const getArticleNumFromSliderValue = (sliderValue) => {
    const startPages = storage.sprArticleStartPageArray.split(",");
    let i = 0;
    while(sliderValue >= parseInt(startPages[i])){
        if(i > 1000){
            // 無限ループ対策
            console.log("endless loop occurred.");
            break;
        }
        i++;
    }
    return {
        id: i - 1,
        page: sliderValue - startPages[i - 1]
    };
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

const getVer = (fileName) => {
    if(storage.sprVersions){
        const v = JSON.parse(storage.sprVersions);
        if(v[fileName]){
            return parseInt(v[fileName]);
        } else {
            return 0;
        }
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
            path: titleAndPath[1],
            ver: titleAndPath[2]
        };
    });
}

const getFileName = (path) => {
    if(path.indexOf("/") > -1){
        const fileName = path.match(/\/([a-zA-Z0-9_-]+)\.txt/);
        return fileName[0].replace(".txt", "");
    } else {
        return path.replace(".txt", "");
    }
}