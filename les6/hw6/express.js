const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);

//Connect
mongoose.connect('mongodb://localhost:27017/tasks', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const taskMongoose = require('./models/task');
const userMongoose = require('./models/user');
const passport = require('./passport');

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

//Сессии и авторизация
app.use(session({
    resave: true,
    saveUninitialized: false,
    secret: 'gsdfhsdafgasdfhdsffdsa',
    store: new MongoStore({mongooseConnection: mongoose.connection}),
}));


app.use(passport.initialize);
app.use(passport.session);

//Secure
app.use('/tasks', passport.mustAuth);


app.get('/tasks', async (req, res) => {
    const {_id} = req.user;
    let tasks = await taskMongoose.find({user: _id});
    tasks = JSON.parse(JSON.stringify(tasks)); 
    res.render('tasks', {tasks});
});

app.post('/tasks', async (req, res) => {
    const {_id} = req.user;
    const task = new taskMongoose({...req.body, user: _id});
    await task.save();
    res.redirect('/tasks');
});

app.get('/tasks/:id', async (req, res) => {
    const task = await taskMongoose.findById(req.params.id);
    res.render('task', task);
});

app.post('/tasks/update', async (req, res) => {
    const {id, title} = req.body;
    await taskMongoose.updateOne({_id: id}, {$set: {title}});
    res.redirect('/tasks');
});

app.post('/tasks/remove', async (req, res) => {
    const {id} = req.body;
    await taskMongoose.findByIdAndRemove(id);
    res.redirect('/tasks');
});

app.post('/tasks/complete', async (req, res) => {
    const {id} = req.body;
    await taskMongoose.updateOne({_id: id}, {$set: {completed: true}});
    res.redirect('/tasks');
});

app.get('/registration', (req, res) => {
    res.render('register');
});

app.post('/registration', async (req, res) => {
    const {repassword, ...restBody} = req.body;
    if(restBody.password === repassword){
        const user = new userMongoose(restBody);
        await user.save();
        res.redirect('/auth');
    } else {
        res.redirect('/auth?err=err1');
    }
    
});

app.get('/auth', (req, res) => {
    const {error} = req.query;
    res.render('auth', {error});
});

//TODO
app.post('/auth', passport.autenticate);

app.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/auth');
});

app.listen(4000, () => {
    console.log('Server works!');
});