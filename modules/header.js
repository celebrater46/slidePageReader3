const headerDiv = document.getElementById("headerDiv");
const selectColor = document.querySelector('select[name="colorSelector"]');
const selectArticle = document.querySelector('select[name="articleSelector"]');

const toggleHeader = () => {
    headerDiv.classList.toggle("headerIn");
}

const getColors = (bgColor) => {
    switch (bgColor){
        case "black": return ["black", "silver"];
        case "white": return ["white", "black"];
        case "beige": return ["#fedcbb", "#443322"];
        default: return ["#333", "silver"];
    }
}

const changeColor = () => {
    const value = selectColor.value;
    const colors = getColors(value)
    const body = document.querySelector("body");
    body.style.backgroundColor = colors[0];
    body.style.color = colors[1];
    headerDiv.style.backgroundColor = colors[0];
    sliderDiv.style.backgroundColor = colors[0];
    pageNumP.style.backgroundColor = value === "beige" ? "white" : colors[0];
    pageNumP.style.color = colors[1];
    // document.querySelectorAll("div.page").style.backgroundColor = selectColor.value;
    console.log("changed color.");
    console.log("changed color.");
}

const changeArticle = () => {
    const array = storage.getItem("sprArticleStartPageArray").split(",");
    const key = parseInt(selectArticle.selectedIndex);
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