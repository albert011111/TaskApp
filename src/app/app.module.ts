import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {AppComponent} from './app.component';
import {HeaderComponent} from './header/header.component';
import {FooterComponent} from './footer/footer.component';
import {DoneTaskComponent} from './done-task/done-task.component';
import {TaskService} from './tasks/service/tasks.service';
import {CheckedDirective} from './shared/checked.directive';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {TransformTaskPipe} from './shared/transform-task.pipe';
import {SortPipePipe} from './shared/sort-pipe.pipe';
import {HttpClientModule} from '@angular/common/http';

import {PageNotFoundComponent} from './page-not-found/page-not-found.component';
import {AppRoutingModule} from './app-routing.module';
import {TaskDetailComponent} from './tasks/task-detail/task-detail.component';
import {TasksListComponent} from './tasks/tasks-list/tasks-list.component';
import {TaskModule} from './tasks/task.module';
import {TaskRoutingModule} from './tasks/task-routing.module';
import {NewTaskComponent} from "./tasks/new-task/new-task.component";
import {LoginComponent} from './auth/login/login.component';
import {RegisterComponent} from './auth/register/register.component';
import {HomeComponent} from './auth/home/home.component';
import {UserComponent} from './auth/user/user.component';
import {AdminComponent} from './auth/admin/admin.component';
import {httpInterceptorProviders} from "./auth/auth-interceptor";
import {AuthGuard} from "./auth/auth.guard";
import {CalendarComponent} from './calendar/calendar.component';
import {TaskAvailableDirective} from './shared/task-available.directive';
import {WalletComponent} from './wallet/wallet.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    DoneTaskComponent,
    CheckedDirective,
    TransformTaskPipe,
    SortPipePipe,
    TasksListComponent,
    PageNotFoundComponent,
    TaskDetailComponent,
    NewTaskComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    UserComponent,
    AdminComponent,
    CalendarComponent,
    TaskAvailableDirective,
    WalletComponent,

  ],
  bootstrap: [AppComponent],
  imports: [
    BrowserModule, ReactiveFormsModule, FormsModule, NgbModule, HttpClientModule, TaskModule, TaskRoutingModule, AppRoutingModule,
  ],
  providers: [TaskService, httpInterceptorProviders, AuthGuard]
})
export class AppModule {
}
