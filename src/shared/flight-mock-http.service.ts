import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Flight } from './models/flight-model';
import perlinNoise from './util/perlin';
import { faker } from '@faker-js/faker'
@Injectable({
  providedIn: 'root'
})
export class FlightMockHttpService {
  private _flights: Flight[] = [];

  constructor() {
    for (let i = 0; i < 600; i++) {
      this._flights.push(this.generateNewFakeFlight())
    }
  }

  generateNewFakeFlight(): Flight {
    const originAirport: string[] = this.generateFakeAirport();
    let destinationAirport: string[] = [];
    do {
      destinationAirport = this.generateFakeAirport();
    } while (destinationAirport === originAirport)

    const totalDistanceInKm = this.mapRange(Math.random(), 0, 1, 150, 600);
    const distanceTravelInKm = (Math.random() * totalDistanceInKm);

    const flight: Flight = {
      flightId: this.generateFlightId(),
      from: {name: originAirport[0], code: originAirport[1]},
      to: {name: destinationAirport[0], code: destinationAirport[1]},
      departureTime: this.randomDate(),
      arrivalTime: this.randomDate(),
      gate: faker.random.alpha().toUpperCase() + Math.floor(Math.random() * 10),
      totalDistanceInKm: totalDistanceInKm,
      altitude: this.naturalNoise(0, 33000, 42000),
      knots: this.naturalNoise(0, 400, 600),
      distanceTravelInKm: distanceTravelInKm
    }

    return flight;
  }

  private generateFakeAirport() {
    const airportName = faker.animal.cat();   // I know, I know, bear with me
    const airportWords = airportName.split(' ');
    let airportCode = '';

    if (airportWords.length >= 3) {
      airportCode = airportWords[0][0] + airportWords[1][0] + airportWords[2][0];
    } else if (airportWords.length === 2) {
      airportCode = airportWords[0][0] + airportWords[1][0] + airportWords[1][airportWords[1].length -1 ];
    } else {
      airportCode = airportWords[0][0] + airportWords[0][Math.floor(airportWords[0].length/2)] + airportWords[0][airportWords[0].length -1 ];
    }

    return [airportName, airportCode.toUpperCase()];
  }

  private generateFlightId(): string {
    let id = faker.random.alpha(2).toUpperCase() + " ";
    const probability = Math.random();

    if (probability <= 0.5) {
      id += faker.random.numeric(2);
    } else if (probability <= 0.8) {
      id += faker.random.numeric(3);
    } else {
      id += faker.random.numeric(4);
    }

    return id;
  }

  private mapRange(number: number, inMin: number, inMax: number, outMin: number, outMax: number): number {
    return (number - inMin) * (outMax - outMin) / (inMax - inMin) + outMin;
  }

  private updateFlights() {
    for (let i = 0; i < this._flights.length; i++) {
      if (this._flights[i].distanceTravelInKm < this._flights[i].totalDistanceInKm) {
        this.updateFlightSpeed(this._flights[i]);
        this.updateAltitude(this._flights[i]);
        this.updateDistanceTraveled(this._flights[i]);
      } else {
        this._flights[i].knots = 0;
        this._flights[i].altitude = 0;
      }
    }
  }

  private updateFlightSpeed(flight: Flight) {
    const proposedSpeed = this.naturalNoise(flight.knots, -10.0, 10.0);
    flight.knots = this.clamp(proposedSpeed, 400, 600);
  }

  private updateAltitude(flight: Flight) {
    const proposedAltitude = this.naturalNoise(flight.altitude, -100.0, 100.0);
    flight.altitude = this.clamp(proposedAltitude, 33000, 42000);
  }

  private updateDistanceTraveled(flight: Flight) {
    const proposedDistance = flight.distanceTravelInKm + (flight.knots / 1.944) / 1000.0;
    flight.distanceTravelInKm = this.clamp(proposedDistance, 0, flight.totalDistanceInKm);
  }

  private naturalNoise(num: number, low: number, high: number): number {
    const noise = perlinNoise(num, Math.random());
    return num + this.mapRange(noise, 0, 1, low, high);
  }

  private clamp(proposedValue: number, min: number, max: number) {
    return Math.min(Math.max(proposedValue, min), max);
  };

  private randomDate() {
    const now = new Date();
    const hoursAgo = now.getTime();
    const hoursLater = now.getTime() + (60 * 60 * 1000 * 2);
    const randomTimestamp = hoursAgo + Math.random() * (hoursLater - hoursAgo);
    return new Date(randomTimestamp);
  }


  // TODO: Subscribe to this observable for the mock datas
  flightsObservable = new Observable<Flight[]>(subscriber => {
    setInterval(() => {
      this.updateFlights();
      subscriber.next(this._flights);
    }, 1000)
  });
}
