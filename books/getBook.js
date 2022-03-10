"use strict";

const createBook = async(path) => {
    const textPath = "./books/texts/" + path + ".txt";
    const response = await fetch(textPath);
    const text = await response.text();
    const book = new Book(1);
    await book.init(text);
    await book.getArticles();
    localStorage.setItem("sprBookObject_" + path, JSON.stringify(book));
    return book;
}