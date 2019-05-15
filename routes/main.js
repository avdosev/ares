const {
    userCreateValidator,
    userLoginValidator,
    articleValidator
} = require('../services/validator');

const bodyParser = require('body-parser');

// загрузка/выгрузка стате
const {
    pushArticleToSQL,
    getArticleFromSQL,
    getTopArticles
} = require('../controllers/article.js');

const {
    pushCommentToSQL,
    getCommentsFromSQL
} = require('../controllers/comments.js');

const Handler = require('../controllers/request_handler.js')
const Respondent = require('../controllers/respondent.js')

//  проверка логирования
const { isLoggedIn } = require('../controllers/logged.js');

// подгрузка публик файлов
const { getFile } = require('../controllers/get.js');

const Debug = require('../controllers/debug');

const initAuthControllers = (app, passport) => {
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json());
    const urlencodedParser = bodyParser.urlencoded({ extended: false });

    app.get('/', urlencodedParser, Respondent.index);
    app.get('/register', Respondent.register);
    app.get('/signin', Respondent.signin);
    app.get('/home', isLoggedIn, Respondent.home);
    app.get('/createArticle', isLoggedIn, Respondent.createArticle);
    app.get('/logout', Respondent.logout);
    app.get('/post/:id/', Handler.getArticle, getArticleFromSQL, Respondent.showArticle);
    app.get('/post/:id/non_parsed', Handler.getArticle, getArticleFromSQL, Respondent.jsonArticle);
    app.get('/post/:id/comments', urlencodedParser, Handler.getComments, getCommentsFromSQL, Respondent.getComments);
    app.get('/public/:filefolder/:filename', Handler.getFile, getFile);
    app.get('/top', urlencodedParser, Handler.getTopArticle, getTopArticles, Respondent.getTopArticles)
    app.get('/author/:login', Respondent.authorProfile )

    app.post('/post/:id/pushComment', isLoggedIn, urlencodedParser, Handler.pushComment, 
                Debug.logRequestValues, pushCommentToSQL, Respondent.freshCurrentPage);
    
    app.post(
        '/createArticle',
        isLoggedIn,
        urlencodedParser,
        articleValidator,
        /* отправить на модерацию */
        Handler.pushArticle,
        pushArticleToSQL,
        Respondent.redirectToArticle
    );

    app.post(
        '/register',
        urlencodedParser,
        userCreateValidator,
        passport.authenticate('local-signup', {
            successRedirect: '/',
            failureRedirect: '/register',
            failureFlash:true
        })
    );

    app.post(
        '/signin',
        urlencodedParser,
        userLoginValidator,
        passport.authenticate('local-signin', {
            successRedirect: '/',
            failureRedirect: '/signin',
            failureFlash: true
        })
    );
};

module.exports = {
    initAuthControllers
};
