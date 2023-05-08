import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { Movie, MoiveDetail } from '../movie.interface';

@Injectable({
  providedIn: 'root'
})
export class MovieService {
  private apiKey: string = '7234c6e70cb884a32961ffb587f82eae';
  moviesChanged = new Subject<Movie[]>();
  movieDetailChanged = new Subject<MoiveDetail>();

  constructor(private http: HttpClient) {}

  getMovies() {
    return this.http
      .get<{ [key: string]: Movie }>(
        'https://api.themoviedb.org/3/movie/popular?',
        {
          params: new HttpParams().set('api_key', this.apiKey),
        }
      )
      .pipe(
        map((response: any) => {
          const movieData: Movie[] = [];
          response.results.map((info: any) => {
            movieData.push({
              id: info.id,
              title: info.title,
              overview: info.overview,
              image: 'https://image.tmdb.org/t/p/w780' + info.poster_path,
            });
          });
          return movieData;
        })
      )
      .subscribe((data) => {
        this.moviesChanged.next(data);
      });
  }

  getMovieDetail(id: number) {
    return this.http
      .get('https://api.themoviedb.org/3/movie/' + id + '?', {
        params: new HttpParams().set('api_key', this.apiKey),
      })
      .pipe(
        map((response: any) => {
          return {
            id: response.id,
            title: response.title,
            overview: response.overview,
            rating: response.vote_average,
            releaseDate: response.release_date,
            homepage: response.homepage,
            genres: response.genres.map((genre: any) => genre.name),
            image: 'https://image.tmdb.org/t/p/w780' + response.poster_path,
          };
        })
      );
  }
}
