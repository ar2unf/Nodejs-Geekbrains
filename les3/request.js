//axiso, fetch(js), request -no js
const request =require( 'request');

request('https://www.npmjs.com/',(err,response, body)=>{
    if (!err && response.statusCode ===200){
        console.log(body);
    }else {
        console.log(err);
    }
})