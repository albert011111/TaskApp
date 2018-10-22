import { Pipe, PipeTransform } from '@angular/core';
import { Task } from '../tasks/model/task';

@Pipe({
  name: 'sortPipe'
})
export class SortPipePipe implements PipeTransform {

  transform(value: Array<Task>, args?: any): Array<Task> {

    return value.sort((task1, task2) => {
      if (task1.name.toLowerCase() > task2.name.toLowerCase()) {
        return 1;
      } else {
        return -1;
      }
    });
  }

}
