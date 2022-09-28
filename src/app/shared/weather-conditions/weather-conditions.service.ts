import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class WeatherConditionsService {

  constructor() { }

  weatherConditions = [
    {
      code: '0',
      description: 'Clear sky',
    },
    {
      code: '1',
      description: 'Mainly clear',
    },
    {
      code: '2',
      description: 'Partly cloudy',
    },
    {
      code: '3',
      description: 'Overcast',
    },
    {
      code: '45',
      description: 'Fog',
    },
    {
      code: '48',
      description: 'Fog',
    },
    {
      code: '51',
      description: 'Drizzle',
    },
    {
      code: '53',
      description: 'Drizzle',
    },
    {
      code: '55',
      description: 'Drizzle',
    },
    {
      code: '56',
      description: 'Cold drizzle',
    },
    {
      code: '57',
      description: 'Cold drizzle',
    },
    {
      code: '61',
      description: 'Rain',
    },
    {
      code: '63',
      description: 'Rain',
    },
    {
      code: '65',
      description: 'Rain',
    },
    {
      code: '66',
      description: 'Cold rain',
    },
    {
      code: '67',
      description: 'Cold rain',
    },
    {
      code: '71',
      description: 'Snow',
    },
    {
      code: '73',
      description: 'Snow',
    },
    {
      code: '75',
      description: 'Snow',
    },
    {
      code: '77',
      description: 'Snow',
    },
    {
      code: '80',
      description: 'Rain showers',
    },
    {
      code: '81',
      description: 'Rain showers',
    },
    {
      code: '82',
      description: 'Rain showers',
    },
    {
      code: '85',
      description: 'Snow showers',
    },
    {
      code: '86',
      description: 'Snow showers',
    },
    {
      code: '95',
      description: 'Heavy rain',
    },
    {
      code: '96',
      description: 'Heavy rain',
    },
    {
      code: '99',
      description: 'Heavy rain',
    },
  ]

  matchWeatherCodeDesc(weatherCode, array) {
    const result = array.find(({ code }) => code === JSON.stringify(weatherCode)).description;
    // console.log(result)
    return result;
  }
}
