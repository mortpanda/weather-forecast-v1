import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NationalWeatherComponent } from './national-weather.component';

describe('NationalWeatherComponent', () => {
  let component: NationalWeatherComponent;
  let fixture: ComponentFixture<NationalWeatherComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NationalWeatherComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NationalWeatherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
