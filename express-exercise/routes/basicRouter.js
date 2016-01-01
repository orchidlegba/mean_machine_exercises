var express = require('express'),
    path = require('path');

var basicRouter = express.Router();
var rootDirname = path.dirname(require.main.filename);

basicRouter.get('/', function (req, res) {
    res.sendFile(path.join(rootDirname + '/views/index.html'));
});

exports.routes= basicRouter;
