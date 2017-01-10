var express = require('express');
var router = express.Router();
var db = require('../data/db');
var lc_client = require('../linked_connections_client/lc_client');

//Get all stations
router.get('/stations', function (req, res, next) {
    db.listAllStations(function (stations) {
        res.json(stations);
    });
});

//Get all stops
router.get('/stops', function (req, res, next) {
    db.listAllStops(function (stops) {
        res.json(stops);
    });
});

//Get Stop details from Station name
router.get('/stop/:name', function (req, res, next) {
    db.findStopByStationName(req.params.name, function (stop) {
        res.json(stop);
    });
});

//Get Station details from Stop id
router.get('/station', function(req, res, next) {
    db.findStationByStopId(req.query.id, function(station) {
        res.json(station);
    });
});

//Look for connections using LinkedConnections Client
router.get('/find_path', function (req, res, next) {
    var departure = null;
    var arrival = null;
    db.findStopByStationName(req.query.origin, function (dep) {
        departure = dep.id;
        db.findStopByStationName(req.query.destiny, function (arr) {
            arrival = arr.id;
            lc_client.findPath(departure, arrival, req.query.time, function (path) {
                res.json(path);
            });
        })
    });
});

module.exports = router;