var express = require('express'),
    path = require('path');

var adminRouter = express.Router();


//middleware filter
adminRouter.use(function (req, res, next) {
    console.log(req.method, req.url);
    next();
});


adminRouter.get('/', function (req, res) {
    res.send('i a am the dashboard');
});

adminRouter.get('/users', function (req, res) {
    res.send('users page');
});


adminRouter.param('name', function (req, res, next, name) {
    var regex = new RegExp('^[a-zA-z]+$');
    var isName = regex.test(name);
    //string interpolation requires backticks
    console.log(`validation on ${name} is ${isName}`);
    
    if (isName === true) {
        // save valid name as request param
        req.name = name;
    }

    next();
});

adminRouter.get('/users/:name', function (req, res) {
    res.send(`users name from request param -> ${req.name}`);
});

adminRouter.get('/posts', function (req, res) {
    res.send('posts page');
});

exports.routes = adminRouter;