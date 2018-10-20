import { Component, OnInit } from '@angular/core';
import { TaskService } from './services/tasks.service';
import { Task } from './models/task';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  allTasks$: Observable<Array<Task>>;

  constructor(private taskService: TaskService) { }

  getTasks() {
    this.allTasks$ = this.taskService.getTasks();
  }

  onClickAddTask() {
    const date: Date = new Date();

    const task: Task = ({
      name: 'Szorowanie',
      createDate: date,
      // dateOfExecution: date.setDate(date.getDate() + 10)
    });

    this.taskService.addTask(task).subscribe(t => {
      console.log(t);
    });
  }




  // ----- W08_42 -----
  // profession = 'programista';
  // skill = 'walenie w chuja';

  // constructor() {

  // }






  // inputText = 'Pole tekstowe';
  // inputText2Way = '';
  // button = true;
  // showClick = '';


  // colorClass = 'color';
  // isDisable = true;

  // onFocus() {
  //   if (this.colorClass === 'color') {
  //     this.colorClass = 'color2';
  //   } else {
  //     this.colorClass = 'color';
  //   }
  //   console.log('Color chanbged');
  // }

  // onClick(event) {
  //   console.log(event);
  // }

  // onMouseMove(event) {
  //   console.log('x: ' + event.clientX + ', y: ' + event.clientY);
  // }

  // onPaste() {
  //   this.inputText = 'Skopiowane';
  // }

  // change() {
  //   this.isDisable = !this.isDisable;
  // }

}







