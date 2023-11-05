const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const authRouter=require('./routes/authRoute');
const accidentRouter = require('./routes/accidentRoute');
const typeSupRouter = require('./routes/typeSupportRoute');
const typAciRouter = require('./routes/typeAccidentRoute');
const roomRouter= require('./routes/roomRoute');
const uploadRouter = require('./routes/uploadRoute');

const dbConnect=require('./dbConnect');
const app = express();
dbConnect();
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/api/user',authRouter);
app.use('/api/accident',accidentRouter);
app.use('/api/support',typeSupRouter);
app.use('/api/typeAci',typAciRouter);
app.use('/api/room',roomRouter);
app.use('/api/upload',uploadRouter);
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
