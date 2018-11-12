import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TaskDetailComponent } from './task-detail/task-detail.component';
import { NewTaskComponent } from './new-task/new-task.component';

const taskRoutes: Routes = [
  { path: 'taskDetail/:taskId', component: TaskDetailComponent },
  { path: 'newTask', component: NewTaskComponent }
];

@NgModule({
  imports: [RouterModule.forChild(taskRoutes)],
  exports: [RouterModule]
})
export class TaskRoutingModule { }
