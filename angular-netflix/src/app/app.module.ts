import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HomePageComponent } from './component/home-page/home-page.component';
import { LoginPageComponent } from './component/login-page/login-page.component';
import { RegisterPageComponent } from './component/register-page/register-page.component';
import { NavbarComponent } from './component/navbar/navbar.component';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms';
import { MovieItemComponent } from './component/movie-item/movie-item.component';
import { MovieListComponent } from './component/movie-list/movie-list.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MovieDetailComponent } from './component/movie-detail/movie-detail.component';
import { HttpClientModule } from '@angular/common/http';






@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    LoginPageComponent,
    RegisterPageComponent,
    NavbarComponent,
    MovieItemComponent,
    MovieListComponent,
    MovieDetailComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
