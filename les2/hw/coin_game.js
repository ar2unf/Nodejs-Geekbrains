/**
 * Орел/решка с записью лога
 */

let goLog = false;
let log_file='logs/log_coin';
const argv = require('minimist')(process.argv.slice(2));
const fs = require('fs');
const red_line = require('readline');
const rl=red_line.createInterface({
    input: process.stdin,
    output: process.stdout
});

if ( argv.help) {
    rl.write(`
        Испоьзуй: node coin_game.js --log 
        Где: --log - запишет лог в  logs/log_coin
        log_coin - имя файла логов`);
    rl.close();
}
else {
    if (argv.log){
        goLog=true;
        if ( !fs.statSync('./logs').isDirectory())
            fs.mkdir('./logs',function (err) {if (err)throw 'Папка не созадана: '+err;});
    }
    if(argv._[0]){ goLog=true; log_file=argv._[0];}

    rl.write(`Орел или Решка?. Введите 1(орёл) или 2(решка). 0 - выход из программы.`);

    rl.on('line', function (inpt) {
        var coin=1+Math.round(Math.random());
        inpt = parseInt(inpt);
        if (inpt===1 || inpt===2)
        {
            if (inpt === coin)
                console.log('Победа!');
            else
                console.log('Поражение...');

            if ( goLog ) {
                fs.appendFile(log_file, coin + ',' + inpt + ',', function (err) {
                    if (err) throw 'Не могу открыть для записи файл: ' + err;
                });
            }
        }else if (inpt===0)
            this.close();
        else
            console.log(`1(орёл) или 2(решка). 0 - выход из программы.`);
    });
}