var express = require('express'),
    path = require('path');

//need to share app var, therefore passing it in
exports.routes = function(app) {
    app.route('/login')
        .get(function (req, res) {
            res.send('this is the login form');

        })
        .post(function (req, res) {
            console.log('procssing');
            res.send('processing the login form');
        });
}

