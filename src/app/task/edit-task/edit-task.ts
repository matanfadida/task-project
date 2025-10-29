import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { EnumOption, EnumService } from '../../../services/enumOption.service';
import { HttpClient } from '@angular/common/http';
import { Priority } from '../../../model/priority';
import { Status } from '../../../model/status';
import { ActivatedRoute, RouterLink, Router } from '@angular/router';
import { type TaskModel } from '../../../model/task';
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Button } from '../../shared/button/button';
import { TaskService } from '../../../services/taskService.service';

@Component({
  selector: 'app-edit-task',
  imports: [CommonModule,Button, FormsModule,RouterLink],
  templateUrl: './edit-task.html',
  styleUrl: './edit-task.css',
})
export class EditTask implements OnInit{
  @Input({required: true}) id:string = "";

  statusOptions:EnumOption<Status>[] = [];
  selectedStatus: number = 0;

  priorityOptions:EnumOption<Priority>[] = [];
  selectedPriority: number = 0;

  enteredTitle = '';
  enteredDescription = '';
  enteredDeadline = '';

  constructor(private enumService: EnumService, private taskService: TaskService, private activatedRoute:ActivatedRoute,private router: Router) {}

  ngOnInit() {
    this.statusOptions = this.enumService.getStatusOptions();
    this.priorityOptions = this.enumService.getPriorityOptions();
    this.activatedRoute.paramMap.subscribe({
      next: (paramMap) => {
        const idParam = paramMap.get('id');
        if(idParam !== undefined && idParam !== null){
          this.id = idParam;
          this.taskService.getTask(idParam).subscribe({
            next: (task) => {
              if(task !== undefined){
                this.enteredTitle = task.title
                this.enteredDescription = task.description ?? '';
                this.enteredDeadline = task.deadline.split('T')[0];
                this.selectedPriority = task.priority;
                this.selectedStatus = task.status;
              }
            }
          });
          
        }
      }
    });
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

  onSubmit(form: NgForm){
    if (form.invalid) {
      form.control.markAllAsTouched();
      return;
    }

    const newTask: TaskModel = {
      id: this.id,
      title: this.enteredTitle,
      description: this.enteredDescription,
      priority: this.selectedPriority,
      status: this.selectedStatus,
      deadline:this.enteredDeadline
    };

    this.taskService.updateTask(newTask);
    this.router.navigate(["/"]);
  }
  
}
