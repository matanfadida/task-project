import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'priorityName'
})
export class PriorityNamePipe implements PipeTransform {
  private names: { [key: number]: string } = {
    0: 'נמוך',
    1: 'בינוני',
    2: 'גבוה'
  };

  transform(value: number): string {
    return this.names[value] ?? 'לא ידוע';
  }
}