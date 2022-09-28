import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ChartjsConfigService {

forecastChartOptions = {
  plugins: {
    legend: {
      display: true,
      labels: {
        color: '#FFFFFF',
        font:{
          size:4,
        },
      }

    }
  },
  scales: {
    x: {
      ticks: {
        color: '#FFFFFF',
        
      },
      grid: {
        color: '#b8b8b8'
      },
    },
    y: {
      title: {
        display: true,
        text: 'Temperature ℃',
        color: '#FFFFFF',
      },
      type: 'linear',
      display: true,
      position: 'left',
      ticks: {
        color: '#FFFFFF',
        
        // precision: 1,
      },
      grid: {
        color: '#b8b8b8'
      }
    },
    y1: {
      title: {
        display: true,
        text: 'Humidity %',
        color: '#FFFFFF',
      },
      type: 'linear',
      // min: '0',
      // max: '1',
      position: 'right',
      ticks: {
        callback: function(value, index, values) {
          return value + ' %'},
        color: '#FFFFFF',
        // format: {
        //   style: 'percent'
        // }
      }
    },
    y2: {
      title: {
        display: true,
        text: 'Precipitation',
        color: '#FFFFFF',
      },
      type: 'linear',
      position: 'left',
      ticks: {
        color: '#495057'
    },
    }
  }
}

  constructor() { }
}
