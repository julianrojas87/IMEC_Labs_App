"use strict";
var Connection = (function () {
    function Connection(transportationService) {
        this.transportationService = transportationService;
        this.monthNames = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
    }
    Connection.prototype.formatArrivalStop = function (arrival) {
        var _this = this;
        this.transportationService.getStationByStopId(arrival)
            .subscribe(function (station) {
            _this.arrivalStop = station.label;
        });
    };
    Connection.prototype.formatDepartureStop = function (departure) {
        var _this = this;
        this.transportationService.getStationByStopId(departure)
            .subscribe(function (station) {
            _this.departureStop = station.label;
        });
    };
    Connection.prototype.formatArrivalTime = function (time) {
        var date = new Date(time);
        var day = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
        var hour = date.getUTCHours() < 10 ? '0' + date.getUTCHours() : date.getUTCHours();
        var minute = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes();
        this.arrivalTime = date.getFullYear() + '/' + this.monthNames[date.getMonth()] + '/' + day + ' - ' + hour + ':' + minute;
    };
    Connection.prototype.formatDepartureTime = function (time) {
        var date = new Date(time);
        var day = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
        var hour = date.getUTCHours() < 10 ? '0' + date.getUTCHours() : date.getUTCHours();
        var minute = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes();
        this.departureTime = date.getFullYear() + '/' + this.monthNames[date.getMonth()] + '/' + day + ' - ' + hour + ':' + minute;
    };
    return Connection;
}());
exports.Connection = Connection;
//# sourceMappingURL=connection.js.map