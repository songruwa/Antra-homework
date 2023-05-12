import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MovieListRoutingModule } from './movie-list-routing.module';
import { MovieListComponent } from './movie-list/movie-list.component';

import { MovieItemComponent } from './movie-item/movie-item.component'; 
import { SharedModule } from '../../shared/shared.module'; 



@NgModule({
  declarations: [
    MovieListComponent,
    MovieItemComponent
  ],
  imports: [
    CommonModule,
    MovieListRoutingModule,
    SharedModule,
  ]
})
export class MovieListModule { }
