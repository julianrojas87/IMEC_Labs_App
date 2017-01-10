import { Component } from '@angular/core';
import { TransportationService } from '../../../services/transportation.service';
import { Station } from '../../../model/station';
import { Stop } from '../../../model/stop';
import { Connection } from '../../../model/connection';

declare var $: any;

@Component({
    moduleId: module.id,
    selector: 'task3',
    templateUrl: 't3.component.html'
})
export class Task3Component {

    loading: boolean = false;
    results: boolean = false;
    stations: Station[];
    stop: Stop;
    departure: string;
    arrival: string;
    day: number;
    hour: number;
    minute: number;
    path: Connection[] = [];

constructor(private transportationService:TransportationService) {
    this.transportationService.getStations()
        .subscribe(stations => {
            this.stations = stations;
        });
}

findPath() {
    if (this.departure == undefined || this.arrival == undefined || this.day == undefined
        || this.hour == undefined || this.minute == undefined) {
        alert('Please select a value for every field to perform a look up');
    } else if(this.departure == this.arrival) {
        alert('The Departure Station cannot be the same as the Arrival Station');
    } else {
        this.results = false;
        this.loading = true;
        var departureTime = '1970-01-' + this.formatNumber(this.day) + 'T' + this.formatNumber(this.hour)
            + ':' + this.formatNumber(this.minute) + ':00.000Z';
        this.transportationService.findLinkedConnection(this.departure, this.arrival, departureTime)
            .subscribe((path:any) => {
                this.loading = false;
                if(typeof path === 'string' && path.indexOf('error') >= 0) {
                    if(path === '{error:24 hours}') {
                        alert('No Connections were found in the next 24 hours. Please try a diferent Departure time.');
                    } else {
                        alert('Limit date exceeded. Please try a previous Departure time.');
                    }
                } else {
                    this.mapResults(path);
                    this.results = true;
                }
            });
    }
}

mapResults(path:any) {
    for (let element of path) {
        var connection = new Connection(this.transportationService);
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
}


ngAfterViewChecked() {
    if (this.stations != undefined) {
        $('.selectpicker').selectpicker();
    }
}

formatNumber(digit:number) {
    var formatted = digit < 10 ? '0' + digit.toString() : digit.toString();
    return formatted;
}
}
