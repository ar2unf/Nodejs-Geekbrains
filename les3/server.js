const http = require('http');
const url = require ('url');
http.createServer((req, res)=>{

    console.log(req.url);
const myQuery  = url.parse(req.url, true);

console.log(myQuery);

    //json
    res.writeHead(200, {
        'Content-Type':' application/json',
    });

    const message ={text_message: 'It is works!'};

    res.write(JSON.stringify(message));
    res.end();
}).listen(4000);

/** 
ДЗ скрипт который парсик что то с вашего сайта, что угодно
min вывести в консоль 
max вывод в браузер в Json
*/
