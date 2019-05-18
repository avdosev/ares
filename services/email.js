'use strict';
const nodemail = require('nodemailer');
const config = require("../config/server")

module.exports = (email, subject, message) => {
    
    let info = {
        from: '"Metida company 👻"',
        to: email,
        subject: subject, //заголовок
        html: message
    };
    nodemail.createTransport({ //посмотрим, сработает ли на проде
        service: 'smtp.ethereal.email',
        secure: true,
        port: 587, 
        auth: {
            user: config.supportEmail,
            pass: config.password
        }
    }).sendMail(info).then((err, logs) => {
        if (err) {
            console.log(err);
        }
        console.log(logs)
    }).catch(err => {
        console.error(err)
    });
}

