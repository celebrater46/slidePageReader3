"use strict";

const convertTextToArray =(txt) => {
    const tempArray = txt.split("\n");
    return tempArray.map((line) => {
        return line.replace("\r", "");
    });
    // return txt.split("\n");
}

// const getText = fetch(path)
//     .then((response) => {
//         // return response.json()　//ここでBodyからJSONを返す
//         return response.text()　// txt でも .text() でいける模様
//     })
//     .then((result) => {
//         convertTextToArray(result);  //取得したJSONデータを関数に渡す
//     })
//     .catch((e) => {
//         console.log(e); // error message
//     })

const getBook = async(txt) => {
    // const href = location.href; // https://enin-world.sakura.ne.jp/index.html
    // const pathname = location.pathname; // /index.html
    // const textPath = href.replace(pathname, "") + "/books/bookList.txt";
    const textPath = "./books/" + txt;
    console.log("textPath: " + textPath);
    const response = await fetch(textPath);
    const text = await response.text();
    const array = convertTextToArray(text);
    console.log("array: ");
    console.log(array);
    // console.log("response.text: ");
    // console.log(response.text());
    // console.log("const text: ");
    // console.log(text); // succeeded
    // return await response.text();
}

getBook("bookList.txt");