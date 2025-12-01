import { Component, EventEmitter, Output, OnInit, DestroyRef, inject } from '@angular/core';
import { EnumService, type EnumOption } from '../../../services/enumOption.service.js'
import { Status } from '../../../model/status.js';
import { CommonModule } from '@angular/common';
import { Priority } from '../../../model/priority.js';
import { Button } from '../../shared/button/button.js';
import { FormControl, FormGroup, ReactiveFormsModule, NgForm, Validators } from '@angular/forms';
import { type AddTaskModel } from '../../../model/AddTask.js';
import { TaskService } from '../../../services/taskService.service.js';

@Component({
  selector: 'app-add-task',
  imports: [CommonModule,Button, ReactiveFormsModule],
  templateUrl: './add-task.html',
  styleUrl: './add-task.css',
})

export class AddTask implements OnInit {
  private destoryRef = inject(DestroyRef);
  statusOptions:EnumOption<Status>[] = [];
  priorityOptions:EnumOption<Priority>[] = [];

  @Output() cancle = new EventEmitter();

  onCancle(){
    this.cancle.emit();
  }

  constructor(private taskService: TaskService,private enumService: EnumService) {
    this.statusOptions = this.enumService.getStatusOptions();
    this.priorityOptions = this.enumService.getPriorityOptions();
  }

  form = new FormGroup({
    title: new FormControl('', {validators:[Validators.required]}),
    description: new FormControl(''),
    deadline: new FormControl('', {validators:[Validators.required]}),
    status: new FormControl(this.statusOptions[0]?.value || ''),
    priority: new FormControl(this.priorityOptions[0]?.value || ''),
  });

  ngOnInit(): void {
    var subscription = this.form.get('status')!.valueChanges.subscribe(value => {
      console.log('Selected status:', value);
    });

    this.destoryRef.onDestroy(() => { subscription.unsubscribe() })
  }

  isInvalid(field: string) {
    const control = this.form.get(field);
    return control?.touched && control?.invalid;
  }

  async onSubmit(){
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const newTask: AddTaskModel = {
      title: this.form.value.title || '',
      description: this.form.value.description || '',
      priority: Number(this.form.value.priority) || Number(this.priorityOptions[0]?.value) || 0,
      status: Number(this.form.value.status) || Number(this.statusOptions[0]?.value) || 0,
      deadline: this.form.value.deadline || ''
    };

    this.form.reset();

    await this.taskService.addTask(newTask);
    this.onCancle();
  }
}
