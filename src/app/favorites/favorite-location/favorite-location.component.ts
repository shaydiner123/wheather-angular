import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FavoritesService } from 'src/app/favorites.service';
import { Favorite } from 'src/app/models/Favorite';

@Component({
  selector: 'app-favorite-location',
  templateUrl: './favorite-location.component.html',
  styleUrls: ['./favorite-location.component.scss'],
})
export class FavoriteLocationComponent implements OnInit {
  @Input() favorite: Favorite;

  constructor(
    private favoritesService: FavoritesService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  onSeeForecastButtonClicked() {
    this.favoritesService.showForecastForFavoriteLocation(
      this.favorite.location
    );
    this.router.navigate(['/home']);
  }

  onRemoveButtonClicked() {
    this.favoritesService.removeFromFavorites(this.favorite.location.key);
  }
}
