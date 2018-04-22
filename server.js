//
var express = require('express'),
    steam   = require('steam-login');

//
var app = express();

//
app.use(require('express-session')({ resave: false, saveUninitialized: false, secret: 'a secret' }));

//
app.use(steam.middleware({

//
    realm: 'https://quality-copper-8080.codio.io/',

//
    verify: 'https://quality-copper-8080.codio.io/verify',

//Steam api key to manage steam login
    apiKey: "EDD00D436E843A91B1C869A8522CDD33"
  }
));

//
app.get('/', function(req, res) {
    res.send(req.user == null ? 'not logged in' : 'hello ' + req.user.username + ', your steam id is: ' +req.user.steamid).end();
});

//
app.get('/authenticate', steam.authenticate(), function(req, res) {
    res.redirect("/");
});

//
app.get('/verify', steam.verify(), function(req, res) {
    res.send(req.user).end();
});

//
app.get('/logout', steam.enforceLogin('/'), function(req, res) {
    req.logout();
    res.redirect('/');
});


app.listen(8080);
console.log('listening');
