import { AfterViewInit, ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { FlightMockHttpService } from 'src/shared/flight-mock-http.service';
import { Flight } from 'src/shared/models/flight-model';
import { MatPaginator } from '@angular/material/paginator';
import { take } from 'rxjs';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss']
})
export class OverviewComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  displayedColumns: string[] = ['icon', 'flightId', 'to', 'arrivalTime', 'accEst', 'gate', 'percentComplete'];
  dataSource: MatTableDataSource<Flight> = new MatTableDataSource();
  allFlights: Array<Flight>;

  selectedItem: Flight;
  showTable = true;
  showDetail = false;

  takeOff = 0;
  landing = 0;
  inFlight = 0;

  constructor(private flightService: FlightMockHttpService, private cd: ChangeDetectorRef){
    this.flightService.flightsObservable.pipe(take(1)).subscribe((value) => {
      this.dataSource = new MatTableDataSource(value);
      this.allFlights = value;
      if (this.selectedItem){
        this.selectedItem = value.filter((obj)=>{
          return obj.flightId === this.selectedItem.flightId;
        })[0];
      }
      debugger;
      this.takeOff = this.getTakeOffTotal(value);
      this.landing = this.getlandingTotal(value);
      this.inFlight = this.getInFlightTotal(value);
    })
  }

  ngOnInit(): void {
    
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  openFlightDetail(flight: Flight){
    this.selectedItem = flight;
    this.showTable = false;
    this.showDetail = true;
  }

  toggleDetail(event: boolean){
    this.showTable = true;
    this.showDetail = false;
  }

  getPercent(item: Flight){
    return (item.distanceTravelInKm/item.totalDistanceInKm * 100).toFixed(2);
  }

  getTakeOffTotal(value: Array<Flight>){
    if (this.allFlights){
      return this.allFlights.filter((obj)=>{
        return parseFloat(this.getPercent(obj)) < 10;
      }).length;
    }
    return 0;
  }

  getInFlightTotal(value: Array<Flight>){
    if (this.allFlights){
      return this.allFlights.filter((obj)=>{
        const progress = parseFloat(this.getPercent(obj)) 
        return progress > 10 && progress < 90 ;
      }).length;
    }
    return 0;
  }

  getlandingTotal(value: Array<Flight>){
    if (this.allFlights){
      return this.allFlights.filter((obj)=>{
        const progress = parseFloat(this.getPercent(obj)) 
        return progress > 90 && progress < 99.99 ;
      }).length;
    }
    return 0;
  }
}
