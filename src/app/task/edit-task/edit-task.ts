import { Component, computed, DestroyRef, effect, EventEmitter, inject, input, Input, OnInit, Output } from '@angular/core';
import { EnumOption, EnumService } from '../../../services/enumOption.service';
import { HttpClient } from '@angular/common/http';
import { Priority } from '../../../model/priority';
import { Status } from '../../../model/status';
import { ActivatedRoute, RouterLink, Router } from '@angular/router';
import { type TaskModel } from '../../../model/task';
import { FormControl, FormGroup, NgForm, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Button } from '../../shared/button/button';
import { TaskService } from '../../../services/taskService.service';

@Component({
  selector: 'app-edit-task',
  imports: [CommonModule,Button, ReactiveFormsModule,RouterLink],
  templateUrl: './edit-task.html',
  styleUrl: './edit-task.css',
})
export class EditTask implements OnInit{
  statusOptions:EnumOption<Status>[] = [];
  priorityOptions:EnumOption<Priority>[] = [];
  id = input.required<string>();

  form = new FormGroup({
    title: new FormControl('', {validators:[Validators.required]}),
    description: new FormControl(''),
    deadline: new FormControl('', {validators:[Validators.required]}),
    status: new FormControl(this.statusOptions[0]?.value || ''),
    priority: new FormControl(this.priorityOptions[0]?.value || ''),
  });

  constructor(private enumService: EnumService, private taskService: TaskService, private activatedRoute:ActivatedRoute,private router: Router) {}

  ngOnInit() {
    this.statusOptions = this.enumService.getStatusOptions();
    this.priorityOptions = this.enumService.getPriorityOptions();
  }

  loadTaskEffect = effect(() => {
    const taskId = this.id();
    if (!taskId) return;

    this.taskService.getTask(taskId).subscribe(task => {
        if (task) {
          this.form.patchValue({
            title: task.title,
            description: task.description ?? '',
            deadline: task.deadline.split('T')[0],
            priority: task.priority,
            status: task.status
          });
        }
      });
  });

  isInvalid(field: string) {
    const control = this.form.get(field);
    return control?.touched && control?.invalid;
  }

  onSubmit(){
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const newTask: TaskModel = {
      id: this.id(),
      title: this.form.value.title || '',
      description: this.form.value.description || '',
      priority: Number(this.form.value.priority) || Number(this.priorityOptions[0]?.value) || 0,
      status: Number(this.form.value.status) || Number(this.statusOptions[0]?.value) || 0,
      deadline: this.form.value.deadline || ''
    };

    this.form.reset();
    this.taskService.updateTask(newTask);
    this.router.navigate(["/"]);
  }
  
}
