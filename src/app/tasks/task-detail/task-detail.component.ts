import { Component, OnInit, Input } from '@angular/core';
import { Task } from '../model/task.model';
import { Router, ActivatedRoute, ParamMap, Params } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { TaskService } from '../service/tasks.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-task-detail',
  templateUrl: './task-detail.component.html',
  styleUrls: ['./task-detail.component.css']
})
export class TaskDetailComponent implements OnInit {


  task = new Task();
  taskId: string;

  constructor(private activatedRoute: ActivatedRoute,
    private router: Router,
    private taskService: TaskService) {
  }

  ngOnInit() {
    this.activatedRoute.params
      .subscribe((params: Params) => {
        this.taskId = params['taskId'];
      });

    this.taskService.getTaskById(+this.taskId).subscribe(taskObs => this.task = taskObs);

    console.log(this.task);
  }
}
