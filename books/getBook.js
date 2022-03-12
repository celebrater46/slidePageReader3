"use strict";

const createBook = async(fileName) => {
    // if(storage.)
    // const textPath = "./books/texts/" + fileName + ".txt";
    const textPath = "./books/texts/" + fileName;
    // console.log(textPath);
    const response = await fetch(textPath);
    const text = await response.text();
    const book = new Book(1);
    await book.init(text);
    await book.getArticles();
    const enTitle = fileName.replace(".txt", "");
    // localStorage.setItem("sprBookObject_" + fileName, JSON.stringify(book));
    localStorage.setItem("sprBookObject_" + enTitle, JSON.stringify(book));
    return book;
}