const fs =require('fs');
const buff = fs.readFileSync(__dirname + '/buff.txt');
console.log (buff.byteLength);