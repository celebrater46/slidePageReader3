"use strict";

const convertTextToArray =(txt) => {
    const tempArray = txt.split("\n");
    return tempArray.map((line) => {
        return line.replace("\r", "");
    });
}

const getBook = async(id, txt) => {
    // const href = location.href; // https://enin-world.sakura.ne.jp/index.html
    // const pathname = location.pathname; // /index.html
    // const textPath = href.replace(pathname, "") + "/books/bookList.txt";
    const textPath = "./books/" + txt + ".txt";
    const response = await fetch(textPath);
    const text = await response.text();
    const array = convertTextToArray(text);
    const titleAndDir = array[id].split("|");
    const book = new Book(id, titleAndDir[0], titleAndDir[1]);
    console.log("array: ");
    console.log(array);
}

const testCreateBook = async() => {
    let book = new Book(1, "第三世界収容所", "prison");
    await book.getChapters();
    await book.getSubTitles();
    console.log("book: ");
    console.log(book);
}

// getBook(1, "bookList");
testCreateBook();