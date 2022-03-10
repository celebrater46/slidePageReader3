const headerDiv = document.getElementById("headerDiv");
const select = document.querySelector('select[name="articleSelector"]');

const toggleHeader = () => {
    headerDiv.classList.toggle("headerIn");
}

const changeArticle = () => {
    const array = storage.getItem("sprArticleStartPageArray").split(",");
    const key = parseInt(select.selectedIndex);
    const num = parseInt(array[key]);
    scroll(num, true);
    document.getElementById("pageSlider").value = num;
    document.getElementById("currentPageNum").innerText = num.toString();
    console.log("array: ");
    console.log(array);
    console.log("select.value: " + select.value);
    console.log("select.selectedIndex: " + select.selectedIndex);
    // console.log("array[select.value]: " + array[select.value]);
    // console.log("array[select.selectedIndex]: " + array[select.selectedIndex]);
    console.log("array[key]: " + array[key]);
    console.log("num: " + num);
}