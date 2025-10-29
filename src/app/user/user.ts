import { Component, Output,EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'app-user',
  imports: [],
  templateUrl: './user.html',
  styleUrl: './user.css',
})
export class User {
  @Input({required: true}) id!:string;

  @Output() userSelected = new EventEmitter<string>();

  SelectedUser(){
    this.userSelected.emit(this.id);
  }
}
