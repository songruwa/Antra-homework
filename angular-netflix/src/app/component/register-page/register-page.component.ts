import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.css']
})
export class RegisterPageComponent implements OnInit {
  step: number = 1;

  constructor() { }

  ngOnInit(): void {
  }

  nextStep(): void {
    this.step++;
  }

}
