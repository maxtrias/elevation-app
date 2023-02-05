import { Component, Input, OnChanges } from '@angular/core';
import { ChartData, ChartOptions } from 'chart.js';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss'],
})
export class ChartComponent implements OnChanges {
  @Input() coordinates: { x: number; y: number }[] | null = null;

  chartData: ChartData;

  readonly options: ChartOptions = {
    responsive: true,
    scales: {
      x: {
        display: true,
        title: {
          display: true,
          text: 'distance',
        },
      },
      y: {
        display: true,
        title: {
          display: true,
          text: 'elevation',
        },
      },
    },
  };

  ngOnChanges(): void {
    if (this.coordinates) {
      this.chartData = {
        datasets: [
          {
            data: this.coordinates,
            label: 'Elevation',
            fill: true,
            tension: 0.5,
            showLine: true,
            borderColor: 'rgb(46, 46, 255)',
            backgroundColor: 'rgba(46, 46, 255, .3)',
          },
        ],
      };
    }
  }
}
