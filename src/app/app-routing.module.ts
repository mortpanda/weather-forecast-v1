import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingComponent } from './landing/landing.component';
import { StartComponent } from './start/start.component';
import { CurrentWeatherComponent } from './current-weather/current-weather.component';
import { WeatherForecastComponent } from './weather-forecast/weather-forecast.component';
import { ElevationDataComponent } from './elevation-data/elevation-data.component';
import { RadarComponent } from './radar/radar.component';
import { NationalWeatherComponent } from './national-weather/national-weather.component';
import { ForecastDetailsComponent } from './forecast-details/forecast-details.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: LandingComponent },
  { path: 'start', component: StartComponent },
  { path: 'current-weather', component: CurrentWeatherComponent },
  { path: 'weather-forecast', component: WeatherForecastComponent },
  { path: 'elevation-data', component: ElevationDataComponent },
  { path: 'radar', component:  RadarComponent},
  { path: 'national-weather', component:  NationalWeatherComponent},
  { path: 'forecast-details', component:  ForecastDetailsComponent},
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
