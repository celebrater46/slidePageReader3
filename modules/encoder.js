const convertDot = (line) => {
    let str = line;
    let i = 0;
    while(str.search(/《《[^》]+》》/) > -1){
        const chars = str.match(/《《[^》]+》》/);
        let converted = "";
        for(let j = 2; j < chars[0].length - 2; j++){ // match() returns not String but Array
            converted += "<ruby><rb>";
            converted += chars[0].substr(j, 1);
            converted += "</rb><rp>(</rp><rt>・</rt><rp>)</rp></ruby>";
        }
        str = str.replace(/《《[^》]+》》/, converted);
        i++;
        if(i > 1000){
            break;
        }
    }
    return str;
}

const encodeRuby = (line) => {
    const dotConverted = convertDot(line);
    if(dotConverted.indexOf("｜") > -1){
        return dotConverted.replace(
            /｜([^《]+)《([^》]+)》/g,
            "<ruby><rb>$1</rb><rp>(</rp><rt>$2</rt><rp>)</rp></ruby>"
        );
    }
    return dotConverted;
}

const decodeRuby = (line) => {
    let str = line;
    if(str.indexOf("<ruby><rb>") > -1) {
        str = str.replace(
            /<ruby><rb>([^\x01-\x7E]+)<\/rb><rp>\(<\/rp><rt>([^\x01-\x7E]+)<\/rt><rp>\)<\/rp><\/ruby>/g,
            "｜$1《$2》"
        );
        return str;
    }
}