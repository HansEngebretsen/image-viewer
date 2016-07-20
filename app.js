var phantom = require('phantom'), // getting the html
    cheerio = require('cheerio'), // jquery for node
    fs = require('fs'), // file system
    express = require('express'),
    app     = express(),
    path = require('path'),
    favicon = require('serve-favicon'),
    cookieParser = require('cookie-parser'),
    bodyParser = require('body-parser'),
    refreshme = true; // caching

// uncomment after placing your favicon in /public
app.use(favicon(path.join(__dirname, 'public', 'img/favicon/favicon.ico')));

// Static files
app.use(express.static(path.join(__dirname, 'public')));

// Routes
var routes = require('./routes/index');
app.use('/', routes);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// Views
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');


app.listen('8081')
console.log('Magic happens on port 8081');
exports = module.exports = app;