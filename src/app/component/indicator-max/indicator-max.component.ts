import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'app-indicator-max',
  templateUrl: './indicator-max.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IndicatorMaxComponent {
  @Input() arr: number[] | null;
  @Input() name: string;

  get max() {
    return this.arr?.length ? Math.max(...this.arr) : '-';
  }
}
