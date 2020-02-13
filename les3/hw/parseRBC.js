const request = require('request');
const cheerio = require('cheerio');
const http = require('http');
const url = require('url');
const _URL ='https://vo.rbc.ru/';
let message = []; //массив новостей


/**
 * функция возвращает промис запроса новостей
 */
function get_news() {
    return new Promise((res, rej) => {
        request(_URL, (err, response, html) => {
            message = [];
            console.log(response.statusCode);
            if (!err && response.statusCode === 200) {
                const $ = cheerio.load(html);
                // попутно выводим в консоль
                console.log(`\nОСНОВНАЯ НОВОСТЬ:`);
                console.log(`${$('.main__big__title').text()}`);
                message.push({
                    main_news: `${$('.main__big__title').text()}`
                })
                //console.log(`Новостной блок:`);
                for (let i = 0; i < $('.main__feed__title').length; i++) {
                    message.push({
                        sub_news: `${i+1}. ${$('.news-feed__item__title').eq(i).text().trim().replace(/[\s{2,}]+/g, ' ')}`
                    });
                    console.log(message[i]);
                    console.log(`${i+1}. ${$('.news-feed__item__title').eq(i).text().trim()}`);
                }
            }
            res(message);
        });
    })
}
// стартуем сервер
http.createServer((req, res) => {
    console.log(req.url);
    const myQuery = url.parse(req.url, true);
    console.log(myQuery);

    get_news()
        .then(message => {
            console.log(message);
            res.writeHead(200, {
                'Content-Type': ' application/json',
            });
            res.write(JSON.stringify(message));
            res.end();
        });

}).listen(4000);