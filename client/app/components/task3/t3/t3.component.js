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
var transportation_service_1 = require('../../../services/transportation.service');
var connection_1 = require('../../../model/connection');
var Task3Component = (function () {
    function Task3Component(transportationService) {
        var _this = this;
        this.transportationService = transportationService;
        this.loading = false;
        this.results = false;
        this.path = [];
        this.transportationService.getStations()
            .subscribe(function (stations) {
            _this.stations = stations;
        });
    }
    Task3Component.prototype.findPath = function () {
        var _this = this;
        if (this.departure == undefined || this.arrival == undefined || this.day == undefined
            || this.hour == undefined || this.minute == undefined) {
            alert('Please select a value for every field to perform a look up');
        }
        else if (this.departure == this.arrival) {
            alert('The Departure Station cannot be the same as the Arrival Station');
        }
        else {
            this.results = false;
            this.loading = true;
            var departureTime = '1970-01-' + this.formatNumber(this.day) + 'T' + this.formatNumber(this.hour)
                + ':' + this.formatNumber(this.minute) + ':00.000Z';
            this.transportationService.findLinkedConnection(this.departure, this.arrival, departureTime)
                .subscribe(function (path) {
                _this.loading = false;
                if (typeof path === 'string' && path.indexOf('error') >= 0) {
                    if (path === '{error:24 hours}') {
                        alert('No Connections were found in the next 24 hours. Please try a diferent Departure time.');
                    }
                    else {
                        alert('Limit date exceeded. Please try a previous Departure time.');
                    }
                }
                else {
                    _this.mapResults(path);
                    _this.results = true;
                }
            });
        }
    };
    Task3Component.prototype.mapResults = function (path) {
        for (var _i = 0, path_1 = path; _i < path_1.length; _i++) {
            var element = path_1[_i];
            var connection = new connection_1.Connection(this.transportationService);
            connection.id = element['@id'];
            connection.formatArrivalStop(element.arrivalStop);
            connection.formatArrivalTime(element.arrivalTime);
            connection.formatDepartureStop(element.departureStop);
            connection.formatDepartureTime(element.departureTime);
            connection.route = element['gtfs:route'];
            connection.trip = element['gtfs:trip'];
            connection.previous = element.previous;
            this.path.push(connection);
        }
    };
    Task3Component.prototype.ngAfterViewChecked = function () {
        if (this.stations != undefined) {
            $('.selectpicker').selectpicker();
        }
    };
    Task3Component.prototype.formatNumber = function (digit) {
        var formatted = digit < 10 ? '0' + digit.toString() : digit.toString();
        return formatted;
    };
    Task3Component = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'task3',
            templateUrl: 't3.component.html'
        }), 
        __metadata('design:paramtypes', [transportation_service_1.TransportationService])
    ], Task3Component);
    return Task3Component;
}());
exports.Task3Component = Task3Component;
//# sourceMappingURL=t3.component.js.map