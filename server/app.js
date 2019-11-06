
const express = require('express');
const bodyParser = require("body-parser");
const apiRoutes = require('./routes/api');




const app = express();

app.use(bodyParser.json());
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

// app.use(bodyParser.json());

app.get("/", (request, response) => {
    response.status(200).send("Welcome to Teamwork");
});

app.use('/api/', apiRoutes);



module.exports = app;