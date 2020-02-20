const express = require('express');
const mongoose = require('mongoose');
const taskMongoose = require('./models/taskMongo');

//Connect
mongoose.connect('mongodb://localhost:32774/tasks', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const app = express();

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
    const tasks = await taskMongoose.find();
    res.json(tasks);
});

app.post('/tasks', async (req, res) => {
    const task = new taskMongoose(req.body);
    const taskAfterSave = await task.save();
    res.json(taskAfterSave);
});

app.listen(4000, () => {
    console.log('Server works!');
});