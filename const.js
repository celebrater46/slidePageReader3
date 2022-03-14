const fontSizeArray = [16, 20, 24, 28];
const storage = localStorage;

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
// if(storage.sprArticleStartPageArray === undefined){
//     storage.sprArticleStartPageArray = [1];
// }
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