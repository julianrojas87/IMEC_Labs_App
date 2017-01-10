var mongoose = require('mongoose');
var Schema = mongoose.Schema;
    
var Trip = new Schema({
    id : String,
    type : String,
    route : String
});

module.exports = mongoose.model('Trips', Trip); 