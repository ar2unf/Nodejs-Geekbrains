const http =require('http');
const https=require('https');

// получить страницу
https.get ('https://www.npmjs.com/', (res)=>{
    console.log ('code response: ', res.statusCode);
    //charset result 
    //res.setEncoding('utf8');
    let content_data  ='';
    res.on('data', (chunk)=>{
        //console.log (chunk.toString());
        content_data+=chunk;
        // какой максимальный чанк
    });
    res.on ('end', function(){
        console.log('Finish');
        console.log (content_data);
    });
}).on ('error', (err)=>{
    console.log('Error:', err)
});