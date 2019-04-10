import {Component, OnInit} from '@angular/core';
import {Task} from '../model/task.model';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {TaskService} from '../service/tasks.service';

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
