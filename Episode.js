class Episode {
    constructor(num, title, font, width, height) {
        this.id = num;
        this.title = title;
        this.startPage = 0;
        this.lines = [];
        this.pageObjs = [];
        this.maxWidth = width;
        // this.maxHeight = height;
        this.maxHeight = height;
        this.fontSize = font; // px
        this.rubyLineHeight = this.fontSize * 2; // px
        this.maxChars = Math.floor(this.maxWidth / this.fontSize);
        this.i = 0;
        this.remains = [];
    }
}