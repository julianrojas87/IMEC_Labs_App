import { TransportationService } from '../services/transportation.service';

export class Connection {
    id: string;
    arrivalStop: string;
    arrivalTime: string;
    departureStop: string;
    departureTime: string;
    route: string;
    trip: string;
    previous: string;

    monthNames: string[] = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];

    constructor(public transportationService:TransportationService) {}

    formatArrivalStop(arrival:string) {
        this.transportationService.getStationByStopId(arrival)
            .subscribe(station => {
                this.arrivalStop = station.label;
            });
    }

    formatDepartureStop(departure:string) {
        this.transportationService.getStationByStopId(departure)
            .subscribe(station => {
                this.departureStop = station.label;
            });
    }

    formatArrivalTime(time:string) {
        var date = new Date(time);
        var day = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
        var hour = date.getUTCHours() < 10 ? '0' + date.getUTCHours() : date.getUTCHours();
        var minute = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes();
        this.arrivalTime = date.getFullYear() + '/' + this.monthNames[date.getMonth()] + '/' + day + ' - ' + hour + ':' + minute;
    }

    formatDepartureTime(time:string) {
        var date = new Date(time);
        var day = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
        var hour = date.getUTCHours() < 10 ? '0' + date.getUTCHours() : date.getUTCHours();
        var minute = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes();
        this.departureTime = date.getFullYear() + '/' + this.monthNames[date.getMonth()] + '/' + day + ' - ' + hour + ':' + minute;
    }
}