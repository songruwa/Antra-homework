import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Movie } from 'src/app/service/interface/movie.interface';
import { MovieService } from '../../../service/movie.service'; 


@Component({
  selector: 'app-movie-item',
  templateUrl: './movie-item.component.html',
  styleUrls: ['./movie-item.component.css']
})
export class MovieItemComponent implements OnInit {
  @Input() movie!: Movie;
  loading$ = this.movieService.loading$; 

  constructor(private router: Router, private movieService: MovieService) {}

  ngOnInit(): void {}

  onClick() {
    this.router.navigate(['/movies', this.movie.id]);
  }
}
