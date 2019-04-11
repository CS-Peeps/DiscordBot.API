var mongoose = require('mongoose');
const config = require('../config');
require('../utils/console.js');

mongoose.Promise = global.Promise;

var db = mongoose.connection;
consoleInfo(`Attempting to connect to ${config.mongodb.uri}`);

connectWithRetry = () => {
    return mongoose.connect(config.mongodb.uri).then((res) => {
        consoleSuccess(`Connected to MongoDB at ${config.mongodb.uri}`);
        if(process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'test') {
            mongoose.set('debug', true);
        }
    }).catch((err) => {
        consoleError(`Failed to connect to MongoDB - retrying in 5 sec \n${err}\n`);
        setTimeout(connectWithRetry, 5000);
    });
}

connectWithRetry();




module.exports = {mongoose};