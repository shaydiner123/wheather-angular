import {
  HttpClient,
  HttpErrorResponse,
  HttpParams,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { environment as env } from '../environments/environment';
import { AutoCompleteResult } from './home/search/AutoCompleteResult.model';
import { ForcastResult } from './models/FiveDaysForcastResult.model';
import { handleError } from './shared/handleHttpError';
import { Location } from './models/Location';
import { GeoPositionRes } from './models/GeoPositionRes';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { error } from 'selenium-webdriver';
import { Favorite } from './models/Favorite';
import { CurrentCondition } from './models/CurrentCondition';

@Injectable({
  providedIn: 'root',
})
export class WeatherService {
  fiveDaysForcastSubject = new BehaviorSubject<ForcastResult>(null);
  private errorSubject = new BehaviorSubject<string>('');

  errorData = this.errorSubject.asObservable();

  constructor(private http: HttpClient) {}

  getAutoCompletedLocations(location: string) {
    return this.http.get<AutoCompleteResult[]>(env.AUTO_COMPLETE_URL, {
      params: new HttpParams({
        fromObject: { apikey: env.WEATHER_API_KEY, q: location },
      }),
    });
  }

  get5DaysForcasts(location: Location): void {
    this.http
      .get<ForcastResult>(env.FORCAST_API_URL + location.key, {
        params: new HttpParams({
          fromObject: { apikey: env.WEATHER_API_KEY, metric: 'true' },
        }),
      })
      .subscribe(
        (forcasts) => {
          console.log(forcasts);
          forcasts.Location = location;
          this.fiveDaysForcastSubject.next(forcasts);
        },
        (e: HttpErrorResponse) => {
          handleError(e, this.errorSubject);
        }
      );
  }

  get5DaysForcastsByPosition(lat: number, lon: number): void {
    this.http
      .get<GeoPositionRes>(env.GEOPOSITION_URL, {
        params: new HttpParams({
          fromObject: { apikey: env.WEATHER_API_KEY, q: `${lat},${lon}` },
        }),
      })
      .pipe(
        tap((res: GeoPositionRes) => {
          this.get5DaysForcasts({
            city: res.LocalizedName,
            country: res.Country.LocalizedName,
            key: res.Key,
          });
        })
      )
      .subscribe(
        () => {},
        (error: HttpErrorResponse) => {
          handleError(error, this.errorSubject);
        }
      );
  }

  getFavoriteLocationCurrentWeather(
    locationKey: string
  ): Observable<{ locationKey: string; currentCondition: CurrentCondition }> {
    return this.http
      .get<CurrentCondition[]>(env.CURRENT_API_URL + locationKey, {
        params: new HttpParams({
          fromObject: { apikey: env.WEATHER_API_KEY },
        }),
      })
      .pipe(
        map((res) => {
          return { locationKey, currentCondition: res[0] };
        })
      );
  }
}
