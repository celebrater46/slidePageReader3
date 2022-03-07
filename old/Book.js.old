class Book {
    constructor(num, title, dir) {
        this.id = num;
        this.title = title;
        this.chapters = [];
        this.subTitles = [];
        this.dir = dir;
        this.articles = [];
        this.currentArticle = 0;
        // this.texts = []; // .txt
    }

    async getChapters() {
        try{
            const response = await fetch(dir + "/books/" + this.dir + "/chapters.txt");
            const text = await response.text();
            const array = text.split("\n");
            const replaced = array.map((line) => {
                return line.replace("\r", "");
            });
            this.chapters = this.chapters.concat(replaced);
            return await response.text();
        } catch (error){
            console.log(error);
            this.chapters.push("none");
            return null;
        }
    }

    async getSubTitles() {
        try{
            const response = await fetch(dir + "/books/" + this.dir + "/subTitles.txt");
            const text = await response.text();
            const array = text.split("\n");
            return array.map((line) => {
                const str = line.replace("\r", "");
                const numNumtitle = str.split("|");
                const obj = {
                    "chapter": numNumtitle[0],
                    "file": numNumtitle[1],
                    "subTitle": numNumtitle[2]
                };
                this.subTitles.push(obj);
                return obj;
            });
            // return await response.text();
        } catch (error){
            console.log(error);
            this.subTitles.push("none");
            return null;
        }
    }

    async getAsyncText() {
        const chapters = await this.getChapters();
        const subTitles = await this.getSubTitles();
        console.log("From getAsyncText(): ");
        console.log(chapters); // succeeded
        console.log(subTitles); // succeeded
    }
}