const request = require( 'request' );
const readline = require( 'readline' );
//api_key
const _API_KEY ='trnsl.1.1.20200213T181905Z.3a4a39b9c63249f4.dd52300c0d98954906b636938e976da121553e7a'

const rl = readline.createInterface( {
    input: process.stdin,
    output: process.output,
} );

console.log( `\nКОНСОЛЬНЫЙ ПЕРЕВОДЧИК! \n
Введите текст на английском. Для выхода введите "выход"\n` );
//поехали
rl.on( 'line', ( text ) => {
    
    if ( text === 'выход' ) {
        console.log( 'Пока!' );
        rl.close();
        return
    }
    // ждем выполнения с помощью промиса
    const req_ya_translate = new Promise( ( resolve, reject ) => {
        let _URL =`https://translate.yandex.net/api/v1.5/tr.json/translate?key=${_API_KEY}&text=${text }&lang=en-ru`
        request( _URL, ( err, response ) => {
            if ( !err && response.statusCode === 200 ) {
                resolve( response );
            } else {
                reject( 'Ошибка получения запроса!' )
            }
        } );
    } );
    // если успешно то
    req_ya_translate.then(
        ( response ) => {
            console.log( `\nВаш перевод:` );
            let translation = JSON.parse( response.body );
            console.log( translation.text[ 0 ] );
            console.log( `\nВведите текст на английском для перевода на русский. Для выхода введите "выход"\n` );
        },
        ( data ) => {
            console.log( data );
        },
    );
} );