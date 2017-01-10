var mongoose = require('mongoose');
var db = mongoose.connection;
var Station = require('../model/station');
var Stop = require('../model/stop');

mongoose.Promise = global.Promise;
mongoose.createConnection('mongodb://localhost:27017/ImecTestDB');

module.exports.listAllStations = function(callback) {
    Station.find({}, function(err, stations) {
        callback(stations);
    });
}

module.exports.listAllStops = function(callback) {
    Stop.find({}, function(err, stops) {
        callback(stops);
    });
}

module.exports.findStopByStationName = function(name, callback) {
    Station.findOne({label : name}, function(err, station) {
        Stop.findOne({parentStation : station.id}, function(err, stop) {
            callback(stop);
        });
    });
}

module.exports.findStationByStopId = function(id, callback) {
    Stop.findOne({id: id}, function(err, stop) {
        Station.findOne({id : stop.parentStation}, function(err, station) {
            callback(station);
        });
    });
}