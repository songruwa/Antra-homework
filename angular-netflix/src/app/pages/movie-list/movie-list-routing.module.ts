import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MovieListComponent } from './movie-list/movie-list.component';
import { MovieGuard } from 'src/app/service/guard/movie.guard';

const routes: Routes = [
  { path: '', component: MovieListComponent },
  { path: ':id', loadChildren: () => import('../movie-detail/movie-detail.module').then(m => m.MovieDetailModule), canActivate: [MovieGuard] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MovieListRoutingModule { }
