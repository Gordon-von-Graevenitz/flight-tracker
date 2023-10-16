# FlightTracker

## Setup and run the project

After cloning, simply run:
```bash
# Install node modules
npm install

# Run Angular Project
npm run start
```

## Complete project view

To see the final project, please see the screenshots and videos found in `./Final-project` of what you will be building.

## Goal of the project

This project isn't meant to focus on CSS, so please don't worry about margins, padding or even if color's don't match up, you can eyeball it. Note this project has a CSS reset with font-size change so that 10 px = 1 rem (instead of the usual 16 px). 

Main focus is to get the project working and displaying the data. The following has been provided for you to help speed up the process:

- `src/shared/flight-mock-http.service.ts`, this is a mock flight service that generates and emits flight data for 600 flights every second. This is to prevent requiring a potential rated limited online API.
- Angular material, no need to import any modules, the project has it all ready for use, however if you prefer another design system like Bootstrap you are free to use it
- `src/shared` has the Flight[] data observable (bottom of `flight-mock-http.service.ts`), progress bar UI component and flight model to use
- Do not worry about responsive design, again CSS is not the focus

## Task at hand

Please see the attached video and screenshots to show you what needs to be built. We recommend tackling it in the following order:

1. Populate table with flight data from observable (with a more correct estimate that you need to calculate)
2. The total count of the different flights in the top right (0% to 10%, 10% to 90%, 90% to 99.9%, 100%)
3. On row click, open up to a detailed view of just that page

**Bonus**
These are simply bonus tasks, no need to do if you don't want to:
- Filtering on flight info (flight ID, gate)
- Coloured Icons

## Icons
```html
  <!-- ATC site logo -->
  <mat-icon aria-hidden="false" aria-label="Airplane Logo" fontIcon="airplanemode_inactive"></mat-icon>

  <!-- Taking off (0 to 10% of the flight distance) -->
  <mat-icon aria-hidden="false" aria-label="Taking off icon" fontIcon="flight_takeoff"></mat-icon>

  <!-- In flight (10 to 90% of the flight distance) -->
  <mat-icon ria-hidden="false" aria-label="In Flight icon" fontIcon="flight"></mat-icon>

  <!-- Landing (90 to 99.9% of the flight distance) -->
  <mat-icon aria-hidden="false" aria-label="Landing icon" fontIcon="flight_land"></mat-icon>

  <!-- Flight over (100% of the flight distance) -->
  <mat-icon aria-hidden="false" aria-label="Flight over icon" fontIcon="connecting_airports"></mat-icon>
  ```


## Additional

> Note this project was built with Node 16.19.0 (`node --version`) and [Angular CLI](https://github.com/angular/angular-cli) 15.1.5 (`ng version`). If you experience any problems use these settings.

CodeSubmit
Please organize, design, test and document your code as if it were going into production - then push your changes to the master branch. After you have pushed your code, you may submit the assignment on the assignment page.

All the best and happy coding,

The EPSza Team