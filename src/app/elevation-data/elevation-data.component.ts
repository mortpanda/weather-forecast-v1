import { Component, OnInit } from '@angular/core';
import { ViewEncapsulation } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { ApiServiceService } from '../shared/api-service/api-service.service';
import { AppConfigService } from '../shared/app-config/app-config.service';
import { GeneralService } from '../shared/general-services/general.service';
import { WeatherConditionsService } from '../shared/weather-conditions/weather-conditions.service';
@Component({
  selector: 'app-elevation-data',
  templateUrl: './elevation-data.component.html',
  styleUrls: ['./elevation-data.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ElevationDataComponent implements OnInit {
  smallScreen: boolean;
  myElevationData: boolean;
  constructor(
    private breakpointObserver: BreakpointObserver,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private ApiServiceService: ApiServiceService,
    private AppConfigService: AppConfigService,
    private GeneralService: GeneralService,
    private WeatherConditionsService: WeatherConditionsService,
  ) {
    breakpointObserver.observe([
      Breakpoints.XSmall,
      Breakpoints.Small
    ]).subscribe(result => {
      this.smallScreen = result.matches;
    });
    this.myElevationData = false;
  }

  myAccessToken;
  myData;
  arrResponse;
  arrElevation = [];
  async ngOnInit() {

    this.myAccessToken = await this.GeneralService.getStorageToken()
    console.log(this.myAccessToken)
    this.myData = await this.ApiServiceService.getGoogleUserInfo(this.myAccessToken.access_token)
    console.timeLog(this.myData)
    // console.log(this.myData.error.code)
    switch ("error" in this.myData) {
      case true: {
        this.router.navigate(['/'])
        break;
      }
      case false: {
        var body
        body = await { name: this.myData.name }
        // console.log(body)

        this.arrResponse = await this.ApiServiceService.InvokeOktaFlow(this.AppConfigService.weatherLocationUri, body)
        await console.log(this.arrResponse);

        for (let i = 0; i < this.arrResponse.length; ++i) {
          var apiUri;
          apiUri = this.AppConfigService.elevationUrl.replace(/<<intLat>>/g, this.arrResponse[i].intLat).replace(/<<intLong>>/g, this.arrResponse[i].intLong)
          // console.log(apiUri);

          var locationWeather;
          locationWeather = await this.ApiServiceService.apiGetWeather(apiUri);
          this.arrElevation[i] = {
            location: this.arrResponse[i],
            locationWeather
        };
        // this.myElevationData = true;
      }
      await this.arrElevation.sort(function (a, b) {
        return parseFloat(b.locationWeather.elevation[0]) - parseFloat(a.locationWeather.elevation[0]);
      })

        console.log(this.arrElevation)
      // for (let i = 0; i < this.arrCurrentWeather.length; ++i) {
      //   var weatherString;
      //   weatherString = await this.WeatherConditionsService.matchWeatherCodeDesc(this.arrCurrentWeather[i].locationWeather.current_weather.weathercode, this.WeatherConditionsService.weatherConditions);

      //   this.colCurrentWeather.push(this.arrCurrentWeather[i])
      //   this.colCurrentWeather[i].locationWeather.current_weather.weatherstring = weatherString;
      // }

      // await this.colCurrentWeather.sort(function (a, b) {
      //   return parseFloat(b.locationWeather.elevation) - parseFloat(a.locationWeather.elevation);
      // })
      // console.log(this.colCurrentWeather)
      // this.myCurrentWeather = true;
      // }
      }
    }
    this.myElevationData = true;
  }

  async openDetailedForecast(location) {
    // console.log(location);
    // this.DataService.changeMessage(location);
     await localStorage.removeItem('forecastDetails')
     await localStorage.setItem('forecastDetails',JSON.stringify(location))
     await this.router.navigate(['/forecast-details']);
    
  }

}
