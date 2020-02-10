/**
 * Created by chentsu on 27.10.2016.
 */

var argv = require('minimist')(process.argv.slice(2));
var fs = require('fs');

var log_file = 'logs/log_coin';
var win=0;


if ( argv.help ) {
    console.log('\tUsage:\tnode coinGameStat.js [log_file]\n\tWhere:\log_file - path to the log file for analysis.\n\tIf the logFile is not specified uses ./logs/coinGameLog');
    process.exit();
}
else {
    if (argv._[0])
    log_file = argv._[0];

    if ( !fs.existsSync(log_file) ){
        console.log('Нет файлов ',log_file);
        process.exit();
    }

    var logs = fs.readFileSync(log_file).toString().replace(/\s+/g,'').slice(0,-1).split(','); // вырезает все служебные и пробельные символы, slice(0,-1) возвращает строку без последнего символа
    for ( var j=0; j<logs.length-2; j+=2)
    {
        if ( logs[j]===logs[j+1])
        win++;
    }

    
    console.log(`
        Сыграно ${logs.length/2} игр. 
        Всего побед ${win}, проигрышей ${logs.length/2-win}.
        Соотношения выйгрыш/проигрыш  ${win/((logs.length/2)-win)}.
        `);
}
