import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MovieService } from '../../../service/movie.service';

@Component({
  selector: 'app-youtube',
  templateUrl: './youtube.component.html',
  styleUrls: ['./youtube.component.css']
})
export class YoutubeComponent implements OnInit {

  keys: string[] = [];
  hasPoster_img = true;
  hasBackdrop_img = true;
  poster_img_high = '';
  backdrop_img_high = '';

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private movieService: MovieService) { }

  ngOnInit(): void {
    this.hasPoster_img = this.data.hasPoster_img;
    this.hasBackdrop_img = this.data.hasBackdrop_img;
    this.poster_img_high = this.data.poster_img_high;
    this.backdrop_img_high = this.data.backdrop_img_high;

    if (this.data.movieId) {
      this.movieService.getMovieVideo(this.data.movieId).subscribe((keys) => {
        this.keys = keys;
        console.log(this.keys);
      });
    }

    const tag = document.createElement('script');
    tag.src = 'https://www.youtube.com/iframe_api';
    document.body.appendChild(tag);
  }

  switchVideo(direction: string) {
    if (direction === 'left' && this.keys.length) {
      const removedKey: string | undefined = this.keys.shift();
      if (removedKey) {
        this.keys.push(removedKey);
      }
    } else if (direction === 'right' && this.keys.length) {
      const removedKey: string | undefined = this.keys.pop();
      if (removedKey) {
        this.keys.unshift(removedKey);
      }
    }
  }
}
