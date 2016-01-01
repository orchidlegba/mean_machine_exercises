
var config = require.main.require('./config.js');
var jsonwebtoken = require('jsonwebtoken');

var express = require('express'); 
// require.main get entry point of the current application therefore also essentially root _dirname 
// https://nodejs.org/api/modules.html#modules_accessing_the_main_module
var User = require.main.require('./app/models/user');

var apiRouter = express.Router();

// perform authenticate before auth middleware
apiRouter.post('/authenticate', function (req, res) {
    User.findOne({ username: req.body.username }).select('name username password').exec(function (err, user) {
        if (err) throw err;

        if (!user) {
            console.log('User not found');
            res.json({ success: false, message: 'Authentication failed, no user found' });
        } else if (user) {
            console.log('User found');
            var validPassowrd = user.comparePassword(req.body.password);
            if (!validPassowrd) {
                res.json({ success: false, message: 'Authentication failed, wrong password' });
            } else {
                console.log('User found and valid password ');
                var token = jsonwebtoken.sign({
                    name: user.name,
                    username: user.username
                }, config.secret, {
                        expiresInMinutes: 1440 // expires within 24 hours
                    });

                res.json({
                    success: true,
                    message: 'One juicy token :-)',
                    token: token
                });
            }
        }
    });
});

function getTokenFromRequest(req) {
    //check post param, url param or http header
    return req.body.token || req.param('token') || req.headers['x-access-token'];
}

// middleware for all apirouter requests with jsonwebtoken authentication
apiRouter.use(function (req, res, next) {
    var token = getTokenFromRequest(req);

    if (token) {
        jsonwebtoken.verify(token, config.secret, function (err, decoded) {
            if (err) {
                return res.status(403).send({
                    success: false,
                    message: 'failed to athenticate token'
                });
            } else {
                req.decoded = decoded;
                next();
            }
        });
    } else {
        return res.status(403).send({
            success: false,
            message: 'token not provided'
        });
    }
});

apiRouter.get('/', function (req, res) {
    res.json({ message: 'Welcome to the the api!' });
});

apiRouter.get('/me', function (req, res) {
    res.send(req.decoded);
});

apiRouter.route('/users')
    .post(function (req, res) {
        var user = new User();

        if (req.body.name) user.name = req.body.name;
        if (req.body.username) user.username = req.body.username;
        if (req.body.password) user.password = req.body.password;

        user.save(function (err) {
            if (err) {
                if (err.code == 11000) {
                    return res.json({ success: false, mesage: 'That username is already used by a user' });
                } else {
                    return res.send(err);
                }
            }
            res.send({ message: 'User created!' });
        });
    })
    .get(function (req, res) {
        User.find(function (err, users) {
            if (err) return res.send(err);
            res.json(users);
        });
    });


apiRouter.route('/users/:user_id')
    .get(function (req, res) {
        User.findById(req.params.user_id, function (err, user) {
            if (err) res.send(err);
            res.json(user);
        });
    })
    .put(function (req, res) {
        User.findById(req.params.user_id, function (err, user) {
            if (err) req.send(err);

            if (req.body.name) user.name = req.body.name;
            if (req.body.username) user.username = req.body.username;
            if (req.body.password) user.password = req.body.password;

            user.save(function (err) {
                if (err) req.send(err);
                console.log(`saving name->${req.body.name} username->${req.body.username} password->${req.body.password}`)
                var messageChanges = { name: req.body.name, username: req.body.username }
                res.json({ message: 'User updated', changes: messageChanges });
            });
        });
    })
    .delete(function (req, res) {
        User.remove({ _id: req.params.user_id }, function (err) {
            if (err) req.send(err);
            res.json({ message: `deleted a user with id->${req.params.user_id}` });
        });
    });

module.exports = apiRouter;    