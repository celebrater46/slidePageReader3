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