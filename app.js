var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var passport = require('passport');
var http = require('http');

// import environment configuration
var config = require('./config/environment/development');

// import environment variable
require('./config/environment/envVariable');

// add models
require('./models/Admin');
require('./models/Food');
require('./models/User');
require('./models/Article');
require('./models/ArticleCategory');
require('./models/Recipe');
require('./models/RecipeCategory');
require('./models/WebBanner');
require('./models/MiniProgramBanner');
require('./models/WebSubBanner');
require('./models/MiniProgramSubBanner');

// translate models
// require('./function_modules/translate/translate.js')
// require('./function_modules/translate/test.js')

// add passport configuration
require('./config/passport');

//add routes
var routes = require('./routes/index');
var routes_users = require('./routes/user');
var routes_admins = require('./routes/admin');
var routes_articles = require('./routes/article');
var routes_articlecategories = require('./routes/articlecategory');
var routes_recipes = require('./routes/recipe');
var routes_recipecategories = require('./routes/recipecategory');
var routes_webbanners = require('./routes/webbanner');
var routes_miniprogrambanners = require('./routes/miniprogrambanner');
var routes_websubbanners = require('./routes/websubbanner');
var routes_miniprogramsubbanners = require('./routes/miniprogramsubbanner');
var routes_upload = require('./routes/upload');
var routes_wechat = require('./routes/wechat');
var routes_wechat_test = require('./routes/wechat-test');
var routes_foods = require('./routes/food');

var app = express();
app.use(express.query());

// connect mongolab

var MONGODB_URI = process.env.MONGODB_URI;
mongoose.connect(MONGODB_URI, function(err) {
  if (err) console.log(err);
  console.log("Connected correctly to server.");
});

// Populate databases with sample data
if (config.seedDB) { 
  require('./config/seed'); 
};

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// set root path
app.set('appRoot', path.resolve(''));//set root path

function requireHTTPS(req, res, next) {
    if (req.get('X-Forwarded-Proto') == 'http') {
        res.set('X-Forwarded-Proto', 'https');
        return res.redirect('https://' + req.get('Host') + req.url);
    }
    next();
}
app.use(requireHTTPS);

// uncomment after placing your favicon in /public
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(app.get('appRoot') + '/client'));//serve the static index.html from the lib folder
app.use(favicon(path.resolve(app.get('appRoot') + '/favicon.png')));
app.use(passport.initialize());

app.use('/', routes);
app.use('/api/users', routes_users);
app.use('/api/admins', routes_admins);
app.use('/api/articles', routes_articles);
app.use('/api/articlecategories', routes_articlecategories);
app.use('/api/recipes', routes_recipes);
app.use('/api/recipecategories', routes_recipecategories);
app.use('/api/webbanners', routes_webbanners);
app.use('/api/miniprogrambanners', routes_miniprogrambanners);
app.use('/api/websubbanners', routes_websubbanners);
app.use('/api/miniprogramsubbanners', routes_miniprogramsubbanners);
// app.use('/api/info', routes_info);
// app.use('/api/fleets', routes_fleets);
// app.use('/api/services', routes_services);
// app.use('/api/upload', routes_upload);
// app.use('/api/orders', routes_orders);
// app.use('/api/email', routes_email);
app.use('/api/wechat', routes_wechat);
app.use('/api/wechat_test', routes_wechat_test);
app.use('/api/foods', routes_foods);

//redirect other url to angularjs
app.use(function(req, res) {
  // Use res.sendfile, as it streams instead of reading the file into memory.
  res.sendFile(path.resolve(app.get('appRoot') + '/client/index.html' ));
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

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

//start server
/**
 * Module dependencies.
 */
var debug = require('debug')('server:server');
var http = require('http');

/**
 * Get port from environment and store in Express.
 */

var port = normalizePort(process.env.PORT || 80);
// var port = normalizePort(process.env.PORT || 3000);
app.set('port', port);

/**
 * Create HTTP server.
 */

var server = http.createServer(app);

/**
 * Listen on provided port, on all network interfaces.
 */

server.listen(port, function() {
  console.log("Connected to port", app.get('port'))
});
server.on('error', onError);
server.on('listening', onListening);

/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort(val) {
  var port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}

/**
 * Event listener for HTTP server "error" event.
 */

function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  var bind = typeof port === 'string'
    ? 'Pipe ' + port
    : 'Port ' + port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
  var addr = server.address();
  var bind = typeof addr === 'string'
    ? 'pipe ' + addr
    : 'port ' + addr.port;
  debug('Listening on ' + bind);
}

module.exports = app;
