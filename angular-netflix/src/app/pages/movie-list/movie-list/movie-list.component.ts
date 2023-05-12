import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Movie } from '../../../movie.interface';
import { MovieService } from '../../../service/movie.service';

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.css']
})
export class MovieListComponent implements OnInit, OnDestroy {
  movies!: Movie[];
  subscription!: Subscription;

  constructor(private movieService: MovieService) {}

  ngOnInit() {
    this.subscription = this.movieService.moviesChanged.subscribe(
      (movies: Movie[]) => {
        this.movies = movies;
      }
    );
    this.movieService.getMovies();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
