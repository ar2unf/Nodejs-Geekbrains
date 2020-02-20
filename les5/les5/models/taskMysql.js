const mysql = require('mysql');
//user=root
//password=1q2w3e4r5t6y7!
//port=3306

//Вариант 1. 
// const connection = mysql.createConnection({
//     host: 'localhost',
//     database: 'task',
//     user: 'root',
//     password: '***',
// });

// connection.connect((err) => {
// connection.query()
// });

//Вариант 2
const pool = mysql.createPool({
    host: 'localhost',
    database: 'test',
    user: 'root',
    password: '1q2w3e4r5t6y7!',
    port: 3306,

    connectionLimit: 5, //Кол-во одновременных соединений
    waitForConnections: true, //false - вернется ошибка
});

class Task {
    static getAll(){
        return new Promise((resolve, reject) => {
            pool.getConnection((err, connection) => {
                if(err){
                    reject(err);
                }

                //SELECT
                pool.query('SELECT * FROM task', (err, rawRows) =>{
                    if(err){
                        reject(err);
                    }

                    const rows = JSON.parse(JSON.stringify(rawRows));

                    //Обязательно! Возвращаем соединение в pool
                    connection.release();
                    resolve(rows);
                });
            });
        });
    }

    static addOne(task){
        return new Promise((resolve, reject) => {
            pool.getConnection((err, connection) => {
                if(err){
                    reject(err);
                }

                //INSERT
                pool.query(
                    'INSERT INTO `task` SET ?', //Подготовленный запрос
                    task, //Данные
                    (err, result) =>{
                    if(err){
                        reject(err);
                    }

                    //Обязательно! Возвращаем соединение в pool
                    connection.release();
                    resolve(result.insertId);
                });
            });
        });
    }
}

module.exports = Task;