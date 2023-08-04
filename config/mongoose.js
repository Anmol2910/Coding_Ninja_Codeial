const mongoose = require('mongoose');
const env = require('./environment');

// connect to the database

mongoose.connect(`mongodb://127.0.0.1:27017/${env.db}`);

const db = mongoose.connection;

db.on('error' , console.error.bind(console, 'Error connecting to MongoDB'));

db.once('open', function(){
    console.log('Succesfully connected to the database :: MongoDB');
});

module.exports = db;