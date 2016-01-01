
var config = require('./config.js');
var path = require('path');
var express = require('express'); // call express
var app = express(); // define our app using express
var bodyParser = require('body-parser'); // get body-parser
var morgan = require('morgan'); // used to see requests
var mongoose = require('mongoose'); // for working w/ our database 
var User = require('./app/models/user');
var apiRouter = require('./app/routes/api');

mongoose.connect(config.database);
// use body parser so we can grab information from POST requests
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// configure our app to handle CORS requests
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type, \
 Authorization');
    next();
});

app.use(morgan('dev')); 

// static files
app.use(express.static(__dirname + '/public'));

// api routes
app.use('/api', apiRouter);

// catchall route for everything outside of apiRoutes,  send users to frontend
app.get('*', function(req, res) {
 res.sendFile(path.join(__dirname + '/public/app/views/index.html'));
});

app.listen(config.port);
console.log('Magic happens on port ' + config.port);