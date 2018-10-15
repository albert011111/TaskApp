import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { TaskService } from '../services/tasks.service';
import { Task } from '../models/task';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.css']
})
export class AddTaskComponent {

  name = new FormControl('');
  taskForm = new FormGroup(
    {
      name: new FormControl('Takie imie'),
      createDate: new FormControl(new Date()),
    }
  );

  constructor(private taskService: TaskService) {
  }

  onSubmit() {
    const task: Task = ({
      name: this.taskForm.get('name').value,
      createDate: this.taskForm.get('createDate').value
    });

    this.taskService.addTask(task).subscribe(t => {
      console.log(t);
    });
    console.warn(this.taskForm.value);
  }
}

