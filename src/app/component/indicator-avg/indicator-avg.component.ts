import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'app-indicator-avg',
  templateUrl: './indicator-avg.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IndicatorAvgComponent {
  @Input() arr: number[] | null;
  @Input() name: string;

  get average() {
    return this.arr?.length ? this.calculateAverage(this.arr) : '-';
  }

  private calculateAverage(arr: number[]) {
    const sum = arr.reduce(
      (accumulator, currentValue) => accumulator + currentValue,
      0
    );
    return arr.length ? sum / arr.length : '-';
  }
}
