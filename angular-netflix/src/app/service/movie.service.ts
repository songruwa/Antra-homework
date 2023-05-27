import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject, BehaviorSubject, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Movie } from './interface/movie.interface';
import { DiscoverMovie } from '../service/interface/discover-movie.interface';
// import { SearchMovieReturn } from '../service/interface/search-movie-return.interface';
import { SearchMovieDto } from './interface/search-movie-dto.interface';


@Injectable({
  providedIn: 'root'
})
export class MovieService {
  private apiKey: string = '7234c6e70cb884a32961ffb587f82eae';
  moviesChanged = new Subject<Movie[]>();
  // https://ultimatecourses.com/blog/angular-loading-spinners-with-router-events
  loading$ = new BehaviorSubject(false);

  private baseDiscoverMovie: DiscoverMovie = {
    api_key: '',
    page: 1,
    language: 'en-US',
    sort_by: 'popularity.desc',
    include_adult: false,
    include_video: false,
    with_watch_monetization_types: 'flatrate',
  };
  private baseSearchMovie: SearchMovieDto = {
    api_key: '',
    query: '',
    language: 'en-US',
    page: 1,
  };

  set setMyApiKey(api_key: string) {
    this.baseDiscoverMovie.api_key = api_key;
    this.baseSearchMovie.api_key = api_key;
  }

  constructor(private http: HttpClient) { }

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
              poster_path: 'https://image.tmdb.org/t/p/w780' + info.poster_path,
              release_date: info.release_date,
              original_language: info.original_language,
              vote_average: info.vote_average,
              adult: info.adult,
              first_air_date: info.first_air_date,
              genre_ids: info.genre_ids,
              original_title: info.original_title,
              backdrop_path: info.backdrop_path,
              popularity: info.popularity,
              vote_count: info.vote_count,
              video: info.video,
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
    this.loading$.next(true);
    return this.http
      .get('https://api.themoviedb.org/3/movie/' + id + '?', {
        params: new HttpParams().set('api_key', this.apiKey),
      })
      .pipe(
        map((response: any) => {
          this.loading$.next(false); // Make sure to indicate loading has finished after processing the data
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
        }),
        catchError(error => {
          this.loading$.next(false); // Make sure to indicate loading has finished even if there's an error
          return throwError(error);
        })
      );
  }


  getMovieVideo(id: number) {
    return this.http
      .get<{ id: number; results: Array<{ key: string }> }>(
        'https://api.themoviedb.org/3/movie/' + id + '/videos?',
        {
          params: new HttpParams().set('api_key', this.apiKey),
        }
      )
      .pipe(
        map((response: any) => {
          const keys = response.results.map((result: any) => result.key);
          return keys;
        })
      );
  }
  getMovieActors(movieId: number) {
    const url = `https://api.themoviedb.org/3/movie/${movieId}/credits?`;
    console.log('The URL is:', url);
  
    return this.http
      .get<{ cast: any[] }>(url, {
        params: new HttpParams().set('api_key', this.apiKey),
      })
      .pipe(
        map((response: any) => {
          console.log(response); 
          return response.cast;
        }),
        catchError(error => {
          return throwError(error);
        })
      );
  }
  
  getMoviePosters(movieId: number) {
    console.log(movieId);
    return this.http
      .get<{ posters: any[] }>(`https://api.themoviedb.org/3/movie/${movieId}/images?`, {
        params: new HttpParams().set('api_key', this.apiKey),
      })
      .pipe(
        map((response: any) => {
          console.log(response); 
          return response.posters;
        }),
        catchError(error => {
          return throwError(error);
        })
      );
  }

}
