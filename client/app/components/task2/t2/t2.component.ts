import { Component } from '@angular/core';
import { TransportationService } from '../../../services/transportation.service';
import { Station } from '../../../model/station';
import { Stop } from '../../../model/stop';

declare var $:any;

@Component({
  moduleId: module.id,
  selector: 'task2',
  templateUrl: 't2.component.html'
})
export class Task2Component { 

  stations : Station[];
  stop : Stop;
  name : string;

  constructor(private transportationService:TransportationService) {
      this.stop = new Stop();
      this.transportationService.getStations()
          .subscribe(stations => {
              this.stations = stations;
          });
  }

  onSelectStation(name:string) {
      this.transportationService.getStopByStationName(name)
        .subscribe(stop => {
            this.stop = stop;
        });
  }

  ngAfterViewChecked() {
      if(this.stations != undefined) {
          $('.selectpicker').selectpicker();
      }
  }
}
