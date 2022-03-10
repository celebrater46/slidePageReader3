const div = document.getElementById("sliderDiv");
const slider = document.querySelector('input[name="pageSlider"]');
const pageNumP = document.getElementById("currentPageNum");

const changeSlider = () => {
    // console.log(slider.value);
    pageNumP.innerText = slider.value;
    scroll(slider.value, true);
}

const togglePanel = () => {
    // console.log("did togglePanel()");
    div.classList.toggle("in");
    // console.log("classList toggled");
    // console.log(slider.classList);
    // if(slider.classList.contains('in')){
    //     slider.classList.remove("in");
    //     console.log("class removed");
    //     console.log(slider.classList);
    // } else {
    //     slider.classList.add("in");
    //     console.log("class added");
    //     console.log(slider.classList);
    // }
}

const setSlidersMax = (num) => {
    slider.max = num;
}

slider.addEventListener("input", changeSlider);