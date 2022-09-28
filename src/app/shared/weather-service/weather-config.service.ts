import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class WeatherConfigService {
  constructor() { }


  weatherApiKey = '3db778e229817cf109868d0833e123ec';
  weatherApipUrl = 'https://api.openweathermap.org/data/2.5/weather?';
  weatherLang = 'ja';
  weatherIconUrl = ' https://openweathermap.org/img/wn/';
}

