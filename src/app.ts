import * as express from 'express';
import * as logger from 'morgan';
import * as bodyParser from 'body-parser';
import {join} from 'path';
import router from './routes'
import cookieParser = require('cookie-parser'); // this module doesn't use the ES6 default export yet

const app: express.Express = express();

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/api', router); //prefix all the api calls with '/api'

// catch 404 and forward to error handler
app.use((req, res, next) => {
  var err = new Error('Not Found');
  err['status'] = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use((err: any, req, res, next) => {
    res.status(err['status'] || 500);
    res.json({
      message: err.message,
      error: err
    });
  });
}

// Force HTTPS
//if (app.get('env') === 'production') {
//  app.use(function(req, res, next) {
//    var protocol = req.get('x-forwarded-proto');
//    protocol == 'https' ? next() : res.redirect('https://' + req.hostname + req.url);
//  });
//}

// production error handler
// no stacktraces leaked to user
app.use((err: any, req, res, next) => {
  res.status(err.status || 500);
  res.json({
    message: err.message,
    error: {}
  });
  return null;
});

export default app;