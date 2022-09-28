import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ButtonModule } from 'primeng/button';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { MenuModule } from 'primeng/menu';
import { RippleModule } from 'primeng/ripple';
import { MenubarModule } from 'primeng/menubar';
import { ToolbarModule } from 'primeng/toolbar';
import { SplitButtonModule } from 'primeng/splitbutton';
import { ImageModule } from 'primeng/image';
import { DockModule } from 'primeng/dock';
import { FlexLayoutModule } from '@angular/flex-layout';
import { InputTextModule } from 'primeng/inputtext';
import { TooltipModule } from 'primeng/tooltip';
import { LandingComponent } from './landing/landing.component';
import { StartComponent } from './start/start.component';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';
import { CurrentWeatherComponent } from './current-weather/current-weather.component';
import { WeatherForecastComponent } from './weather-forecast/weather-forecast.component';
import { ElevationDataComponent } from './elevation-data/elevation-data.component';
import { RadarComponent } from './radar/radar.component';
import { NationalWeatherComponent } from './national-weather/national-weather.component';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { ToolbarComponent } from './shared/toolbar/toolbar.component';
import { MobileToolbarComponent } from './shared/mobile-toolbar/mobile-toolbar.component';
import { PrimeIcons } from 'primeng/api';
import { WebToolbarComponent } from './shared/web-toolbar/web-toolbar.component';
import { ForecastDetailsComponent } from './forecast-details/forecast-details.component';
import { DatePipe } from '@angular/common';
import { ChartModule } from 'primeng/chart';
import { DialogModule } from 'primeng/dialog';
import { SpeedDialModule } from 'primeng/speeddial';
import { FormsModule } from '@angular/forms';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { ProgressBarModule } from 'primeng/progressbar';
@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LandingComponent,
    StartComponent,
    CurrentWeatherComponent,
    WeatherForecastComponent,
    ElevationDataComponent,
    RadarComponent,
    NationalWeatherComponent,
    ToolbarComponent,
    MobileToolbarComponent,
    WebToolbarComponent,
    ForecastDetailsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ButtonModule,
    MenuModule,
    RippleModule,
    BrowserAnimationsModule,
    MenubarModule,
    ToolbarModule,
    SplitButtonModule,
    ImageModule,
    DockModule,
    FlexLayoutModule,
    InputTextModule,
    TooltipModule,
    RouterModule,
    HttpClientModule,
    ProgressSpinnerModule,
    ChartModule,
    DialogModule,
    SpeedDialModule,
    FormsModule,
    ToastModule,
    ProgressBarModule,
  ],

  providers: [HttpClientModule, DatePipe, MessageService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
