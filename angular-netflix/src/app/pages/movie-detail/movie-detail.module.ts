import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MovieDetailRoutingModule } from './movie-detail-routing.module';
import { MovieDetailComponent } from './movie-detail/movie-detail.component';
import { MatCardModule } from "@angular/material/card";
import {SharedModule} from '../../shared/shared.module'
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { YoutubeComponent } from './youtube/youtube.component';
import { YouTubePlayerModule } from "@angular/youtube-player";



@NgModule({
  declarations: [
    MovieDetailComponent,
    YoutubeComponent,
  ],
  imports: [
    CommonModule,
    MovieDetailRoutingModule,
    MatCardModule,
    SharedModule,
    MatIconModule,
    MatDialogModule,
    YouTubePlayerModule,
  ]
})
export class MovieDetailModule { }
