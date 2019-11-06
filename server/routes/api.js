const Express = require('express');
const data = require('../model/posts');

const Router = Express.Router();

Router.get('/v1/feed', (req, res, next) => {
    res.status(200).json(data);
    console.log('Successfuly retrived all articles feed');
    next();
});

Router.get('/v1/articles/:id', (req, res, next) => {
    res.status(200).json(data[0].data[req.params.id]);
    console.log('Successfuly retrived article');
    next();
});

Router.get('/v1/gifs/:id', (req, res, next) => {
    res.status(200).json(data[0].data[req.params.id]);
    console.log('Successfuly retrived gif');
    next();
});


module.exports = Router;