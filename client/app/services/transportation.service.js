"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var http_1 = require('@angular/http');
require('rxjs/Rx');
//import 'rxjs/add/operator/map';
var TransportationService = (function () {
    function TransportationService(http) {
        this.http = http;
        console.log('Transportation Service Initialized...');
    }
    TransportationService.prototype.getStations = function () {
        return this.http.get('/api/stations').map(function (res) { return res.json(); });
    };
    TransportationService.prototype.getStops = function () {
        return this.http.get('/api/stops').map(function (res) { return res.json(); });
    };
    TransportationService.prototype.getStopByStationName = function (name) {
        return this.http.get('/api/stop/' + name).map(function (res) { return res.json(); });
    };
    TransportationService.prototype.getStationByStopId = function (id) {
        return this.http.get('/api/station?id=' + id).map(function (res) { return res.json(); });
    };
    TransportationService.prototype.findLinkedConnection = function (departure, arrival, time) {
        return this.http.get('/api/find_path?origin=' + departure + '&destiny=' + arrival + '&time=' + time)
            .map(function (res) { return res.json(); });
    };
    TransportationService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http])
    ], TransportationService);
    return TransportationService;
}());
exports.TransportationService = TransportationService;
//# sourceMappingURL=transportation.service.js.map