const Express = require('express');


const Router = Express.Router();

Router.get('/v1/feed', (req, res, next) => {
    res.status(200).json({ "message": "Articles" });
    console.log('Successfuly retrived all articles feed');
    next();
});

Router.get('/v1/article/:id', (req, res, next) => {
    res.status(200).json({ "message": "Article 1" });
    console.log('Successfuly retrived article');
    next();
});


module.exports = Router;