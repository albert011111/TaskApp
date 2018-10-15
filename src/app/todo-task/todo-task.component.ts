import { Component, OnInit } from '@angular/core';
import { TaskService } from '../services/tasks.service';
import { Task } from '../models/task';


@Component({
  selector: 'app-todo-task',
  templateUrl: './todo-task.component.html',
  styleUrls: ['./todo-task.component.css']
})
export class TodoTaskComponent implements OnInit {


  tasks = [];


  constructor(private taskService: TaskService) {
    // zeby zainicjowac pusta liste tasks musimy odwolac sie do wstepnie uzupelnionej list z komponentu glownego

    // zeby podgladac liste trzeba ja SUBSKRYBOWAC
    this.taskService.getTasksParentObservable().subscribe((tasks: Array<Task>) => {
      this.tasks = tasks.slice();
    });
  }

  ngOnInit() {
  }


  public remove(task: Task) {
    this.taskService.remove(task);

  }

  public complete(task: Task) {
    this.taskService.complete(task);
  }

  // metodka ktora koloruje mi napis zaleznie od ilosci zadan do zeobienia
  getColor(): string {
    return this.tasks.length >= 5 ? 'red' : 'blue';
  }


}
