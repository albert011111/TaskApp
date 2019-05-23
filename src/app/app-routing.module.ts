import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {TasksListComponent} from './tasks/tasks-list/tasks-list.component';
import {PageNotFoundComponent} from './page-not-found/page-not-found.component';
import {DoneTaskComponent} from './done-task/done-task.component';
import {LoginComponent} from "./auth/login/login.component";
import {RegisterComponent} from "./auth/register/register.component";
import {AuthGuard} from "./auth/auth.guard";
import {CalendarComponent} from "./calendar/calendar.component";
import {WalletComponent} from "./wallet/wallet.component";

const appRoutes: Routes = [
  {
    path: 'tasks-list',
    component: TasksListComponent
  },
  {
    path: 'done-tasks',
    component: DoneTaskComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'wallet',
    component: WalletComponent
  },
  {
    path: 'calendar',
    component: CalendarComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: '', redirectTo: 'tasks-list', pathMatch: 'full'
  },
  {
    path: '**', component: PageNotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes, /*{enableTracing: true}*/)],
  exports: [RouterModule]
})


export class AppRoutingModule {
}

