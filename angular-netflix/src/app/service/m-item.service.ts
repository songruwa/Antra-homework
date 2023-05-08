import { Injectable } from '@angular/core';
import {HttpClient } from '@angular/common/http'
import { MoiveDetail,Movie } from '../movie.interface';
import { Subject, tap } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class MItemService {

  baseUrl = 'https://api.themoviedb.org/3/trending/all/week?api_key=7234c6e70cb884a32961ffb587f82eae';
  movies: MovieInterface[] = [];
  movies$ = new Subject();

  constructor(private http: HttpClient) { }

  getMovies() {
    return this.http.get(this.baseUrl).pipe(
      tap((response: any) => {
        this.movies = response.results;
        console.log(response.results);
        this.movies$.next(response.results);
      })
    )
  }
}
