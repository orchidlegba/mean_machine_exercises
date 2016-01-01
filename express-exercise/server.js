var express = require('express'),
    app = express(),
    basicRouter = require('./routes/basicRouter'),
    adminRouter = require('./routes/adminRouter'),
    loginRouter = require('./routes/loginRouter'),
    path = require('path');

app.use('/admin', adminRouter.routes);
app.use('/', basicRouter.routes);
loginRouter.routes(app);

var listener = app.listen(1337);

console.log(`visit http://localhost:${listener.address().port}`);