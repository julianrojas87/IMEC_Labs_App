import { Component } from '@angular/core';
import { TransportationService } from './services/transportation.service'; 

@Component({
  moduleId: module.id,
  selector: 'my-app',
  templateUrl: 'app.component.html',
  providers: [TransportationService]
})
export class AppComponent { }
