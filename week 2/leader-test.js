var mongoose = require('mongoose'),
    assert = require('assert');

var leaders = require('./models/leadership');

// Connection URL
var url = 'mongodb://localhost:27017/conFusion';
mongoose.connect(url);
var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connecion error: '));
db.once('open', function() {
    console.log('Connected to MongoDB server');

    // Create a new leader
    leaders.create({
        name: 'Peter Pan',
        image: './images/alberto.png',
        designation: 'Chief Epicurious Officer',
        abbr: 'CEO',
        description: 'CEO description test'
    }, function(err, Leader) {
        if (err) throw err;
        console.log('Leader Created!');
        console.log(Leader);

        var id = Leader._id;

        // Get all promotions
        setTimeout(function() {
            leaders.findByIdAndUpdate(id, {
                $set: {
                    description: 'Updated test'
                }
            },
            {
                new: true
            })
            .exec(function(err, Leader) {
                if (err) throw err;
                console.log('leader updated...');
                console.log(Leader);
                db.collection('leaders').drop(function() {
                    console.log("leaders collection dropped...")
                    db.close();
                });
            });
        }, 3000);
    });
});

