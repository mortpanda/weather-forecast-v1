import { TestBed } from '@angular/core/testing';

import { WeatherConditionsService } from './weather-conditions.service';

describe('WeatherConditionsService', () => {
  let service: WeatherConditionsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WeatherConditionsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
