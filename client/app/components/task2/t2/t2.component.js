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
var stop_1 = require('../../../model/stop');
var Task2Component = (function () {
    function Task2Component(transportationService) {
        var _this = this;
        this.transportationService = transportationService;
        this.stop = new stop_1.Stop();
        this.transportationService.getStations()
            .subscribe(function (stations) {
            _this.stations = stations;
        });
    }
    Task2Component.prototype.onSelectStation = function (name) {
        var _this = this;
        this.transportationService.getStopByStationName(name)
            .subscribe(function (stop) {
            _this.stop = stop;
        });
    };
    Task2Component.prototype.ngAfterViewChecked = function () {
        if (this.stations != undefined) {
            $('.selectpicker').selectpicker();
        }
    };
    Task2Component = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'task2',
            templateUrl: 't2.component.html'
        }), 
        __metadata('design:paramtypes', [transportation_service_1.TransportationService])
    ], Task2Component);
    return Task2Component;
}());
exports.Task2Component = Task2Component;
//# sourceMappingURL=t2.component.js.map