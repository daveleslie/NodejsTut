var mongoose = require('mongoose'),
    assert = require('assert');

var dishes = require('./models/dishes.js');

// Connection URL
var url = 'mongodb://localhost:27017/conFusion';
mongoose.connect(url);

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error: '));
db.once('open', function() {
    console.log('Connected to mongoDB server');

    db.collection('promotions').drop(function() {
        db.close();
    });
});