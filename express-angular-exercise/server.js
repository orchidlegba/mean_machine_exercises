var express = require('express');
var app = express();
var path = require('path');

app.use(express.static(`${__dirname}/public`));

app.get('*', (req, res) => {
    res.sendFile(`${__dirname}/public/views/index.html`);
});

var listener = app.listen(8080);
console.log(`magic happens on ${ listener.address().port }`);
