const express = require('express')
const config = require('../config')

const {
    userCreateValidator,
    userLoginValidator,
    articleValidator
} = require('../services/validator');

const bodyParser = require('body-parser');

const Handler = require('../controllers/request_handler')
const Response = require('../controllers/respondent')

//  проверка логирования
const { isLoggedIn, loggedCheker } = require('../controllers/logged.js');

const Pages = require('./pages')()
const ApiRouter = require('./api')()

const Debug = require('../controllers/debug');

const initAuthControllers = (app, passport) => {
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json());
    const urlencodedParser = bodyParser.urlencoded({ extended: false });

    // -- PAGES --

    app.get('/*', Pages)

    // -- API --

    app.get('/api', ApiRouter)

    // -- ARTICLES API -- 
    
    app.get('/post/:id/non_parsed', Handler.getArticle, Response.jsonValue('article'));
    app.post('/post/:id/update', Handler.updateArticle, Response.jsonValuesWith(['success']))
    app.post('/post/:id/delete', loggedCheker, /* проверка на владельца статьи или админа */ Handler.removeArticle, Response.jsonValuesWith(['success']))
    app.post('/top', urlencodedParser, Handler.getTopArticles, Response.jsonValue('TopArticles'))
    app.post('/createArticle', isLoggedIn, urlencodedParser, articleValidator, /* отправить на модерацию */ Handler.pushArticle, Response.redirectToArticle);
    
    // - COMMENTS API - по идее это часть апи предыдущего но я решил вынести это в отдельный блочок
    
    app.get('/post/:id/comments', urlencodedParser, Handler.getComments, Response.jsonValue("comments"));
    app.post('/post/:id/pushComment', isLoggedIn, urlencodedParser, Handler.pushComment, Response.jsonValuesWith(['success']));
    
    // -- FILE API --

    app.use('/public',  express.static(config.mainDir + '/public' ));

    // -- EMAIL API -- // TO DO

    app.post("/emailConfirmed/:email", /*сделать get запрос на /emailMessage*/ /*отправить полученный хтмл в сообщении*/  /*изменить в бд подтвержение емейла на тру*/ ) //это кнопочка из сообщения
    app.get("/emailMessage", Response.renderPage.emailMessage) // нужно только для того, чтобы проверить как будет выглядить сообщение(и запросить с этой странице его текст)
    app.get("/emailConfirmed/:email", Response.renderPage.emailConfirmed) //для того, чтобы пользователь увидел успешное сообщение
    
    // -- (L)USERS API --
   
    app.post(
        '/register',
        urlencodedParser,
        userCreateValidator,
        passport.authenticate('local-signup', {
            successRedirect: '/',
            failureRedirect: '/register'
        }),
    );

    app.post(
        '/sign_In', 
        urlencodedParser,
        userLoginValidator,
        passport.authenticate('local-signin', {
            successRedirect: '/',
            failureRedirect: '/sign_In'
        })
    );

    //-- ERROR PAGE --
    app.use((err, req, res, next) => {
        console.log(err);
        res.status(500);
        next()
    }, Response.renderPage.errorPage);

    //-- NOT FOUND PAGE --
    app.use((req, res) => {

    })
};

module.exports = {
    initAuthControllers
};
