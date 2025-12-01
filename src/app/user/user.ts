import { Component, Output,EventEmitter, Input, input, output } from '@angular/core';

@Component({
  selector: 'app-user',
  imports: [],
  templateUrl: './user.html',
  styleUrl: './user.css',
})
export class User {
  id = input.required<string>();
  userSelected = output<string>();

  SelectedUser(){
    this.userSelected.emit(this.id());
  }
}
