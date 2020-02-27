const express = require('express');

const app = express();

const taskMySQL = require('./models/taskMysql');

//Для шаблонизатора
const consolidate = require('consolidate');
const path = require('path');

app.engine('hbs', consolidate.handlebars);
app.set('view engine', 'hbs');
app.set('views', path.resolve(__dirname, 'views'));

//For JSON
app.use(express.json());
//For forms - POST
app.use(express.urlencoded({extended: false}));


app.get('/tasks', async (req, res) => {
    const tasks = await taskMySQL.getAll();
    res.json(tasks);
});

app.post('/tasks', async (req, res) => {
    const idTask = await taskMySQL.addOne(req.body);
    res.json(idTask);
});

app.listen(4000, () => {
    console.log('Server works!');
});