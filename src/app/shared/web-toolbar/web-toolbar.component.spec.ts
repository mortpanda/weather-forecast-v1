import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WebToolbarComponent } from './web-toolbar.component';

describe('WebToolbarComponent', () => {
  let component: WebToolbarComponent;
  let fixture: ComponentFixture<WebToolbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WebToolbarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WebToolbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
