import { Component, OnInit } from '@angular/core';
import { TaskService } from '../services/tasks.service';
import { Task } from '../models/task';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-tasks-list',
  templateUrl: './tasks-list.component.html',
  styleUrls: ['./tasks-list.component.css']
})
export class TasksListComponent implements OnInit {

  constructor(private tasksService: TaskService) { }
  tasks: Array<Task>;
  tasks$: Observable<Array<Task>>;

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



}
