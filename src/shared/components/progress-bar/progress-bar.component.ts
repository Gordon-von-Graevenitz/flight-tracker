import { Component, Input } from '@angular/core';

// Segmented Progress Bar
// Source: https://stackoverflow.com/questions/74064423/progress-bar-with-breaks-in-angular

@Component({
  selector: 'app-progress-bar',
  template: `
    <!-- A better progress bar -->
    <div class="wrapper">
      <div class="progress" [style.width.%]="progress"></div>
      <div class="flex">
        <div *ngFor="let i of [0, 1, 2, 3, 4]"></div>
      </div>
    </div>
  `,
  styles: [`
      .wrapper {
        display: flex;
        flex-direction: column;
        width: 40rem;
        background-color: #4a6153;
      }
      .wrapper div {
        height: 1rem;
      }
      .flex {
        display: flex;
        justify-content: space-evenly;
        margin-top: -1rem;
      }
      .flex div {
        width: 0.24rem;
        background: #333;
      }
      .progress {
        background: #8eedb3;
      }
    `,
  ],
})
export class ProgressBarComponent {
  @Input() progress: number = 0;
}
