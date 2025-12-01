import { Component } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { AddTask } from './task/add-task/add-task';
import { Header } from './header/header';
import { type TaskModel } from '../model/task';
import { Button } from './shared/button/button';
import { StatusNamePipe } from '../pipes/status-name.pipe';
import { PriorityNamePipe } from '../pipes/priority-name.pipe';
import { RouterLink, RouterOutlet } from '@angular/router';
import { TaskService } from '../services/taskService.service';
import { Loader } from './shared/loader/loader';

@Component({
  selector: 'app-root',
  imports: [CommonModule,AddTask, Header, Button, DatePipe,StatusNamePipe,PriorityNamePipe, RouterLink,RouterOutlet,Loader],
  templateUrl: './app.html',
  styleUrl: './app.css',
})

export class App {
  constructor(public taskService:TaskService) {
    this.taskService.loadTasks();
  }

 isAdding = false;

 startAdding(){
  this.isAdding = true;
 }

 stopAdding(){
  this.isAdding = false;
 }

 deletedTask(id: string) {
  this.taskService.deleteTask(id);
  }
}
