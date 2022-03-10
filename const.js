const dir = "file:///J:/Dropbox/PC5_cloud/pg/js/vanilla/slidePageReader/";
const fontSizeArray = [16, 20, 24, 28];
// const dir = "https://enin-world.sakura.ne.jp/files/app/demo/slidePageReader/";
// const storage = localStorage;
// const color = storage.sprColor === undefined ? "black" : storage.sprColor;
// const fontFamily = storage.sprFontFamily === undefined ? "mincho" : storage.sprFontFamily;
// const fontSize = storage.sprFontSize === undefined ? 2 : parseInt(storage.sprFontSize);
// console.log("color:");
// console.log(color);
const storage = localStorage;
// storage.sprColor = storage.sprColor === undefined ? "black";
if(storage.sprColor === undefined){
    storage.sprColor = "black";
}
if(storage.sprFontFamily === undefined){
    storage.sprFontFamily = "mincho";
}
if(storage.sprFontSize === undefined){
    storage.sprFontSize = 1; // 0-3
}
if(storage.currentPage === undefined){
    storage.currentPage = 1;
}
if(storage.sprMaxPage === undefined){
    storage.sprMaxPage = 1;
}
if(storage.sprArticleStartPageArray === undefined){
    storage.sprArticleStartPageArray = [1];
}