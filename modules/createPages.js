"use strict";

const scale = document.getElementById("scale");
const container = document.getElementById("containter")
// const isX = false; // 横書きなら true
const scale_p_ruby = document.getElementById("scale_p_ruby");
// const rubyLineHeight = isX ? scale_p_ruby.clientHeight : scale_p_ruby.clientWidth; // 一行の高さ（ルビあり）
const rubyLineWidth = scale_p_ruby.clientWidth; // 一行の高さ（ルビあり）
// const maxWidth = isX ? scale.clientWidth : scale.clientHeight; // 縦書きの場合は反転
// const maxHeight = isX ? scale.clientHeight : scale.clientWidth;
const maxWidth = scale.clientWidth; // 縦書きの場合は反転
const maxHeight = scale.clientHeight;
// const checkIsPhone = () => {
//     const agent = navigator.userAgent;
//     if ((agent.indexOf('iPhone') > 0 && agent.indexOf('iPad') == -1)
//         || agent.indexOf('iPod') > 0
//         || agent.indexOf('Android') > 0)
//     {
//         return true;
//     } else {
//         return false;
//     }
// }
// const isPhone = checkIsPhone();
const fontSizeNum = parseInt(storage.sprFontSize);
const fontSize = fontSizeArray[fontSizeNum];
// const maxChars = Math.floor(maxWidth / fontSize); // 1行あたりの最大文字数
const maxChars = Math.floor(maxHeight / fontSize); // 1行あたりの最大文字数

const getIndexOfLineBreak = (encodedLine, remainLines) => {
    const scaleTest = document.getElementById("scaleTest");
    scaleTest.innerHTML = "";
    const maxWidth = rubyLineWidth * remainLines;
    let str = encodedLine;
    let num = 0;
    while(true){
        if(str.substr(num, 6) === "<ruby>") {
            // ルビタグの抽出
            const ruby = str.match(/<ruby><rb>([^\x01-\x7E]+)<\/rb><rp>\(<\/rp><rt>([^\x01-\x7E]+)<\/rt><rp>\)<\/rp><\/ruby>/);
            scaleTest.innerHTML += ruby[0];
            // const pWidth = isX ? scaleTest.clientHeight : scaleTest.clientWidth;
            const pWidth = scaleTest.clientWidth;
            if(pWidth > maxWidth){
                return Math.floor(num);
            } else {
                num += ruby[0].length; // 本来一文字先に進むところを、ルビならルビタグ全体分進める
            }
            str = str.replace("<ruby>", "<xxxx>"); // 現在のルビタグの無効化
        } else {
            scaleTest.innerHTML += str.substr(num, 1);
            const pWidth = scaleTest.clientWidth;
            // const pHeight = isX ? scaleTest.clientHeight : scaleTest.clientWidth;
            if(pWidth > maxWidth){
                return Math.floor(num);
            } else {
                num++;
            }
        }
        if(num > str.length){
            return Math.floor(num);
        }
        if(num > 5000){
            console.log("endless loop occurred");
            return -1; // 無限ループエラー対策
        }
    }
}

// 禁則処理によって排除される文字数を算出
const getNumOfDeletedCharsByKinsokuOneLine = (line) => {
    const char = line.substr(maxChars - 1, 1);
    const next = line.substr(maxChars, 1);
    if(char.search(/[「『（《〈【〚［〔｛]/) > -1){
        return 1;
    } else if(char === "―") {
        if(line.substr(maxChars, 1) === "―"){
            return 1;
        }
    } else if(char === "…") {
        if(line.substr(maxChars, 1) === "…"){
            return 1;
        } else if(line.substr(maxChars - 1, 1) === "…"){
            return 2;
        }
    } else if(next.search(/[、。」』）》〉】〛］〕｝]/) > -1){
        return 1;
    }
    return 0;
}

const getNumOfDeletedCharsBykinsoku = (line) => {
    let sum = 0;
    let remains = line;
    let i = 0;
    while(remains.length > 0){
        const num = getNumOfDeletedCharsByKinsokuOneLine(remains);
        remains = remains.substr(maxChars - num);
        sum += num;

        // 無限ループ対策
        if(i > 1000){
            console.log("endless loop occurred");
            break;
        }
    }
    return sum;
}

const separateFinalLine = (line, remainLines) => {
    // console.log("line in separageFinalLine: " + line);
    const hasRuby = line.indexOf("<ruby>");
    const max = maxChars * remainLines;
    // console.log("maxChars: " + maxChars);
    if(hasRuby > -1 && hasRuby < max){
        // ルビが１行内にあるなら、新しい改行ポイント indexOf を取得
        const lineBreak = getIndexOfLineBreak(line, remainLines);
        // １行で収まりきらない場合は分割
        if(line.length > lineBreak){
            return [line.substr(0, lineBreak), line.substr(lineBreak)];
        }
    } else {
        if(line.length > max){
            const kinsoku = getNumOfDeletedCharsBykinsoku(line);
            const line1 = line.substr(0, max - kinsoku);
            const line2 = line.substr(max - kinsoku);
            return [line1, line2];
        }
    }
    return [line, null];
}

// 最終行が複数行の場合、一度テスト用のPタグに入れて実測
const getTruePHeight = (line) => {
    let scaleP = document.getElementById("scale_p");
    scaleP.innerHTML = line;
    return scaleP.clientHeight;
}

// 実測した最終行が空きスペースより1行以上少ない場合、追加分を再取得
const getAdditionalStr = (remainWidth, array) => {
    const trueWidth = getTruePHeight(array[0]);
    const remainLines = remainWidth - trueWidth;
    if(remainLines > rubyLineWidth
        && array[1].length > 0)
    {
        // 実測した最終行が空きスペースより1行以上少ない場合、追加分を再取得
        return separateFinalLine(
            array[1],
            Math.floor(remainLines / rubyLineWidth)
        );
    } else {
        return ["", array[1]];
    }
}

const addFinalClass = () => {
    const lastPage = container.lastElementChild;
    lastPage.classList.add("final");
}

const checkBrCode = (str) => {
    if(str.indexOf("\r\n") > -1){
        return "\r\n";
    } else if(str.indexOf("\n") > -1){
        return "\n";
    } else if(str.indexOf("\r") > -1){
        return "\r"
    } else {
        return "";
    }
}

// let pages = [];
const createPage = (i, remainText) => new Promise(resolve => {
    // console.log("remainText: " + remainText);
    // pages.push(new Page(i));
    let page = new Page(i);
    const encoded = encodeRuby(remainText);
    const br = checkBrCode(encoded);
    let lines = "";
    if(br !== ""){
        // pages[i].lines = encoded.split(br);
        lines = encoded.split(br);
    }
    let outer = document.createElement("div");
    outer.classList.add("page");
    let pageDiv = document.createElement("div");
    outer.appendChild(pageDiv);
    container.appendChild(outer);
    const scaleP = document.getElementById("scale_p");
    pageDiv.id = "p-" + i;
    // let currentHeight = 0; // 縦書きの時は横幅を意味する
    let currentWidth = 0;
    let finalLine = null;
    // for(let j = 0; j < pages[i].lines.length; j++){
    for(let j = 0; j < lines.length; j++){
        // let line = pages[i].lines[j];
        const line = lines[j] === "" ? "　" : lines[j];
        console.log("line: " + line);
        // let line = lines[j];
        // line = line === "" ? "　" : line;
        scaleP.innerHTML = line;
        // currentWidth += scaleP.clientWidth;
        // if(currentHeight < maxHeight){
        // console.log("scaleP.clientWidth:maxWidth " + scaleP.clientWidth + " : " + maxWidth);
        console.log("currentWidth:maxWidth " + scaleP.clientWidth + " : " + maxWidth);
        // if(currentWidth < maxWidth && scaleP.clientWidth < maxWidth){
        if(currentWidth < maxWidth){
            let p = document.createElement("p");
            p.innerHTML = line;
            pageDiv.appendChild(p);
            page.lines.push(p);
            // const pHeight = isX ? scaleP.clientHeight : scaleP.clientWidth;
            // currentHeight += pHeight;
            currentWidth += scaleP.clientWidth;
        } else {
            finalLine = j - 1;
            // finalLine = j > 0 ? j - 1 : 0;
            // finalLine = j;
            break;
        }
    }
    console.log("finalLine: " + finalLine);

    if(finalLine !== null){
        // console.log("pageDiv.lastElementChild: ");
        // console.log(pageDiv.lastElementChild);
        if(pageDiv.lastElementChild){
            pageDiv.lastElementChild.remove(); // はみ出した最後の一行を削除
        }
        page.lines.pop();
        // const pageHeight = isX ? pageDiv.clientHeight : pageDiv.clientWidth;
        // const remainHeight = maxHeight - pageHeight;
        const pageWidth = pageDiv.clientWidth;
        const remainWidth = maxWidth - pageWidth;
        // let lines = pages[i].lines.slice(finalLine);
        let newLines = lines.slice(finalLine);
        // if(remainHeight >= rubyLineHeight){
        console.log("remainWidth : rubyLineWidth ");
        console.log(remainWidth + ":" + rubyLineWidth);
        if(remainWidth >= rubyLineWidth){
            newLines.shift();
            // const i = finalLine >= 0 ? finalLine : 0;
            const array = separateFinalLine(
                // pages[i].lines[finalLine],
                lines[finalLine],
                // lines[i],
                // Math.floor(remainHeight / rubyLineHeight)
                Math.floor(remainWidth / rubyLineWidth)
            );
            console.log("separated array:");
            console.log(array);
            const additionalArray = getAdditionalStr(remainWidth, array);
            let finalP = document.createElement("p");
            finalP.innerHTML = array[0] + additionalArray[0];
            pageDiv.appendChild(finalP);
            page.lines.push(finalP);
            if(additionalArray[1] !== null){
                newLines.unshift(additionalArray[1]);
            }
        }
        // console.log("newLines: ");
        // console.log(newLines);
        resolve(newLines.join("\n"));
    } else {
        addFinalClass();
        resolve("");
    }
});

let i = 0;
// let remains = "";
const asyncCreatePages = async(str) => {
    const remain = await createPage(i, str);
    // console.log("remains: " + remains);
    // console.log("pages:");
    // console.log(pages);
    if(remain.length > 0){
        if(i > 100){
            // 無限ループ対策
            console.log("endless loop occurred!");
        } else {
            i++;
            await asyncCreatePages(remain);
        }
    }
}

const addTitlePage = (str, num) => new Promise(resolve => {
    let divPage = document.createElement("div");
    divPage.classList.add("page");
    let divPageChild = document.createElement("div");
    let h = document.createElement("h" + num);
    h.innerText = str;
    divPageChild.appendChild(h);
    divPage.appendChild(divPageChild);
    container.appendChild(divPage);
    resolve();
});
