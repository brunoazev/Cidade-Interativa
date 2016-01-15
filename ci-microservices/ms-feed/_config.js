var config = {};

config.mongoURI = {
    development: 'localhost:27017/ci_db',
    test: 'localhost:27017/ci_db'
};

config.port = {
    development: 3000,
    test: 3000
};

module.exports = config;