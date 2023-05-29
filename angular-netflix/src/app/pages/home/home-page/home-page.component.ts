import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {
  email: string = '';

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  signUp(): void {
    this.router.navigate(['/register'], { queryParams: { email: this.email } });
    console.log("the email I wanna register is:" + this.email);
  }
  
}
