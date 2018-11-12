import { Component, OnInit, Input } from '@angular/core';
import { TaskService } from '../tasks/service/tasks.service';
import { Task } from '../tasks/model/task.model';

@Component({
  selector: 'app-done-task',
  templateUrl: './done-task.component.html',
  styleUrls: ['./done-task.component.css']
})
export class DoneTaskComponent implements OnInit {


  tasksDoneChild: Array<Task> = [];

  constructor(private taskService: TaskService) {

    this.taskService.getTasksDoneObservable().subscribe((tasks: Array<Task>) => {
      this.tasksDoneChild = tasks;
    });

   }

  ngOnInit() {
  }

}
