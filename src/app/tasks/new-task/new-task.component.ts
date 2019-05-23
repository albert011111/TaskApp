import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Task} from "../model/task.model"
import {TaskService} from "../service/tasks.service";
import {TokenStorageService} from "../../auth/token-storage.service";
import {CommonDateService} from "../../shared/services/common-date.service";
import {Router} from "@angular/router";
import {Day} from "../../calendar/day/day.model";


@Component({
  selector: 'app-new-task',
  templateUrl: './new-task.component.html',
  styleUrls: ['./new-task.component.css']
})


export class NewTaskComponent implements OnInit, OnDestroy {
  readonly TASK_NAME_PATTERN = '^[A-Z]{1}[a-z _]+';
  taskForm: FormGroup;

  task = new Task();
  currentDate: Date;
  selectedDay: Day;

  constructor(private taskService: TaskService,
              private tokenService: TokenStorageService,
              private commonDateService: CommonDateService,
              private router: Router) {
  }

  ngOnInit(): void {
    const taskNameValidators = [Validators.required, Validators.pattern(this.TASK_NAME_PATTERN)];
    const descriptionValidators = [Validators.minLength(10), Validators.maxLength(30)];

    this.commonDateService.$selectedDay.subscribe(selDay => this.selectedDay = selDay);

    this.currentDate = this.commonDateService.selectedDate === undefined
      ? new Date()
      : new Date(this.commonDateService.selectedDate);

    this.taskForm = new FormGroup({
      taskName: new FormControl('', taskNameValidators),
      createDate: new FormControl(this.currentDate.toISOString().substring(0, 10), Validators.required),
      description: new FormControl('Domyslny opis...', descriptionValidators),
    });
  }

  ngOnDestroy(): void {
    this.commonDateService.resetDay();
    this.commonDateService.setupSelectedDay(null);
  }

  onFormSubmit() {
    this.task.name = this.taskForm.get("taskName").value;
    this.task.createDate = this.taskForm.get("createDate").value;
    this.task.description = this.taskForm.get("description").value;
    this.task.userName = this.tokenService.getUsername();
    // this.task.dayId = this.selectedDay.id;

    this.taskService.addTask(this.task)
      .subscribe(
        newTask => {
          console.log("New task added: " + newTask);
          this.router.navigate(['tasks-list']);
        },
        (error) => {
          console.warn("error" + error);
        });
  }
}
