const nodemailer = require('nodemailer');
const smtp_tarnsport = nodemailer.createTransport({
    host: 'localhost',
    port: null,
    secure: false, // принудительно порт 465 если true
    auth: {
        user: 'mail@mail.comlocal',
        pass: '***',
    }
});

smtp_tarnsport.sendMail({
    from: 'user_name <mail@mail.comlocal>',
    to: 'Anothe_user <anothemail@mail.comlocal>',
    subject: 'test_message',
    text: 'Hi! it is test msg',
    html: '<h1>hI! How are You</h1> '// лучше таблицами
}, (err, info)=>{
    if(err){
        console.log( 'error!');
        throw err;
    }
    console.log ('mail sended');

    smtp_tarnsport.close(); // если не планируем больше отправлять писем
});