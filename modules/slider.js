const sliderDiv = document.getElementById("sliderDiv");
const slider = document.querySelector('input[name="pageSlider"]');
const pageNumP = document.getElementById("currentPageNum");

const changeSlider = () => {
    pageNumP.innerText = slider.value;
    scroll(slider.value, true);
}

const toggleSlider = () => {
    sliderDiv.classList.toggle("sliderIn");
}

const setSlidersMax = (num) => {
    slider.max = num;
}

slider.addEventListener("input", changeSlider);