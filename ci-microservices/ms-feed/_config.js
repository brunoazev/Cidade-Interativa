var config = {};

config.mongoURI = {
    development: 'localhost:27017/ci_db',
    test: 'localhost:27017/ci_db'
};

config.port = {
    development: 3000,
    test: 3000
};

config.responseSettings = {
    "AccessControlAllowOrigin": "*",
    "AccessControlAllowHeaders": "Content-Type, Authorization, Content-Length, X-Requested-With",
    "AccessControlAllowMethods": "GET,PUT,POST,DELETE,OPTIONS",
    "AccessControlAllowCredentials": true
};

module.exports = config;