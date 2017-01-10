var mongoose = require('mongoose');
var Schema = mongoose.Schema;
    
var Stop = new Schema({
    id : String,
    type : String,
    lat : String,
    long : String,
    platformCode : String,
    code : String,
    parentStation : String
});

module.exports = mongoose.model('Stops', Stop); 