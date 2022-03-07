"use strict";

const convertTextToArray =(txt) => {
    const tempArray = txt.split("\n");
    return tempArray.map((line) => {
        return line.replace("\r", "");
    });
}

const getBook = async(txt) => {
    // const href = location.href; // https://enin-world.sakura.ne.jp/index.html
    // const pathname = location.pathname; // /index.html
    // const textPath = href.replace(pathname, "") + "/books/bookList.txt";
    const textPath = "./books/" + txt + ".txt";
    const response = await fetch(textPath);
    const text = await response.text();
    const array = convertTextToArray(text);
    console.log("array: ");
    console.log(array);
}

getBook("bookList");