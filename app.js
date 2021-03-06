var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const favicon = require('express-favicon');

var indexRouter = require('./routes/index');
var dataRouter = require('./routes/data');
var tierimgRouter = require('./routes/tierimg');
var tierRouter = require('./routes/tier');
//var dataRouter = require('./routes/data');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(favicon(path.join(__dirname, 'content','favicon.ico')));

//app.use('/node_modules/html2canvas/dist', express.static(path.join(__dirname, 'node_modules/html2canvas/dist')))
app.use('/content', express.static(path.join(__dirname, 'content')))
app.use('/data/*', dataRouter);
app.use('/tierlist', tierRouter);
app.use('/tier', tierimgRouter);
app.use('/tier.png', tierimgRouter);
app.use('/', indexRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
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
