import { OnDestroy } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { FavoritesService } from 'src/app/favorites.service';
import { ForcastResult } from 'src/app/models/FiveDaysForcastResult.model';
import { WeatherService } from 'src/app/weather.service';

@Component({
  selector: 'app-forcast-results',
  templateUrl: './forcast-results.component.html',
  styleUrls: ['./forcast-results.component.scss'],
})
export class ForcastResultsComponent implements OnInit, OnDestroy {
  forcasts: ForcastResult;
  forcastsSub: Subscription;

  constructor(
    private weatherService: WeatherService,
    private favoritesService: FavoritesService
  ) {}

  ngOnInit(): void {
    this.forcastsSub = this.weatherService.fiveDaysForcastSubject.subscribe(
      (forcasts) => {
        console.log(forcasts);
        this.forcasts = forcasts;
      }
    );
  }

  ngOnDestroy() {
    this.forcastsSub.unsubscribe();
  }

  addToFavorites() {
    this.favoritesService.addToFavorites({
      location: this.forcasts.Location,
      currentCondition: null,
      lastUpdated: null,
    });
  }
}
