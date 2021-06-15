import { HttpErrorResponse, JsonpClientBackend } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, from } from 'rxjs';
import { CurrentCondition } from './models/CurrentCondition';
import { Favorite } from './models/Favorite';
import { WeatherService } from './weather.service';
import { Location } from './models/Location';

@Injectable({
  providedIn: 'root',
})
export class FavoritesService {
  constructor(private weatherService: WeatherService) {}

  private _favorites: Favorite[] = [];
  private _isUserAskedForFavLocationForecast: boolean;

  get favorites() {
    return JSON.parse(JSON.stringify(this._favorites));
  }

  get isUserAskedForFavLocationForecast() {
    return this._isUserAskedForFavLocationForecast;
  }

  favoritesSubject = new BehaviorSubject<Favorite[]>([]);

  initFavoritesCurrentCondition() {
    let index = 0;
    for (let favorite of this._favorites) {
      this.weatherService
        .getFavoriteLocationCurrentWeather(favorite.location.key)
        .subscribe(
          (res: {
            locationKey: string;
            currentCondition: CurrentCondition;
          }) => {
            let favLocation = this._favorites.find(
              (f) => f.location.key === res.locationKey
            );
            favLocation.currentCondition = res.currentCondition;
            favLocation.lastUpdated = new Date();
            if (index === this._favorites.length) {
              console.log(this._favorites);
              this.favoritesSubject.next(this.favorites);
            }
          },
          (err: HttpErrorResponse) => {
            console.log(err);
          }
        );
      index++;
    }
  }

  addToFavorites(favorite: Favorite) {
    const isAlreadyIncluded =
      this._favorites.filter((f) => {
        return f.location.key === favorite.location.key;
      }).length !== 0;
    if (!isAlreadyIncluded) this._favorites.push(favorite);
  }

  removeFromFavorites(locationKey: string) {
    this._favorites = this._favorites.filter((fav) => {
      return fav.location.key !== locationKey;
    });
    this.favoritesSubject.next(this.favorites);
  }

  showForecastForFavoriteLocation(location: Location): void {
    this._isUserAskedForFavLocationForecast = true;
    this.weatherService.get5DaysForcasts(location);
  }
}
