var mongoose = require('mongoose');
var Schema = mongoose.Schema;

require('mongoose-currency').loadType(mongoose);
var Currency = mongoose.Types.Currency;

//Create the promotion Schema

var promoSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    image: {
        type: String,
        required: true
    },
    label: {
        type: String,
    },
    price: {
        type: Currency,
        required: true
    },
    description: {
        type: String,
        required: true
    }
},
{
    timestamps: true
});

// Create the promotions model from the Schema
var promotions = mongoose.model('Promotion', promoSchema);

module.exports = promotions;