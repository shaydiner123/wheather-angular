import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ForcastResultsComponent } from './forcast-results.component';

describe('ForcastResultsComponent', () => {
  let component: ForcastResultsComponent;
  let fixture: ComponentFixture<ForcastResultsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ForcastResultsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ForcastResultsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
