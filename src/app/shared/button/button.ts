import { NgClass } from '@angular/common';
import { Component, Input, Output,EventEmitter } from '@angular/core';

@Component({
  selector: 'app-button',
  imports: [NgClass],
  templateUrl: './button.html',
  styleUrl: './button.css',
})
export class Button {
  @Input() label: string = 'לחץ';
  @Input() type: 'button' | 'submit' | 'reset' = 'button';
  @Input() className: string = 'btn btn-primary';
  @Output() clicked = new EventEmitter<void>();

  handleClick() {
    this.clicked.emit();
  }
}
