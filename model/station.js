var mongoose = require('mongoose');
var Schema = mongoose.Schema;
    
var Station = new Schema({
    id : String,
    type : String,
    label : String,
    lat : String,
    long : String
});

module.exports = mongoose.model('Stations', Station); 