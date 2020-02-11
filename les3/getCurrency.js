// парсим сайт банки ру
const cheerio = require('cheerio');
//https://www.banki.ru/products/currency/
const request = require ('request');


request('https://www.banki.ru/products/currency/' , (err, response, body)=>{
    if (!err && response.statusCode ===200){
        const $ = cheerio.load(body);

        const result_usd_currency = $('.cb-current-rates__list__item')
            .eq(0)
            .find('td')
            .eq(1)
            .text();

            console.log( 'currency now: ', result_usd_currency);
    }
})