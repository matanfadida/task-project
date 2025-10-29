// task.service.ts
import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { type TaskModel } from '../model/task';
import { type AddTaskModel } from '../model/AddTask';

@Injectable({ providedIn: 'root' })
export class TaskService {
  tasks = signal<TaskModel[]>([]); 

  constructor(private http: HttpClient) {}

  loadTasks() {
    this.http.get<TaskModel[]>('https://localhost:44397/tasks')
      .subscribe(data => this.tasks.set(data));
  }

  addTask(task: AddTaskModel) {
    return this.http.post(`https://localhost:44397/tasks`, task)
      .subscribe(() => {
        this.loadTasks();
      });
  }

  updateTask(task: TaskModel) {
    return this.http.put(`https://localhost:44397/tasks/${task.id}`, task)
      .subscribe(() => {
        this.loadTasks();
      });
  }

  deleteTask(id: string) {
    return this.http.delete(`https://localhost:44397/tasks/${id}`)
      .subscribe(() => this.loadTasks());
  }

  getTask(id: string) {
    return this.http.get<TaskModel>(`https://localhost:44397/tasks/${id}`);
  }
}