class Yandex_news {

    constructor() {
        this.baseUrl = 'https://news.yandex.ru/';

        this.categories = {
            world: 'world',
            politics: 'politics',
        };
    }
    /**
     * Функция генерирует ссылку на получение новостей.
    */
    generateUrl(category) {
       // console.log(this.baseUrl + this.categories[category] + '.rss');
        return this.baseUrl + this.categories[category] + '.rss';
    }
    /**
     * Получение списка новостей.
     */
    getNews(link, quantity) {
        const request = require('sync-request');
        const parseString = require('xml2js').parseString;
        let data = {},
            res = request('GET', link);
        if (res.statusCode == 200) {
            let result = res.getBody();
            parseString(result, (err, result) => {
                data.title = result.rss.channel[0].title;
                let news = result.rss.channel[0].item.slice(0, quantity);
                data.data = [];
                for (let i = 0; i < news.length; ++i) {
                    let item = {
                        title: news[i].title,
                        description: news[i].description,
                        date: news[i].pubDate
                    };
                    data.data.push(item);
                }
            });
        }
        else {
            data.error = 'Error occurred while getting news';
        }
        return data;
    }
}
module.exports = Yandex_news;