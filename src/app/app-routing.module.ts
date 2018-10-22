import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TasksListComponent } from './tasks/tasks-list/tasks-list.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { DoneTaskComponent } from './done-task/done-task.component';

const appRoutes: Routes = [
  {
    path: 'tasks-list',
    component: TasksListComponent
  },
  {
    path: 'done-tasks',
    component: DoneTaskComponent
  },
  {
    path: '', redirectTo: 'tasks-list', pathMatch: 'full'
  },
  {
    path: '**', component: PageNotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})


export class AppRoutingModule { }
