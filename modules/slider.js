const slider = document.querySelector('input[name="pageSlider"]');
const pageNumP = document.getElementById("currentPageNum");

const changeSlider = () => {
    console.log(slider.value);
    pageNumP.innerText = slider.value;
    scroll(slider.value, true);
}

const setSlidersMax = (num) => {
    slider.max = num;
}

slider.addEventListener("input", changeSlider);