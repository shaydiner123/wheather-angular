import { Component, OnInit } from '@angular/core';
import { FavoritesService } from '../favorites.service';
import { ForcastResult } from '../models/FiveDaysForcastResult.model';
import { WeatherService } from '../weather.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  //default tel aviv
  currentLat = 32.109333;
  currentLon = 34.855499;

  constructor(
    private weatherService: WeatherService,
    private favoritesService: FavoritesService
  ) {}

  ngOnInit(): void {
    if (!this.favoritesService.isUserAskedForFavLocationForecast) {
      if (!navigator.geolocation) {
        console.log('Geolocation is not supported by your browser');
        //get the defualt forcast (tel aviv or some favorite location that has been selected)
        this.weatherService.get5DaysForcastsByPosition(
          this.currentLat,
          this.currentLon
        );
      } else {
        console.log('Locating…');
        navigator.geolocation.getCurrentPosition(
          (position) => {
            console.log('success');
            this.weatherService.get5DaysForcastsByPosition(
              position.coords.latitude,
              position.coords.longitude
            );
          },
          (error) => {
            console.log('error: ' + error.message);
            this.weatherService.get5DaysForcastsByPosition(
              this.currentLat,
              this.currentLon
            );
          }
        );
      }
    }
  }
}
