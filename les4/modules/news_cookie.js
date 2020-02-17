/**
 * Печеньки *_*
 */
class News_cookie {
    constructor() {
        this.cookie_name = 'news';
    }
    /**
     * Установим куки для сервиса
     *
     * @param queryParams
     * @param response
     */
    setCookie(queryParams, response) {
        let cookie_value = {
            'source': queryParams.source,
            'category': queryParams.category,
            'quantity': queryParams.quantity,
        };
        response.cookie(this.cookie_name, JSON.stringify(cookie_value), {expires: new Date(Date.now() + 900000)});
    }
    /**
     * Получим куки для сервиса
     *
     * @param request
     * @return {null}
     */
    getCookie(request) {
        if (request.cookies[this.cookie_name]) {
            return JSON.parse(request.cookies[this.cookie_name]);
        } else {
            return null;
        }
    }
}
module.exports = News_cookie;