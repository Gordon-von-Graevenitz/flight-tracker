import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { take } from 'rxjs';
import { FlightMockHttpService } from 'src/shared/flight-mock-http.service';
import { Flight } from 'src/shared/models/flight-model';

@Component({
  selector: 'app-flight-detail',
  templateUrl: './flight-detail.component.html',
  styleUrls: ['./flight-detail.component.scss']
})
export class FlightDetailComponent implements OnInit{
  @Input() selectedFlight: Flight;
  @Output() back = new EventEmitter<boolean>();
  allFlights: Array<Flight>;
  currentFlight: Flight;

  constructor(private flightService: FlightMockHttpService){}

  ngOnInit(): void {
    
    this.flightService.flightsObservable.pipe(take(1)).subscribe((value) => {
      this.currentFlight = value.filter((obj)=>{
        return obj.flightId === this.selectedFlight.flightId;
      })[0];
      console.log(this.currentFlight);
    })
  }

  getProgress(){
    return (this.currentFlight.distanceTravelInKm/this.currentFlight.totalDistanceInKm * 100);
  }
  
  goBack() {
    this.back.emit(true);
  }

  getIcon(): string{
    const progress = this.getProgress();
    if (progress < 10){
      return 'flight_takeoff';
    }
    else if (progress > 10 && progress < 90){
      return 'flight';
    }
    else if (progress > 90 && progress < 99.99){
      return 'flight_land';
    }
    else if (progress >= 100){
      return 'connecting_airports';
    } else
    {
      return 'airplanemode_inactive'
    }
  }

}
