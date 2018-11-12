import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Task} from "../model/task.model"
import {formatDate} from "@angular/common";


@Component({
  selector: 'app-new-task',
  templateUrl: './new-task.component.html',
  styleUrls: ['./new-task.component.css']
})


export class NewTaskComponent implements OnInit {
  readonly TASK_NAME_PATTERN = '^[A-Ź][a-z _]+';
  taskForm: FormGroup;

  task = new Task();
  currentDate: Date;

  ngOnInit(): void {
    const taskNameValidators = [Validators.required, Validators.pattern(this.TASK_NAME_PATTERN)];
    const descriptionValidators = [Validators.minLength(10), Validators.maxLength(30)];

    this.currentDate = new Date();
    this.taskForm = new FormGroup({
      taskName: new FormControl('Test zadania', taskNameValidators),
      createDate: new FormControl(this.currentDate.toISOString().substring(0, 10)),
      description: new FormControl(null, descriptionValidators),
    });

  }

  onFormSubmit() {
    console.log(this.currentDate.toISOString().substring(0, 10))
    console.log(this.taskForm);
  }
}
