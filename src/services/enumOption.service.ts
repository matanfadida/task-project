import { Injectable } from '@angular/core';
import { Status } from '../model/status';
import { Priority } from '../model/priority.js';

export interface EnumOption<T> {
    label: string;
    value: T;
}

@Injectable({
    providedIn: 'root'
  })

export class EnumService {
    getStatusOptions(): EnumOption<Status>[] {
      return [
        { label: 'בתהליך', value: Status.InProgress },
        { label: 'הושלמה', value: Status.Completed },
        { label: 'ממתינה', value: Status.Wating }
      ];
    }

    getPriorityOptions(): EnumOption<Priority>[] {
        return [
          { label: 'נמוכה', value: Priority.Low },
          { label: 'בינונית', value: Priority.Medium },
          { label: 'גבוהה', value: Priority.High }
        ];
      }
  }