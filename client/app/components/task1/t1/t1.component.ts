import { Component } from '@angular/core';
import { TransportationService } from '../../../services/transportation.service';
import { Station } from '../../../model/station';
import { Stop } from '../../../model/stop';

@Component({
  moduleId: module.id,
  selector: 'task1',
  templateUrl: 't1.component.html'
})
export class Task1Component { 

  stations: Station[];
  stops: Stop[];

  constructor(private transportationService:TransportationService) {
      this.transportationService.getStations()
        .subscribe(stations => {
            this.stations = stations;
        });

      this.transportationService.getStops()
        .subscribe(stops => {
            this.stops = stops;
        });
  }
}
