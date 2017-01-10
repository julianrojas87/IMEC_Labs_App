import {Injectable} from '@angular/core';
import {Http, Headers} from '@angular/http';
import 'rxjs/Rx';
//import 'rxjs/add/operator/map';

@Injectable()
export class TransportationService {

    constructor(private http:Http) {
        console.log('Transportation Service Initialized...');
    }
    
    getStations() {
        return this.http.get('/api/stations').map(res => res.json());
    }

    getStops() {
        return this.http.get('/api/stops').map(res => res.json());
    }

    getStopByStationName(name:string) {
        return this.http.get('/api/stop/' + name).map(res => res.json());
    }

    getStationByStopId(id:string) {
        return this.http.get('/api/station?id=' + id).map(res => res.json());
    }

    findLinkedConnection(departure:string, arrival:string, time:string) {
        return this.http.get('/api/find_path?origin=' + departure + '&destiny=' + arrival + '&time=' + time)
            .map(res => res.json()); 
    }
}