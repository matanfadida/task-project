import { Component } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { AddTask } from './task/add-task/add-task.js';
import { Header } from './header/header.js';
import { type TaskModel } from '../model/task.js';
import { Button } from './shared/button/button.js';
import { StatusNamePipe } from '../pipes/status-name.pipe.js';
import { PriorityNamePipe } from '../pipes/priority-name.pipe.js';
import { RouterLink, RouterOutlet } from '@angular/router';
import { TaskService } from '../services/taskService.service.js';
@Component({
  selector: 'app-root',
  imports: [CommonModule,AddTask, Header, Button, DatePipe,StatusNamePipe,PriorityNamePipe, RouterLink,RouterOutlet],
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
