// =============================================================================
// BASE SETUP
// =============================================================================

// PACKAGES USED
// =============================================================================

var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var http = require('http');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var app = express();

//SERV CONFIG
// =============================================================================
var config = require('./_config.js');


//ENABLE/DISABLE CORS
// =============================================================================

var allowCrossDomain = function (req, res, next) {
    res.header('Access-Control-Allow-Origin', config.responseSettings.AccessControlAllowOrigin);
    res.header('Access-Control-Allow-Methods', config.responseSettings.AccessControlAllowMethods);
    res.header('Access-Control-Allow-Headers', config.responseSettings.AccessControlAllowHeaders);
    
    // intercept OPTIONS method
    if ('OPTIONS' == req.method) {
        res.sendStatus(200);
    }
    else {
        next();
    }
};

app.use(allowCrossDomain);

//LOG REQUEST TO THE CONSOLE
// =============================================================================
app.use(morgan('dev'));

// CONFIGURE BODY PARSE
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//DATABASE CONECTION
// =============================================================================

var monk = require('monk');
global.db = monk(config.mongoURI[app.settings.env]);

//OVERRIDE REQUIRE TO EXPOSE THE ROOT
// =============================================================================
global.requireRoot = function (name) {
    return require(__dirname + '/' + name);
}

app.use(cookieParser());

// ROUTES FOR FEEDS API
// =============================================================================
var routes = require('./routes/index');
var users = require('./routes/users');
var feeds = require('./routes/feeds');

app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/users', users);
app.use('/feeds', feeds);


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

// ERRO 404 / PRINT STACKTRACE 
// No futuro será necessário criar um servico que gerencie as 
// configurações da aplicação
// =============================================================================
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

http.createServer(app).listen(config.port[app.settings.env]);
console.log("Serving feeds...")

module.exports = app;
