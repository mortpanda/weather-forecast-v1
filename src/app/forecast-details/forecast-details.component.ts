import { Component, OnInit } from '@angular/core';
import { ViewEncapsulation } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { ApiServiceService } from '../shared/api-service/api-service.service';
import { AppConfigService } from '../shared/app-config/app-config.service';
import { GeneralService } from '../shared/general-services/general.service';
import { WeatherConditionsService } from '../shared/weather-conditions/weather-conditions.service';
import { DataService } from '../shared/data-service/data.service';
import { DatePipe } from '@angular/common';
import { GetWeatherService } from '../shared/weather-service/get-weather.service';
import { ChartjsConfigService } from '../shared/chartjs-config/chartjs-config.service';
import { Chart } from 'chart.js';
@Component({
  selector: 'app-forecast-details',
  templateUrl: './forecast-details.component.html',
  styleUrls: ['./forecast-details.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ForecastDetailsComponent implements OnInit {
  smallScreen: boolean;
  myFreocasrDetailsData: boolean;
  constructor(
    private breakpointObserver: BreakpointObserver,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private ApiServiceService: ApiServiceService,
    private AppConfigService: AppConfigService,
    private GeneralService: GeneralService,
    private WeatherConditionsService: WeatherConditionsService,
    private DataService: DataService,
    private DatePipe: DatePipe,
    private GetWeatherService: GetWeatherService,
    private ChartjsConfigService: ChartjsConfigService,
  ) {
    breakpointObserver.observe([
      Breakpoints.XSmall,
      Breakpoints.Small
    ]).subscribe(result => {
      this.smallScreen = result.matches;
    });
    // this.DataService.currentMessage.subscribe(message => (this.selectedMessage = message));
    this.myFreocasrDetailsData = false;
    this.LinebasicOptions = this.AppConfigService.forecastChartOptions;
  }


  myAccessToken;
  myData;
  arrResponse;
  arrCurrentWeather = [];
  selectedMessage: any;
  dateRange;
  forecastStart;
  forecastEnd;
  arrLocation;
  convertedTime = [];
  chardData;
  LinebasicOptions: any;
  arrDetailedForecast;

  async ngOnInit() {
    var cachedDetails;
    cachedDetails = await localStorage.getItem('forecastDetails')
    this.arrLocation = await JSON.parse(cachedDetails);
    await console.log(this.arrLocation)

    this.myAccessToken = await this.GeneralService.getStorageToken()
    console.log(this.myAccessToken)
    this.myData = await this.ApiServiceService.getGoogleUserInfo(this.myAccessToken.access_token)
    // console.log(this.myData.error.code)
    switch ("error" in this.myData) {
      case true: {
        this.router.navigate(['/'])
        break;
      }
      case false: {
        this.dateRange = await this.GetWeatherService.GetForecast(Date.now(), 2);
        this.forecastStart = await this.dateRange[0];
        this.forecastEnd = await this.dateRange[1];
        // console.log(this.selectedMessage)
        // console.log(this.dateRange)
        var apiUrl;
        apiUrl = await this.AppConfigService.forecastDetailsUrl.replace(/<<intLat>>/g, this.arrLocation.intLat).replace(/<<intLong>>/g, this.arrLocation.intLong).replace(/<<startdate>>/g, this.forecastStart).replace(/<<enddate>>/g, this.forecastEnd);
        console.log(apiUrl)

        var arrTempData;
        arrTempData = await this.ApiServiceService.apiGetWeather(apiUrl);
        arrTempData.hourly.weatherstring = await [];
        arrTempData.current_weather.weatherstring = await this.WeatherConditionsService.matchWeatherCodeDesc(arrTempData.current_weather.weathercode, this.WeatherConditionsService.weatherConditions)

        for (let i = 0; i < arrTempData.hourly.weathercode.length; ++i) {
          arrTempData.hourly.weatherstring[i] = await this.WeatherConditionsService.matchWeatherCodeDesc(arrTempData.hourly.weathercode[i], this.WeatherConditionsService.weatherConditions)
          this.convertedTime.push(this.DatePipe.transform(arrTempData.hourly.time[i], 'HH:mm MMM d', 'JST'))

        }
        this.chardData = {
          labels: this.convertedTime,
          datasets: [{
            data: arrTempData.hourly.temperature_2m,
            borderColor: '#428cff',
            borderWidth: '1',
            yAxisID: 'y',
            label: 'Temperature ℃',
            pointRadius: 1,
          },
          {
            data: arrTempData.hourly.relativehumidity_2m,
            borderColor: '#e04055',
            borderWidth: '1',
            label: 'Humidity',
            yAxisID: 'y1',
            pointRadius: 1,
          },
          {
            data: arrTempData.hourly.precipitation,
            borderColor: '#FFBF00',
            borderWidth: '1',
            label: 'Precipitation',
            yAxisID: 'y2',
            pointRadius: 1,
          },
          ],
        }

        this.arrDetailedForecast = await arrTempData;
        await console.log(this.arrDetailedForecast);

      }
    }
    this.myFreocasrDetailsData = true;
  }

}
