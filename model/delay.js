var mongoose = require('mongoose');
var Schema = mongoose.Schema;
    
var Delay = new Schema({
    id : String,
    type : String,
    delayValue : String,
    delayReason : String
});

module.exports = mongoose.model('Delays', Delay); 