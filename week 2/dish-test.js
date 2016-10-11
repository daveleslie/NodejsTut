var mongoose = require('mongoose'),
    assert = require('assert');

var dishes = require('./models/dishes');

// Connection URL
var url = 'mongodb://localhost:27017/conFusion';
mongoose.connect(url);

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error: '));
db.once('open', function() {
    console.log('Connected to mongoDB server');

    //Create a new dish
    dishes.create({
        name: 'Uthapizza',
        image: './images/uthapizza.jpg',
        category: 'mains',
        label: 'Hot',
        price: '$4.99',
        description: 'A unique test...',
        comments: [
            {
                rating: 5,
                comment: "Imagine all the eatables living in confusion",
                author: 'John Lemon'
            },
            {
                rating: 4,
                comment: "Sends anyone to heaven, etc etc.",
                author: 'Paul McVites'
            }
        ]
    }, function(err, dish) {
        if (err) throw err;
        console.log('Dish Created!');
        console.log(dish);
        console.log("price: "+dish.price);

        var id = dish._id;

        // Get all the dishes 
        setTimeout(function() {
            dishes.findByIdAndUpdate(id, {
                $set: {
                    description: 'Updated Test'
                }
            }, {
                new: true
            })
            .exec(function(err, dish) {
                if (err) throw err;
                console.log('Dish Updated!');
                console.log(dish);

                dish.comments.push({
                    rating: 1,
                    comment: 'I\'m getting a sinking feeling!',
                    author: 'test author'
                });

                dish.save(function(err, dish) {
                    console.log('dish comments updated!');
                    console.log(dish);

                    db.collection('dishes').drop(function() {
                        db.close();
                    });
                });

            });
        }, 3000);

    });
});