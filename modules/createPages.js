"use strict";

const scale = document.getElementById("scale");
const container = document.getElementById("containter")
const scale_p_ruby = document.getElementById("scale_p_ruby");
const rubyLineWidth = scale_p_ruby.clientWidth; // 一行の高さ（ルビあり）
const maxWidth = scale.clientWidth; // 縦書きの場合は反転
const maxHeight = scale.clientHeight;
const fontSizeNum = parseInt(storage.sprFontSize);
const fontSize = fontSizeArray[fontSizeNum];
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
const getNumOfDeletedCharsByKinsokuOneLine = (line, max) => {
    const char = line.substr(max - 1, 1);
    const next = line.substr(max, 1);
    if(char.search(/[「『（《〈【〚［〔｛]/) > -1){
        return 1;
    } else if(char === "―") {
        if(line.substr(max, 1) === "―"){
            return 1;
        }
    } else if(char === "…") {
        if(line.substr(max, 1) === "…"){
            return 1;
        } else if(line.substr(max - 1, 1) === "…"){
            return 2;
        }
    } else if(next.search(/[、。・」』）》〉】〛］〕｝！？ぁぃぅぇぉゃゅょっァィゥェォャュョッ]/) > -1){
        return 1;
    }
    return 0;
}

const getNumOfDeletedCharsBykinsoku = (max, line) => {
    let sum = 0;
    let remains = line;
    const lines = max / maxChars;
    for(let i = 0; i < lines; i++){
        const num = getNumOfDeletedCharsByKinsokuOneLine(remains, maxChars);
        remains = remains.substr(maxChars - num);
        sum += num;
    }
    return sum;
}

const separateFinalLine = (line, remainLines) => {
    const hasRuby = line.indexOf("<ruby>");
    const max = maxChars * remainLines;
    if(hasRuby > -1 && hasRuby < max){
        // ルビが１行内にあるなら、新しい改行ポイント indexOf を取得
        const lineBreak = getIndexOfLineBreak(line, remainLines);
        const kinsoku = getNumOfDeletedCharsByKinsokuOneLine(line, lineBreak);
        const kinsoked = lineBreak - kinsoku;
        // １行で収まりきらない場合は分割
        if(line.length > kinsoked){
            return [line.substr(0, kinsoked), line.substr(kinsoked)];
        }
    } else {
        const kinsoku = getNumOfDeletedCharsBykinsoku(max, line);
        const kinsoked = max - kinsoku;
        if(line.length > kinsoked){
            const line1 = line.substr(0, kinsoked);
            const line2 = line.substr(kinsoked);
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
        && array[1] !== null)
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

const brSplitOrNot = (str, br) => {
    if(br === ""){
        return [str];
    } else {
        return str.split(br);
    }
}

const createPage = (i, remainText) => new Promise(resolve => {
    let page = new Page(i);
    const encoded = encodeRuby(remainText);
    const br = checkBrCode(encoded);
    const lines = brSplitOrNot(encoded, br);
    let outer = document.createElement("div");
    outer.classList.add("page");
    let pageDiv = document.createElement("div");
    outer.appendChild(pageDiv);
    container.appendChild(outer);
    const scaleP = document.getElementById("scale_p");
    pageDiv.id = "p-" + i;
    let currentWidth = 0;
    let finalLine = null;
    for(let j = 0; j <= lines.length; j++){
        const line = lines[j] === "" ? "　" : lines[j];
        scaleP.innerHTML = line;
        if(currentWidth < maxWidth && line !== undefined){
            let p = document.createElement("p");
            p.innerHTML = line;
            pageDiv.appendChild(p);
            page.lines.push(p);
            currentWidth += scaleP.clientWidth;
        } else {
            finalLine = j - 1;
            break;
        }
    }

    if(finalLine !== null){
        if(pageDiv.lastElementChild){
            pageDiv.lastElementChild.remove(); // はみ出した最後の一行を削除
        }
        page.lines.pop();
        const remainWidth = maxWidth - pageDiv.clientWidth;
        let newLines = lines.slice(finalLine);
        if(remainWidth >= rubyLineWidth){
            newLines.shift();
            const array = separateFinalLine(
                lines[finalLine],
                Math.floor(remainWidth / rubyLineWidth)
            );
            const additionalArray = getAdditionalStr(remainWidth, array);
            let finalP = document.createElement("p");
            finalP.innerHTML = array[0] + additionalArray[0];
            pageDiv.appendChild(finalP);
            page.lines.push(finalP);
            if(additionalArray[1] !== null){
                newLines.unshift(additionalArray[1]);
            }
        }
        resolve(newLines.join("\n"));
    } else {
        addFinalClass();
        resolve("");
    }
});

let i = 0;
const asyncCreatePages = async(str) => {
    const remain = await createPage(i, str);
    if(remain.length > 0){
        if(i > 10000){
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
