var express = require('express');
var path = require('path');
var favicon = require('static-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var app = express();

app.get('/api/*', function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  next();
});


app.use(favicon());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());
// app.use(express.static(path.join(__dirname, 'public')));


app.get('/', function(req, res) {
  res.send('<h1>It works!</h1>');
});

require('./rest')(app);

/// catch 404 and forward to error handler
app.use(function(req, res) {
  res.send('Not found', 404);
  // var err = new Error('Not Found');
  // err.status = 404;
  // next(err);
});

/// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});



module.exports = app;