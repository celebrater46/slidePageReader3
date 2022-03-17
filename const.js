const storage = localStorage;
const fontSizeArray = [16, 20, 24, 28];
const scale = document.getElementById("scale");
const container = document.getElementById("containter")
const scale_p_ruby = document.getElementById("scale_p_ruby");
const rubyLineWidth = scale_p_ruby.clientWidth; // 一行の高さ（ルビあり）
const maxWidth = scale.clientWidth; // 縦書きの場合は反転
const maxHeight = scale.clientHeight;
const fontSizeNum = parseInt(storage.sprFontSize);
const fontSize = fontSizeArray[fontSizeNum];
const maxChars = Math.floor(maxHeight / fontSize); // 1行あたりの最大文字数
const maxLines = Math.floor(maxWidth / rubyLineWidth);
const leftButton = document.getElementById("leftButton");
const rightButton = document.getElementById("rightButton");
const nowLoading = document.getElementById("nowLoading");


if(storage.sprColor === undefined){
    storage.sprColor = "black";
}
if(storage.sprFontFamily === undefined){
    storage.sprFontFamily = "mincho";
}
if(storage.sprFontSize === undefined){
    storage.sprFontSize = 1; // 0-3
}
if(storage.currentTitle === undefined){
    storage.currentTitle = "defaultTitle";
    console.log("currentTitle: " + storage.currentTitle);
}
// console.log("currentTitle: " + storage.currentTitle);
if(storage.currentPage === undefined){
    storage.currentPage = 1;
}
if(storage.sprMaxPage === undefined){
    storage.sprMaxPage = 1;
}
if(storage.sprCurrentArticle === undefined
    || parseInt(storage.sprCurrentArticle) > parseInt(storage.sprMaxArticle))
{
    storage.sprCurrentArticle = 0;
    console.log("sprCurrentArticle: " + storage.sprCurrentArticle);
}
if(storage.sprMaxArticle === undefined){
    storage.sprMaxArticle = 1;
}
if(storage.sprArticleStartPageArray === undefined){
    storage.sprArticleStartPageArray = [1];
}
if(storage.sprBackGroundColor === undefined){
    storage.sprBackGroundColor = "black";
}
if(storage.sprVersions === undefined){
    storage.sprVersions = JSON.stringify({
        default: "1"
    });
}
if(storage.sprBookObj === undefined){
    storage.sprBookObj = JSON.stringify({ default: null });
}
storage.sprSlidersAddtionalPageNum = 0;
// if(storage.sprSlidersAddtionalPageNum === undefined){
// }
// if(storage.sprScrollPermission === undefined){
//     storage.sprScrollPermission = "true";
// }