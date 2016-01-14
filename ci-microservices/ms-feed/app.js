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

//LOG REQUEST TO THE CONSOLE
// =============================================================================
app.use(morgan('dev'));

// CONFIGURE BODY PARSE
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//SERV CONFIG
// =============================================================================
var config = require('./_config.js');

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

app.all('*', function (req, res, next) {
    
    
    /**
     * Response settings
     * @type {Object}
     */
    var responseSettings = {
        "AccessControlAllowOrigin": req.headers.origin,
        "AccessControlAllowHeaders": "Content-Type,X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5,  Date, X-Api-Version, X-File-Name",
        "AccessControlAllowMethods": "POST, GET, PUT, DELETE, OPTIONS",
        "AccessControlAllowCredentials": true
    };
    
    /**
     * Headers
     */
    res.header("Access-Control-Allow-Credentials", responseSettings.AccessControlAllowCredentials);
    res.header("Access-Control-Allow-Origin", responseSettings.AccessControlAllowOrigin);
    res.header("Access-Control-Allow-Headers", (req.headers['access-control-request-headers']) ? req.headers['access-control-request-headers'] : "x-requested-with");
    res.header("Access-Control-Allow-Methods", (req.headers['access-control-request-method']) ? req.headers['access-control-request-method'] : responseSettings.AccessControlAllowMethods);
    
    if ('OPTIONS' == req.method) {
        res.send(200);
    }
    else {
        next();
    }


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
