const yandex_news = require('./yandex_news');
const rambler_news = require('./rambler_news');
/**
 * Класс для получения инстанса сервиса новостей.
 */
class News_factory {
    constructor(service) {
        this.service = News_factory.getServiceInstance(service);
        return this.service;
    }
    static getServiceInstance(service) {
        let instance;
        switch (service) {
            case 'yandex':
                instance = new yandex_news();
                break;
            case 'rambler':
                instance = new rambler_news();
                break;
        }
        return instance;
    }
}
module.exports = News_factory;