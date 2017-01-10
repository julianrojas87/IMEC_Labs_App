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
var Task1Component = (function () {
    function Task1Component(transportationService) {
        var _this = this;
        this.transportationService = transportationService;
        this.transportationService.getStations()
            .subscribe(function (stations) {
            _this.stations = stations;
        });
        this.transportationService.getStops()
            .subscribe(function (stops) {
            _this.stops = stops;
        });
    }
    Task1Component = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'task1',
            templateUrl: 't1.component.html'
        }), 
        __metadata('design:paramtypes', [transportation_service_1.TransportationService])
    ], Task1Component);
    return Task1Component;
}());
exports.Task1Component = Task1Component;
//# sourceMappingURL=t1.component.js.map