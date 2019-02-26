const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const tasksRoutes = require('./api/routes/tasks');

mongoose.connect("mongodb+srv://admin:o9NshxicqEOMcep9@cluster0-wuwyg.mongodb.net/Tasks?retryWrites=true", { useNewUrlParser: true });
app.use(morgan('dev'));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use((req, res, next) => {
    var allowedOrigins = ['http://127.0.0.1:8020', 'http://localhost:4200', 'http://127.0.0.1:9000', 'http://localhost:9000',
        'http://yana-l-tasks-planner.s3-website.eu-central-1.amazonaws.com'];

    var origin = req.headers.origin;
    if (allowedOrigins.indexOf(origin) > -1) {
        res.setHeader('Access-Control-Allow-Origin', origin);
    }
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PATCH, DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.header('Access-Control-Allow-Credentials', true);
    return next();
});

app.use('/tasks', tasksRoutes);

app.use((req, res, next) => {
    const error = new Error('Not found');
    error.status = 404;
    next(error);
});

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    });
});

module.exports = app;