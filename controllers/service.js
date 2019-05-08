register = (req, res, next) => {
    res.render('register', { authorised: req.isAuthenticated() });
};

signin = (req, res, next) => {
    res.render('signin', { authorised: req.isAuthenticated() });
};

createArticle = (req, res, next) => {
    res.render('create_article', { authorised: req.isAuthenticated() });
};

home = (req, res, next) => {
    res.render('home', { authorised: req.isAuthenticated() });
};

showArticle = (req, res, next) => {
    console.log(req.params.id);
    
    res.render('post', {
        authorised: req.isAuthenticated(),
        name: res.article.header,
        text: res.article.content,
        id: req.params.id
    });
};

logout = (req, res, next) => {
    req.session.destroy(err => {
        res.redirect('/');
    });
};

index = (req, res, next) => {
    res.render('index', {
        authorised: req.isAuthenticated()
    });
};

errorPage = (req, res, next) => {
    res.render('error_page');
};

freshCurrentPage = (req,res,next) => {
    var currentUrl;
    if ( req.url.indexOf("pushComment") != -1) { //т.е. мы только что запушили коммент и нам надо катиться назад, на*уй
        currentUrl= req.url.slice(0, -11);
    }
    console.log(currentUrl)
    res.redirect(currentUrl)
    
};


module.exports = {
    register,
    signin,
    home,
    createArticle,
    errorPage,
    index,
    showArticle,
    logout,
    freshCurrentPage
};
