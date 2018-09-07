var mongoose = require('mongoose');
require('../utils/console.js');

mongoose.Promise = global.Promise;

var db = mongoose.connection;

connectWithRetry = () => {
    return mongoose.connect(process.env.MONGODB_URI).then((res) => {
        consoleSuccess(`Connected to MongoDB at ${process.env.MONGODB_URI}`);
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