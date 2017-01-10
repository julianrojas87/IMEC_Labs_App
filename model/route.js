var mongoose = require('mongoose');
var Schema = mongoose.Schema;
    
var Route = new Schema({
    id : String,
    type : String
});

module.exports = mongoose.model('Routes', Route); 