"use strict";

const getAndInitStorage = (key) => {
    const value = storage.getItem(key);
    if(value === "NaN" || value < 1 || value === null || value === undefined){
        storage[key] = 1;
        return 1;
    } else {
        return parseInt(value);
    }
}

const getUrlParameterToArray = () => {
    const parameter = location.search;
    if(parameter !== ""){

    }
}

const init = () => {

    // const novelId = getAndInitStorage("sprNovelId");
    // const epId = getAndInitStorage("sprNovel1_EpisodeId");
}

localStorage.currentPage = 1;
