import { Pipe ,PipeTransform } from "@angular/core";

@Pipe({
    name: 'statusName'
})
 export class StatusNamePipe implements PipeTransform{
    private names: { [key: number]: string } = {
        0: 'ממתינה',
        1: 'הושלמה',
        2: 'בתהליך'
      };

      transform(value: number): string {
        return this.names[value] ?? 'לא ידוע';
      }
 }