import { Airport } from "./airport";

// TODO: You will receive an array of these when subscribing to the mock observable in flight-mock-http.service.ts
export interface Flight {
  flightId: string;
  from: Airport;
  to: Airport;
  departureTime: Date;
  arrivalTime: Date;
  gate: string;
  totalDistanceInKm: number;    // Distance between origin (to) and destination (from) cities

  // Per second data
  altitude: number;
  knots: number;
  distanceTravelInKm: number;
}
