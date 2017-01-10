var mongoose = require('mongoose');
var Schema = mongoose.Schema;
    
var Connection = new Schema({
    id : String,
    type : String,
    departureStop : String,
    arrivalStop : String,
    departureTime : String,
    arrivalTime : String,
    trip : String,
    route : String,
    departureDelay : String,
    arrivalDelay : String,
    nextConnection : String
});

module.exports = mongoose.model('Connections', Connection); 