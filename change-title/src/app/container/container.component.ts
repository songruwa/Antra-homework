import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-container',
  templateUrl: './container.component.html',
  styleUrls: ['./container.component.css']
})
export class ContainerComponent implements OnInit {
  currentColor: string = '';
  activeCard: string = ''; 

  constructor() { }

  ngOnInit(): void {
  }

  changeColor(color: string): void {
    this.currentColor = color;

  }

  setActiveCard(cardId: string): void {
    this.activeCard = cardId;
  }

}
