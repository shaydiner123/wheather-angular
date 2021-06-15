import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { FavoritesComponent } from './favorites/favorites.component';
import { SearchComponent } from './home/search/search.component';
import { ForcastResultsComponent } from './home/forcast-results/forcast-results.component';
import { OneDayForcastComponent } from './home/forcast-results/one-day-forcast/one-day-forcast.component';
import { FormsModule } from '@angular/forms';
import { AccuweatherIconPipe } from './pipes/accuweather-icon.pipe';
import { FavoriteLocationComponent } from './favorites/favorite-location/favorite-location.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    FavoritesComponent,
    SearchComponent,
    ForcastResultsComponent,
    OneDayForcastComponent,
    AccuweatherIconPipe,
    FavoriteLocationComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule, FormsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
