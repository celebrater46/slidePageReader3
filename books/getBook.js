"use strict";

const createBook = async(fileName) => {
    const textPath = "./books/texts/" + fileName;
    const response = await fetch(textPath);
    const text = await response.text();
    const book = new Book(1);
    await book.init(text);
    await book.getArticles();
    const enTitle = fileName.replace(".txt", "");
    localStorage.setItem("sprBookObject_" + enTitle, JSON.stringify(book));
    return book;
}