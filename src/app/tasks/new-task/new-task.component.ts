import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Task} from "../model/task.model"
import {TaskService} from "../service/tasks.service";


@Component({
  selector: 'app-new-task',
  templateUrl: './new-task.component.html',
  styleUrls: ['./new-task.component.css']
})


export class NewTaskComponent implements OnInit {
  readonly TASK_NAME_PATTERN = '^[A-Z]{1}[a-z _]+';
  taskForm: FormGroup;

  task = new Task();
  currentDate: Date;


  constructor(private taskService: TaskService) {
  }

  ngOnInit(): void {
    const taskNameValidators = [Validators.required, Validators.pattern(this.TASK_NAME_PATTERN)];
    const descriptionValidators = [Validators.minLength(10), Validators.maxLength(30)];

    this.currentDate = new Date();
    this.taskForm = new FormGroup({
      taskName: new FormControl(null, taskNameValidators),
      createDate: new FormControl(this.currentDate.toISOString().substring(0, 10), Validators.required),
      description: new FormControl(null, descriptionValidators),
    });

  }

  onFormSubmit() {
    this.task.name = this.taskForm.get("taskName").value;
    this.task.createDate = this.taskForm.get("createDate").value;
    // console.log(this.task);

    //TODO uzupelnić model Javovy o pole description
    // this.task.name = this.taskForm.get("description").value;

    this.taskService.addTask(this.task).subscribe(newTask => {
      console.log("New task added: " + newTask);
    });
  }
}
