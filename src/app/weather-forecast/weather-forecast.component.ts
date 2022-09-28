import { Component, OnInit } from '@angular/core';
import { ViewEncapsulation } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { ApiServiceService } from '../shared/api-service/api-service.service';
import { AppConfigService } from '../shared/app-config/app-config.service';
import { GeneralService } from '../shared/general-services/general.service';
import { WeatherConditionsService } from '../shared/weather-conditions/weather-conditions.service';
import { GetWeatherService } from '../shared/weather-service/get-weather.service';

@Component({
  selector: 'app-weather-forecast',
  templateUrl: './weather-forecast.component.html',
  styleUrls: ['./weather-forecast.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class WeatherForecastComponent implements OnInit {
  smallScreen: boolean;
  myAccessToken;
  strUserSession;
  strThisUser;
  strFullName;
  strForeCastLocations;
  arrForeCastLocations;
  myData;
  arrWeatherForecast = [];
  forecastStart;
  forecastEnd;
  dateRange;
  arrForecastData = [];
  weatherLocationData;
  dalyForecast: boolean;

  constructor(
    private breakpointObserver: BreakpointObserver,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private ApiServiceService: ApiServiceService,
    private AppConfigService: AppConfigService,
    private GeneralService: GeneralService,
    private WeatherConditionsService: WeatherConditionsService,
    private GetWeatherService: GetWeatherService,

  ) {
    this.dalyForecast = false;
    breakpointObserver.observe([
      Breakpoints.XSmall,
      Breakpoints.Small
    ]).subscribe(result => {
      this.smallScreen = result.matches;
    });

  }
  

  async ngOnInit() {

    this.myAccessToken = await this.GeneralService.getStorageToken()
    console.log(this.myAccessToken)
    this.myData = await this.ApiServiceService.getGoogleUserInfo(this.myAccessToken.access_token)
    switch ("error" in this.myData) {
      case true: {
        this.router.navigate(['/'])
        break;
      }
      case false: {
        var body
        body = await { name: this.myData.name }
        console.log(body)
        console.log(Date.now())
        console.log(Date.now() + 1 + 60 * 60 * 1000)

        this.strForeCastLocations = await this.GetWeatherService.getWeatherURL(this.AppConfigService.weatherLocationUri, this.myData.name);

        await console.log(this.strForeCastLocations)

        // this.arrForeCastLocations = await JSON.parse(this.strForeCastLocations);
        this.dateRange = await this.GetWeatherService.GetForecast(Date.now(), 4);
        this.forecastStart = await this.dateRange[0]
        this.forecastEnd = await this.dateRange[1]
        for (let i = 0; i < this.strForeCastLocations.length; ++i) {

          // console.log(this.strForeCastLocations[i])

          //   // console.log(this.arrForeCastLocations[i]);
          var apiUrl;
          apiUrl = await this.AppConfigService.weatherForecastUrl.replace(/<<intLat>>/g, this.strForeCastLocations[i].intLat).replace(/<<intLong>>/g, this.strForeCastLocations[i].intLong).replace(/<<startdate>>/g, this.forecastStart).replace(/<<enddate>>/g, this.forecastEnd);
          // console.log(apiUrl)

          this.weatherLocationData = await this.ApiServiceService.apiGetWeather(apiUrl)
          // console.log(this.weatherLocationData)
          await this.arrWeatherForecast.push(
            {
              location: this.strForeCastLocations[i],
              weatherdata: this.weatherLocationData,
            })

          this.arrForecastData = await this.GetWeatherService.processDailyForecast(this.arrWeatherForecast)
          await this.arrForecastData.sort(function (a, b) {
            return parseFloat(b.weatherdata.elevation) - parseFloat(a.weatherdata.elevation);
          })


        }
        this.dalyForecast = true;
        break;

      }
    }
    console.log(this.arrForecastData)
  }


   async openDetailedForecast(location) {
    // console.log(location);
    // this.DataService.changeMessage(location);
     await localStorage.removeItem('forecastDetails')
     await localStorage.setItem('forecastDetails',JSON.stringify(location))
     await this.router.navigate(['/forecast-details']);

  }

}

