var mongoose = require('mongoose'),
    assert = require('assert');

var promotions = require('./models/promotions');

// Connection URL
var url = 'mongodb://localhost:27017/conFusion';
mongoose.connect(url);
var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connecion error: '));
db.once('open', function() {
    console.log('Connected to MongoDB server');

    // Create a new promotion
    promotions.create({
        name: 'Weekend Grand Buffet',
        image: './images/buffet.png',
        label: 'New',
        price: '$19.99',
        description: 'featuring a description test'
    }, function(err, promotion) {
        if (err) throw err;
        console.log('Promotion Created!');
        console.log(promotion);

        var id = promotion._id;

        // Get all promotions
        setTimeout(function() {
            promotions.findByIdAndUpdate(id, {
                $set: {
                    description: 'Updated test'
                }
            },
            {
                new: true
            })
            .exec(function(err, promotion) {
                if (err) throw err;
                console.log('promotion updated...');
                console.log(promotion);
                db.collection('promotions').drop(function() {
                    console.log("promotions collection dropped...")
                    db.close();
                });
            });
        }, 3000);
    });
});

