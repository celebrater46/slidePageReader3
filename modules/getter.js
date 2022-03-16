"use strict";

const getFinalPage = (articleNum) => {
    const startPages = storage.sprArticleStartPageArray.split(",");
    const startPage = parseInt(startPages[articleNum]);
    const maxPage = parseInt(storage.sprMaxPage);
    // const endPage = startPage + maxPage;
    return startPage + maxPage;
}

// 1 article のページ数を「推計」する
const calcPages = (lines) => {
    // const maxLines = Math.floor(maxWidth / rubyLineWidth);
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
        // const lines = obj.articles[i].plane.replace(
        //     /｜([^《]+)《([^》]+)》/g,
        //     "$1"
        // );
        const str = deleteRuby(obj.articles[i].plane);
        const br = checkBrCode(str);
        const lines = str.split(br);
        const pages = calcPages(lines);
        pagesSum += pages;
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

const getArticleNum = () => {
    const parameter = location.search;
    if(parameter.indexOf("article") > -1){
        const book = parameter.match(/article=\d+/);
        const num = book[0].substr(8);
        // storage["sprBook" + getId() + "_article"] = num;
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