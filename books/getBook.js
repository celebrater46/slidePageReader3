"use strict";

const convertTextToArray = (txt) => {
    return txt.split("\n");
}

const getText = fetch(path)
    .then((response) => {
        // return response.json()　//ここでBodyからJSONを返す
        return response.text()　// txt でも .text() でいける模様
    })
    .then((result) => {
        convertTextToArray(result);  //取得したJSONデータを関数に渡す
    })
    .catch((e) => {
        console.log(e); // error message
    })

const getBook = () => {
    const href = location.href; // https://enin-world.sakura.ne.jp/index.html
    const pathname = location.pathname; // /index.html
    const jsonPath = href.replace(pathname, "") + "/books/bookList.txt";
    return getText(jsonPath);
}