import { TestBed } from '@angular/core/testing';

import { WeatherConfigService } from './weather-config.service';

describe('OktaConfigService', () => {
  let service: WeatherConfigService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WeatherConfigService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
