var mongoose = require('mongoose');
var Schema = mongoose.Schema;

require('mongoose-currency').loadType(mongoose);
var Currency = mongoose.Types.Currency;

// Create the Leaders Schema
var leaderSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    image: {
        type: String,
    },
    designation: {
        type: String,
        required: true
    },
    abbr: {
        type: String
    },
    description: {
        type: String
    }
},
{
    timestamps: true
});

// Create the leaders model from the Schema
var leaders = mongoose.model('Leader', leaderSchema);

module.exports = leaders;