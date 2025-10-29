import { Component, EventEmitter, Output, OnInit, Input } from '@angular/core';
import { EnumService, type EnumOption } from '../../../services/enumOption.service.js'
import { Status } from '../../../model/status.js';
import { CommonModule } from '@angular/common';
import { Priority } from '../../../model/priority.js';
import { Button } from '../../shared/button/button.js';
import { FormsModule, NgForm } from '@angular/forms';
import { type AddTaskModel } from '../../../model/AddTask.js';
import { TaskService } from '../../../services/taskService.service.js';



@Component({
  selector: 'app-add-task',
  imports: [CommonModule,Button, FormsModule],
  templateUrl: './add-task.html',
  styleUrl: './add-task.css',
})
export class AddTask {
  statusOptions:EnumOption<Status>[] = [];
  selectedStatus: number = 0;

  priorityOptions:EnumOption<Priority>[] = [];
  selectedPriority: number = 0;

  @Output() cancle = new EventEmitter();

  onCancle(){
    this.cancle.emit();
  }

  enteredTitle = '';
  enteredDescription = '';
  enteredDeadline = '';

  constructor(private taskService: TaskService,private enumService: EnumService) {
    this.statusOptions = this.enumService.getStatusOptions();
    this.priorityOptions = this.enumService.getPriorityOptions();
  }

  onStatusChange(event: any) {
    this.selectedStatus = Number(event.target.value);
  }

  onPriorityChange(event: any) {
    this.selectedPriority = Number(event.target.value);
  }

  isValid(value:string){
    return value === '' || value === undefined;
  }

  async onSubmit(form: NgForm){
    if (form.invalid) {
      form.control.markAllAsTouched();
      return;
    }

    const newTask: AddTaskModel = {
      title: this.enteredTitle,
      description: this.enteredDescription,
      priority: this.selectedPriority,
      status: this.selectedStatus,
      deadline:this.enteredDeadline
    };

    form.resetForm();

    await this.taskService.addTask(newTask);
    this.onCancle();
  }
}
