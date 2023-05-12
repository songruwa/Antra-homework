import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './pages/home/home-page/home-page.component';
import { LoginPageComponent } from './pages/login/login-page/login-page.component';
import { RegisterPageComponent } from './pages/register/register-page/register-page.component';
import { MovieListComponent } from './pages/movie-list/movie-list/movie-list.component';
import { MovieDetailComponent } from './pages/movie-detail/movie-detail/movie-detail.component';


const routes: Routes = [
  // { path: '', component: HomePageComponent },
  // { path: 'login', component: LoginPageComponent },
  // { path: 'register', component: RegisterPageComponent },
  // { path: 'movies', component: MovieListComponent },
  // { path: 'movies/:id', component: MovieDetailComponent },
  { path: '', loadChildren: () => import('./pages/home/home.module').then(m => m.HomeModule) },
  { path: 'login', loadChildren: () => import('./pages/login/login.module').then(m => m.LoginModule) },
  { path: 'register', loadChildren: () => import('./pages/register/register.module').then(m => m.RegisterModule) },
  { path: 'movies', loadChildren: () => import('./pages/movie-list/movie-list.module').then(m => m.MovieListModule) },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
