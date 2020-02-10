//lesson1+ HW1
//node js
//"version": "1.0.0", //мажорная версия.минорная версия.патч

console.log ('hello node.js!');
//import-export - ES6+, require - CommonJS
const ansi= require('ansi');
// пробуем другой пакет
const clc = require("cli-color");
// пробуем звук
const beep = require('beepbeep');

//создем курсор
const cursor = ansi(process.stdout);


cursor
    .beep()
    .white() //collor
    .bg.green() //background
    .write('Hello WORLD!!')
    .reset() // сброс шрифта
    .bg.reset() // сброс bg
    .write('\n'); //пеоенос строки

    // тестим
    console.log(clc.red("Text in red"));
    beep(2,1000);
    process.stdout.write(clc.erase.lineLeft);

    // ДЗ
    //1. Доработать это скрипт
    //2. Взять похожую библиотеку и использовать её для изменения цвета шрифта
    // удалить папку node_moules
    /**
     * PHP
     * Количество библиотек =
     * Поддерживают все хостинги +
     * Более легкий в освоении +
     * Только под backend -
     * Линейное исполнение кода, перерасход ресурсов -
     * 
     * NODE
     * Количество библиотек = 
     * Поддерживают все хостинги (решение VPS) -
     * Более легкий в освоении -
     * Очень униврсальный язык +++
     * Ассинхронное выполнение кода, 1 процесс ++ (BIN2)
     * 
     * Быстрее ли Node.js чем PHP? Всегда ли быстрее и во сколько раз?
     * Быстрее,В зависимости от разработчика. в зависимости от кол-ва потоков, необходимы замеры.
     * 
     * Что быстрее Node.js из коробки?
     * Go (golang) (выбираем если фронт)
     * Python медленее
     * С++ выйграет 
     * Java медленне (но надо проверять)
     */



    