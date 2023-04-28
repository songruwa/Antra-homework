import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {
  @Input() cardTitle?: string;
  @Input() buttonLabel?: string;
  @Input() color?: string;
  @Input() dummyContent?: string;
  @Input() activeColor?: string;
  @Output() colorChanged = new EventEmitter<string>();
  @Input() cardId?: string;
  @Input() active: boolean = false;
  @Output() cardClicked = new EventEmitter<string>(); 


  borderColor?: string;
  borderStyle?: string;

  constructor() { }

  ngOnInit(): void {
  }

  setColor(color?: string): void {
    if (color) {
      this.active = !this.active;
      this.borderColor = this.active ? color : undefined;

      if (this.active && this.cardId) {
        this.cardClicked.emit(this.cardId);
      }

      this.colorChanged.emit(color);
    }
  }

}
