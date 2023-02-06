import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnChanges,
} from '@angular/core';
import { ChartData, ChartOptions } from 'chart.js';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChartComponent implements OnChanges {
  @Input() coordinates: { x: number; y: number }[] | null = null;
  @Input() label = 'chart';
  @Input() labelX = 'x';
  @Input() labelY = 'y';

  chartData: ChartData;
  options: ChartOptions;

  ngOnChanges(): void {
    if (this.coordinates) {
      this.chartData = {
        datasets: [
          {
            data: this.coordinates,
            label: this.label,
            fill: true,
            tension: 0.5,
            showLine: true,
            borderColor: 'rgb(46, 46, 255)',
            backgroundColor: 'rgba(46, 46, 255, .3)',
          },
        ],
      };
      this.options = {
        responsive: true,
        scales: {
          x: {
            display: true,
            title: {
              display: true,
              text: this.labelX,
            },
          },
          y: {
            display: true,
            title: {
              display: true,
              text: this.labelY,
            },
          },
        },
      };
    }
  }
}
