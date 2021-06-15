import { Component, Input, OnInit } from '@angular/core';
import {
  DailyForecast,
  ForcastResult,
  TwelveHoursPeriod,
} from 'src/app/models/FiveDaysForcastResult.model';

@Component({
  selector: 'app-one-day-forcast',
  templateUrl: './one-day-forcast.component.html',
  styleUrls: ['./one-day-forcast.component.scss'],
})
export class OneDayForcastComponent implements OnInit {
  @Input() forcast: DailyForecast;
  isDay = true;
  twelveHoursToShow: TwelveHoursPeriod;
  constructor() {}

  ngOnInit(): void {
    this.twelveHoursToShow = this.isDay ? this.forcast.Day : this.forcast.Night;
  }

  switchPeriod() {
    this.isDay = !this.isDay;
    this.twelveHoursToShow = this.isDay ? this.forcast.Day : this.forcast.Night;
  }
}
