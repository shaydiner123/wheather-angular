import { Component, OnInit } from '@angular/core';
import { FavoritesService } from '../favorites.service';
import { Favorite } from '../models/Favorite';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.scss'],
})
export class FavoritesComponent implements OnInit {
  favorites: Favorite[];

  constructor(private favoritesService: FavoritesService) {}

  ngOnInit(): void {
    this.favoritesService.initFavoritesCurrentCondition();
    this.favoritesService.favoritesSubject.subscribe(
      (favorites: Favorite[]) => {
        this.favorites = favorites;
      }
    );
  }
}
