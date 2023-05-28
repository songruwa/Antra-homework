import { Component, OnDestroy, OnInit, HostListener } from '@angular/core';
import { Subscription } from 'rxjs';
import { Movie } from 'src/app/service/interface/movie.interface';
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

  @HostListener("window:scroll", ["$event"])
  onWindowScroll() {
    // If we're near the bottom of the page, load more movies
    let position = (document.documentElement.scrollTop || document.body.scrollTop) + document.documentElement.offsetHeight;
    let max = document.documentElement.scrollHeight;
    if(position === max ) {
      this.movieService.loadMoreMovies();
    }
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
