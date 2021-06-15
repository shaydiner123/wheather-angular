import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { WeatherService } from 'src/app/weather.service';
import { tap, take, debounceTime, switchMap } from 'rxjs/operators';
import { AutoCompleteResult } from './AutoCompleteResult.model';
import { Location } from '../../models/Location';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent implements OnInit {
  inputSubject = new Subject<string>();
  results: AutoCompleteResult[] = [];
  isShowSuugestions = false;
  isShowNoLocationsExistMessage = false;
  isSearching = false;
  searchInpuValue = '';
  errorMessage: string;

  constructor(private weatherService: WeatherService) {}

  ngOnInit(): void {
    this.inputSubject
      .pipe(
        tap((location: string) => {
          console.log(location);
        }),
        debounceTime(400),
        switchMap((location) => {
          return this.weatherService.getAutoCompletedLocations(location);
        })
      )
      .subscribe(
        (results: AutoCompleteResult[]) => {
          if (results.length > 0) {
            this.isShowSuugestions = true;
            console.log(results);
            this.results = results;
          } else {
            this.isShowNoLocationsExistMessage = true;
          }
        },
        (e) => {
          console.log(e);
        }
      );

    this.weatherService.fiveDaysForcastSubject.subscribe(() => {
      this.isSearching = false;
    });

    this.weatherService.errorData.subscribe((err: string) => {
      this.isSearching = false;
      this.errorMessage = err;
    });
  }

  onLocationInput(event: Event) {
    this.isShowNoLocationsExistMessage = false;
    this.inputSubject.next((<HTMLInputElement>event.target).value);
  }

  selectLocationSuggestion(result: AutoCompleteResult) {
    this.errorMessage = undefined;
    this.isSearching = true;
    this.searchInpuValue = '';
    this.isShowSuugestions = false;
    const location: Location = {
      city: result.LocalizedName,
      country: result.Country.LocalizedName,
      key: result.Key,
    };
    this.weatherService.get5DaysForcasts(location);
  }
}
