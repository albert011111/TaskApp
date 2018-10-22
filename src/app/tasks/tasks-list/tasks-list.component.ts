import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { TaskService } from '../../tasks/service/tasks.service';
import { Task } from '../../tasks/model/task';

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

  onRowClick(taskClicked: Task) {
    console.log(taskClicked);
  }



}
