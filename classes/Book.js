class Book {
    constructor(id) {
        this.id = id;
        this.title = null;
        this.chapters = null;
        this.subTitles = null;
        this.planeTexts = null;
        this.articles = [];
        this.defaultText = null;
        this.created = this.getUnixTime();
    }

    getUnixTime() {
        const date = new Date();
        return date.getTime();
    }

    getTitle(txt) {
        const title = txt.match(/<Title>(.*)<\/Title>/i);
        this.title = title[0].replace(/<Title>(.*)<\/Title>/i, "$1");
    }

    getChapters(txt) {
        const tempArray = txt.match(/<Chapter>(.*)<\/Chapter>/gi);
        let chapters = [];
        for(let i = 0; i < tempArray.length; i++){
            chapters.push(tempArray[i].replace(/<Chapter>(.*)<\/Chapter>/i, "$1"));
        }
        this.chapters = chapters;
    }

    getSubTitles(txt) {
        const tempArray = txt.match(/<Sub>(.*)<\/Sub>/gi);
        let subs = [];
        for(let i = 0; i < tempArray.length; i++){
            subs.push(tempArray[i].replace(/<Sub>(.*)<\/Sub>/i, "$1"));
        }
        this.subTitles = subs;
    }

    getTexts(txt) {
        let array = [];
        let replaced = txt.replace(/((\r\n)*|(\r)*|(\n)*)<Break(.*)\/>((\r\n)*|(\r)*|(\n)*)/gi, "#BR#");
        replaced = replaced.split("#BR#");
        for(let i = 0; i < replaced.length; i++){
            // let str = replaced[i].replace(/<Title>(.*)<\/Title>((\r\n)*|(\r)*|(\n)*)/gi, "");
            // array.push(str);
            array.push(replaced[i]);
        }
        this.defaultText = txt;
        this.planeTexts = array;
    }

    async init(txt){
        return await this.initPromise(txt);
    }

    initPromise(txt) {
        return new Promise(resolve => {
            this.getTitle(txt);
            this.getChapters(txt);
            this.getSubTitles(txt);
            this.getTexts(txt);
            resolve();
        });
    }

    async getArticles() {
        return await this.getArticlesPromise();
    }

    getArticlesPromise() {
        return new Promise(resolve => {
            let i = 0;
            this.planeTexts.map((text) => {
                this.articles.push(new Article(i, text));
                i++;
            });
            resolve();
        });
    }
}