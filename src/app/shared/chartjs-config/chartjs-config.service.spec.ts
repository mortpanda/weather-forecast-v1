import { TestBed } from '@angular/core/testing';

import { ChartjsConfigService } from './chartjs-config.service';

describe('ChartjsConfigService', () => {
  let service: ChartjsConfigService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ChartjsConfigService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
