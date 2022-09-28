import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { WeatherConfigService } from './weather-config.service';
import { BrowserModule } from '@angular/platform-browser';
import { DatePipe } from '@angular/common';
import { ApiServiceService } from '../../shared/api-service/api-service.service';
import { WeatherConditionsService } from '../weather-conditions/weather-conditions.service';
@Injectable({
  providedIn: 'root'
})
export class GetWeatherService {
  strWeatherBaseURL;
  arrWeatherInfo;
  dateToday;
  constructor(
    private WeatherConfigService: WeatherConfigService,
    private HttpClient: HttpClient,
    private DatePipe: DatePipe,
    private ApiServiceService: ApiServiceService,
    private WeatherConditionsService: WeatherConditionsService,
  ) {}

  async getDateToday() {
    var isoDate;
    var localDate;
    isoDate = new Date().toISOString()
    localDate = await this.DatePipe.transform(isoDate, 'YYYY-MM-dd', '+0900');
    return localDate
  }

  async GetWeather(url, api, lang, lat, lon) {
    this.strWeatherBaseURL = url + 'appid=' + api + '&lang=' + lang + '&lat=' + lat + '&lon=' + lon + '&units=metric';
    return this.HttpClient.get(this.strWeatherBaseURL)
      .toPromise()
      .then((res) => {
        const response: any = res;
        // console.log(response);
        return response;
      }).catch(function (err) {
        console.log(err);
      })
  }

  async GetForecast(dateToday, days) {
    var startDate
    startDate = this.DatePipe.transform(dateToday, 'yyyy-MM-dd')
    var endFullDate = new Date();
    var endDate;
    endFullDate.setDate(endFullDate.getDate() + days);
    endDate = this.DatePipe.transform(endFullDate, 'yyyy-MM-dd');

    return [startDate, endDate]
  }

  async processDailyForecast(array) {
    var newArray: any[] = [];
    var currentWeather;
    var forecastString = [];
    for (let i = 0; i < array.length; ++i) {
      currentWeather = await this.WeatherConditionsService.matchWeatherCodeDesc(array[i].weatherdata.current_weather.weathercode, this.WeatherConditionsService.weatherConditions)
      array[i].weatherdata.current_weather.weatherstring = await currentWeather;
      await newArray.push(array[i])
      newArray[i].weatherdata.daily.weatherstring = await []
      for (let j = 0; j < newArray[i].weatherdata.daily.weathercode.length; ++j) {
        forecastString = await this.WeatherConditionsService.matchWeatherCodeDesc(newArray[i].weatherdata.daily.weathercode[j], this.WeatherConditionsService.weatherConditions);
        await newArray[i].weatherdata.daily.weatherstring.push(forecastString)
      }
    }
    //console.log(newArray);
    return newArray;
  }
  async getWeatherURL(url, name) {
    var weatherFetchUrl;
    weatherFetchUrl = await this.ApiServiceService.InvokeOktaFlow(url, {
      name: name,
    })
    return weatherFetchUrl;
  }

}
