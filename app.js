var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var index = require('./routes/index');
var users = require('./routes/users');

var twitterStream = require('twitter-stream-api');
  var fs = require('fs');

var keys = {
  consumer_key : "7EHH72iYX8COvNa0KLI8KNm9Y",
  consumer_secret : "CZzrDCBnnBV3goyG55eLLR2qBOKwXUO7W7yBCKMpwIjfAo1kQV",
  token : "50436093-G1bf8QjaDDeAodjMiB57W656jEqSrRTSRN1nUCSrV",
  token_secret : "Cv8tcx076b2Iam3nQdUCpejQQuQ0WmEdomp7EnCZSLnEl"
}

var Twitter = new twitterStream(keys, false);
Twitter.stream('statuses/filter', {
    track: 'javascript'
});

Twitter.on('connection success', function (uri) {
    console.log('connection success', uri);
});

Twitter.pipe(fs.createWriteStream('tweets.json'));

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/users', users);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
