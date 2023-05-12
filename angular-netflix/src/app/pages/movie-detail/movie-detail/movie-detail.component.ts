import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MovieService } from '../../../service/movie.service';
import { MoiveDetail } from '../../../movie.interface';


@Component({
  selector: 'app-movie-detail',
  templateUrl: './movie-detail.component.html',
  styleUrls: ['./movie-detail.component.css']
})
export class MovieDetailComponent implements OnInit{
  movie!: MoiveDetail;
  movieId!: number;

  constructor(private route: ActivatedRoute, private movieService: MovieService) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.movieId = +params['id'];
      this.movieService.getMovieDetail(this.movieId).subscribe(movie => {
        this.movie = movie;
      });
    });
  }
}
