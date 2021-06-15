import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OneDayForcastComponent } from './one-day-forcast.component';

describe('OneDayForcastComponent', () => {
  let component: OneDayForcastComponent;
  let fixture: ComponentFixture<OneDayForcastComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OneDayForcastComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OneDayForcastComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
