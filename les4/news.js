/**стартовая страница http://localhost:4000/news */
const express = require('express'),
    consolidate = require('consolidate'),
    bodyParser = require('body-parser'),
    handlebars = require('handlebars'),
    cookieParser = require('cookie-parser'),
    NewsFactory = require('./modules/news_Factory'),
    NewsCookie = require('./modules/news_cookie'),
    request = require('request'),
    app = express();
const newsSources = [
        'yandex', 'rambler'
    ],
    ruNewsSources = {
        yandex: "Яндекс",
        rambler: "Рамблер"
    },
    quantity = [
        5, 10, 15
    ],
    categories = [
        'world', 'politics'
    ],
    newsTitles = {
        world: 'В мире',
        politics: 'Политика',
    };

app.engine('hbs', consolidate.handlebars);
app.set('views', './views');
app.set('view engine', 'hbs');

app.use(cookieParser());

/**
 * Парсим тело POST-запроса с настройками для получения новостей.
 */
app.use(bodyParser.urlencoded({
    extended: true
}));

/**
 * Возвращает русское название сервиса новостей.
 * Используется в шаблонах.
 */
handlebars.registerHelper('getSourceTitle', function(source) {
    return ruNewsSources[source];
});

/**
 * Возвращает русское название категории новостей.
 * Используется в шаблонах.
 */
handlebars.registerHelper('getCategoryTitle', function(category) {
    return newsTitles[category];
});

/**
 * Возвращает список новостей согласно настройкам списка.
 *
 * @param params
 * @return {{sourceName: *, news: *}}
 */
function getNews(params) {
    let service = params.source,
        category = params.category,
        quantity = params.quantity;

    let newsService = new NewsFactory(service),
        link = newsService.generateUrl(category),
        news = newsService.getNews(link, quantity);

    return {
        sourceName: ruNewsSources[service],
        news: news
    };
}

/**
 * настройка выдачи
 * при первом запросе на 15 минут сохраняются в куку.
 * действовуют 15 минут, пока кука не протухнет.
 * после этого пользователь сможет сделать новую выборку... либо очистить куки в режиме разработчика
 */
app.get('/', (request, response) => {
        response.render('news_settings', {
            title: 'Настройка вывода новостей',
            sources: newsSources,
            quantity: quantity,
            categories: categories
        });
});

/**
 * Новости
 */
app.get('/news', (request, response) => {

    let cookie = new NewsCookie();
    let result = {};
    console.log("1"+cookie);

    let newsCookie = cookie.getCookie(request);
    if (newsCookie) {
        result = getNews(newsCookie);
        console.log("2"+newsCookie);
    }
    else if (request.query.source && request.query.quantity && request.query.category) {
        console.log("3"+newsCookie);
        result = getNews(request.query);
        cookie.setCookie(request.query, response);
        console.log("4"+newsCookie);
    }
    else {
        response.redirect('/');
    }

    response.render('news', {
        sourceName: result.sourceName,
        news: result.news
    });
});

/**
 * Обрабатывает POST-запрос.
 * Получение новостей в зависимости от переданных настроек:
 */
app.post('/news/receive', (request, response) => {
    response.json(getNews(request.body));
});

app.listen(4000);