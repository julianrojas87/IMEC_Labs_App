//MongoDB wrapper module
var mongoose = require('mongoose');
//File manager module
var fs = require('fs');
//Using Ruben Verborgh RDF parser (https://github.com/RubenVerborgh/N3.js)
var N3 = require('n3');

//Schema definition
var Station = require('../model/station');
var Stop = require('../model/stop');
var Route = require('../model/route');
var Delay = require('../model/delay');
var Trip = require('../model/trip');
var Connection = require('../model/connection');

//Constants definition
var constants = require('./constants');

//Model objects and arrays
var station = new Station();
var stations = [];
var stop = new Stop();
var stops = [];
var route = new Route();
var routes = [];
var trip = new Trip();
var trips = [];
var delay = new Delay();
var delays = [];
var connection = new Connection();
var connections = [];
//Object to keep track the type of element being parsed
var currentSubject = {type : '', value : ''};

module.exports.initDataModel = function(callback) {
    //Connecting local mongodb database named ImecTestDB
    mongoose.Promise = global.Promise;
    mongoose.connect('mongodb://localhost:27017/ImecTestDB');

    //Checking if the dataset has already been parsed
    Station.count({}, function(err, count) {
        if(err) {
            console.log(err);
            callback(err);
        } 
        if(count <= 0) {
            console.log('Beginning dataset parsing process, please wait until it is finished...');
            parseDataSet(function() {
                callback();
            });
            
        } else {
            console.log('Data model has already been created');
            callback();
        }
    });
}

function parseDataSet(callback) {
    var parser = N3.Parser();

    fs.readFile('data_set/lc.ttl', function (err, data) {
        if (err) {
            callback(err);
        }

        var t0 = new Date().getTime();

        parser.parse(data.toString(), function (error, triple, prefixes) {
            if (triple) {
                if(triple.predicate == constants.rdf + 'type') {
                    //Found a new entity
                    setNewSubject(triple);
                } else {
                    triple.object = triple.object.toString().replace(/"/g, '');
                    if(triple.subject == currentSubject.value) {
                        //Map ordered property
                        mapOrderedProperty(triple);
                    } else {
                        //Search for previously saved Entities and map property
                        mapUnorderedProperty(triple);
                    }
                } 
            } else {
                stations.push(station);
                stops.push(stop);
                routes.push(route);
                delays.push(delay);
                trips.push(delay);
                connections.push(connection);

                var t1 = new Date().getTime();
                var tf = (t1 - t0) / 1000;
                
                console.log('----------------------------------------');
                console.log('******** There are ' + stations.length + ' Stations defined!!');
                console.log('******** There are ' + stops.length + ' Stops defined!!');
                console.log('******** There are ' + routes.length + ' Routes defined!!');
                console.log('******** There are ' + delays.length + ' Delays defined!!');
                console.log('******** There are ' + trips.length + ' Trips defined!!');
                console.log('******** There are ' + connections.length + ' Connections defined!!');
                console.log('----------------------------------------');
                console.log("Parsing process took " + tf + " seconds");

                console.log('Begining to store each element in the Mongo DB...');

                insertStations(stations, function(result) {
                    console.log(result);
                });
                insertStops(stops, function(result) {
                    console.log(result);
                });
                insertRoutes(routes, function(result) {
                    console.log(result);
                });
                insertDelays(delays, function(result) {
                    console.log(result);
                });
                insertTrips(trips, function(result) {
                    console.log(result);
                });
                insertConnections(connections, function(result) {
                    console.log(result);
                    console.log('-------------------------------------------------------------------------');
                    console.log('Parsing process completed successfuly!!');
                    console.log('Please open http://localhost:3000 in your browser to start using the App');
                    console.log('-------------------------------------------------------------------------');
                });

                callback();
            }
        });
    });
}

function setNewSubject(triple) {
    switch(triple.object) {
        case constants.gtfs + 'Station':
            if(station.id != null && station.id != '') {
                stations.push(station);
                station = new Station();
            }
            currentSubject = {type : constants.gtfs + 'Station', value : triple.subject};
            station.type = constants.gtfs + 'Station';
            station.id = currentSubject.value;
            break;
        case constants.gtfs + 'Stop':
            if(stop.id != null && stop.id != '') {
                stops.push(stop);
                stop = new Stop();
            }
            currentSubject = {type : constants.gtfs + 'Stop', value : triple.subject};
            stop.type = constants.gtfs + 'Stop';
            stop.id = currentSubject.value;
            break;
         case constants.gtfs + 'Route':
            if(route.id != null && route.id != '') {
                routes.push(route);
                route = new Route();
            }
            currentSubject = {type : constants.gtfs + 'Route', value : triple.subject};
            route.type = constants.gtfs + 'Route';
            route.id = currentSubject.value;
            break;
        case constants.lcd + 'Delay':
            if(delay.id != null && delay.id != '') {
                delays.push(delay);
                delay = new Delay();
            }
            currentSubject = {type : constants.lcd + 'Delay', value : triple.subject};
            delay.type = constants.lcd + 'Delay';
            delay.id = currentSubject.value;
            break;
        case constants.gtfs + 'Trip':
            if(trip.id != null && trip.id != '') {
                trips.push(trip);
                trip = new Trip();
            }
            currentSubject = {type : constants.gtfs + 'Trip', value : triple.subject};
            trip.type = constants.gtfs + 'Trip';
            trip.id = currentSubject.value;
            break;
        case constants.lc + 'Connection':
            if(connection.id != null && connection.id != '') {
                connections.push(connection);
                connection = new Connection();
            }
            currentSubject = {type : constants.lc + 'Connection', value : triple.subject};
            connection.type = constants.lc + 'Connection';
            connection.id = currentSubject.value;
    }
}

//No need to map route properties as it does not contains any
function mapOrderedProperty(triple) {
    switch(currentSubject.type) {
        case constants.gtfs + 'Station':
            station = mapStationProperty(station, triple);
            break;
        case constants.gtfs + 'Stop':
            stop = mapStopProperty(stop, triple);
            break;
        case constants.lcd + 'Delay':
            delay = mapDelayProperty(delay, triple);
            break;
        case constants.gtfs + 'Trip':
            trip = mapTripProperty(trip, triple);
            break;
        case constants.lc + 'Connection':
            connection = mapConnectionProperty(connection, triple);
    }
}

//No need to map route properties as it does not contains any
function mapUnorderedProperty(triple) {
    if(triple.subject.toString().indexOf('connections') >= 0) {
        findAndMapProperty('connection', triple, connections);
    }

    if(triple.subject.toString().indexOf('stations') >= 0) {
        findAndMapProperty('station', triple, stations);
    }

    if(triple.subject.toString().indexOf('stops') >= 0) {
        findAndMapProperty('stop', triple, stops);
    }

    if(triple.subject.toString().indexOf('trips') >= 0) {
        findAndMapProperty('trip', triple, trips);
    }

    if(triple.subject.toString().indexOf('delays') >= 0) {
        findAndMapProperty('delay', triple, delays);
    }
}

function findAndMapProperty(type, triple, collection) {
    for(x in collection) {
        if(collection[x].id == triple.subject) {
            switch(type) {
                case 'station':
                    collection[x] = mapStationProperty(collection[x], triple);
                    break;
                case 'stop':
                    collection[x] = mapStopProperty(collection[x], triple);
                    break;
                case 'delay':
                    collection[x] = mapDelayProperty(collection[x], triple);
                    break;
                case 'trip':
                    collection[x] = mapTripProperty(collection[x], triple);
                    break;
                case 'connection':
                    collection[x] = mapConnectionProperty(collection[x], triple);
            }
            break;
        }
    }
}

function mapStationProperty(stationObject, triple) {
    switch(triple.predicate) {
        case constants.rdfs + 'label':
            stationObject.label = triple.object;
            break;
        case constants.geo + 'lat':
            stationObject.lat = triple.object;
            break;
        case constants.geo + 'long':
            stationObject.long = triple.object;
    }

    return stationObject;
}

function mapStopProperty(stopObject, triple) {
    switch(triple.predicate) {
        case constants.geo + 'lat':
            stopObject.lat = triple.object;
            break;
        case constants.geo + 'long':
            stopObject.long = triple.object;
            break;
        case constants.gtfs + 'platformCode':
            stopObject.platformCode = triple.object;
            break;
        case constants.gtfs + 'code':
            stopObject.code = triple.object;
            break;
        case constants.gtfs + 'parentStation':
            stopObject.parentStation = triple.object;
    }

    return stopObject;
}

function mapDelayProperty(delayObject, triple) {
    switch(triple.predicate) {
        case constants.lcd + 'delayValue':
            delayObject.delayValue = triple.object;
            break;
        case constants.lcd + 'delayReason':
            delayObject.delayReason = triple.object;
    }

    return delayObject;
}

function mapTripProperty(tripObject, triple) {
    tripObject.route = triple.object;
    return tripObject;
}

function mapConnectionProperty(connectionObject, triple) {
    switch(triple.predicate) {
        case constants.lc + 'departureStop':
            connectionObject.departureStop = triple.object;
            break;
        case constants.lc + 'arrivalStop':
            connectionObject.arrivalStop = triple.object;
            break;
        case constants.lc + 'departureTime':
            connectionObject.departureTime = triple.object;
            break;
        case constants.lc + 'arrivalTime':
            connectionObject.arrivalTime = triple.object;
            break;
        case constants.gtfs + 'trip':
            connectionObject.trip = triple.object;
            break;
        case constants.gtfs + 'route':
            connectionObject.route = triple.object;
            break;
        case constants.lcd + 'departureDelay':
            connectionObject.departureDelay = triple.object;
            break;
        case constants.lcd + 'arrivalDelay':
            connectionObject.arrivalDelay = triple.object;
            break;
        case constants.lc + 'nextConnection':
            connectionObject.nextConnection = triple.object;
    }

    return connectionObject;
}

function insertStations(stations, callback) {
    var counter = stations.length;
    stations.forEach(function(s) {
        s.save(function(err, s) {
            if(err) {
                callback('An error has ocurred while storing stations: ' + err);
            }
            counter--;
            if(counter <= 0) {
                callback('Stations were stored correctly');
            }  
        });
    });
}

function insertStops(stops, callback) {
    var counter = stops.length;
    stops.forEach(function(s) {
        s.save(function(err, s) {
            if(err) {
                callback('An error has ocurred while storing stops: ' + err);
            }
            counter--;
            if(counter <= 0) {
                callback('Stops were stored correctly');
            }  
        });
    });
}

function insertRoutes(routes, callback) {
    var counter = routes.length;
    routes.forEach(function(r) {
        r.save(function(err, r) {
            if(err) {
                callback('An error has ocurred while storing routes: ' + err);
            }
            counter--;
            if(counter <= 0) {
                callback('Routes were stored correctly');
            }  
        });
    });
}

function insertDelays(delays, callback) {
    var counter = delays.length;
    delays.forEach(function(d) {
        d.save(function(err, d) {
            if(err) {
                callback('An error has ocurred while storing delays: ' + err);
            }
            counter--;
            if(counter <= 0) {
                callback('Delays were stored correctly');
            }  
        });
    });
}

function insertTrips(trips, callback) {
    var counter = trips.length;
    trips.forEach(function(t) {
        t.save(function(err, t) {
            if(err) {
                callback('An error has ocurred while storing trips: ' + err);
            }
            counter--;
            if(counter <= 0) {
                callback('Trips were stored correctly');
            }  
        });
    });
}

function insertConnections(connections, callback) {
    var counter = connections.length;
    connections.forEach(function(c) {
        c.save(function(err, c) {
            if(err) {
                callback('An error has ocurred while storing connections: ' + err);
            }
            counter--;
            if(counter <= 0) {
                callback('Connections were stored correctly');
            }  
        });
    });
}