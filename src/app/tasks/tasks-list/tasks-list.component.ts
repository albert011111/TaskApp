import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {TaskService} from '../../tasks/service/tasks.service';
import {Task} from '../model/task.model';

@Component({
  selector: 'app-tasks-list',
  templateUrl: './tasks-list.component.html',
  styleUrls: ['./tasks-list.component.css']
})
export class TasksListComponent implements OnInit {

  private isDisabledProperty: boolean = true;

  tasks: Array<Task>;
  tasks$: Observable<Array<Task>>;

  constructor(private tasksService: TaskService) {
  }

  ngOnInit() {
    this.getTasks();
  }

  getTasks() {
    this.tasks$ = this.tasksService.getTasks();
  }

  onDeleteClick(taskId: number) {
    console.log(taskId + ' onDeleteClick ');
    this.tasksService.deleteTask(taskId).subscribe(task => {
      console.log(task);
    });
  }

  isDisabled(): boolean {
    return this.isDisabledProperty;
  }


  enableNewTask($event) {
    console.log($event);
    this.isDisabledProperty = !this.isDisabledProperty;
  }
}
